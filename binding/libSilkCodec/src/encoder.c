/***********************************************************************
Copyright (c) 2006-2012, Skype Limited. All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, (subject to the limitations in the disclaimer below)
are permitted provided that the following conditions are met:
- Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.
- Neither the name of Skype Limited, nor the names of specific
contributors, may be used to endorse or promote products derived from
this software without specific prior written permission.
NO EXPRESS OR IMPLIED LICENSES TO ANY PARTY'S PATENT RIGHTS ARE GRANTED
BY THIS LICENSE. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
CONTRIBUTORS ''AS IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
***********************************************************************/


/*****************************/
/* Silk encoder test program */
/*****************************/

#include "include/common.h"
#include "include/codec.h"

int __dllexport
silkEncode(unsigned char* pcmData, int dataLen,
int sampleRate, cb_codec callback, void* userdata)
{
  size_t    counter;
  SKP_int16 nBytes;
  SKP_uint8 payload[MAX_BYTES_PER_FRAME * MAX_INPUT_FRAMES];
  SKP_int16 in[FRAME_LENGTH_MS * MAX_API_FS_KHZ * MAX_INPUT_FRAMES];
  SKP_int32 encSizeBytes, result;
  unsigned char* psRead = pcmData, *psReadEnd = pcmData + dataLen;
  void* psEnc = NULL;

#ifdef _SYSTEM_IS_BIG_ENDIAN
  SKP_int16 nBytes_LE;
#endif

  /* default settings */
  SKP_int32 API_fs_Hz = sampleRate;
  SKP_int32 max_internal_fs_Hz = 0;
  SKP_int32 targetRate_bps = 25000;
  SKP_int32 smplsSinceLastPacket, packetSize_ms = 20;
  SKP_int32 frameSizeReadFromFile_ms = 20;

  if (max_internal_fs_Hz == 0) {
    max_internal_fs_Hz = 24000;
    if (API_fs_Hz < max_internal_fs_Hz) {
      max_internal_fs_Hz = API_fs_Hz;
    }
  }

#if LOW_COMPLEXITY_ONLY
  SKP_int32 complexity_mode = 0;
#else
  SKP_int32 complexity_mode = 2;
#endif

  SKP_SILK_SDK_EncControlStruct encStatus = { 0 }; // Struct for status of encoder
  SKP_SILK_SDK_EncControlStruct encControl = { 0 }; // Struct for input to encoder
  encControl.API_sampleRate = sampleRate;
  encControl.maxInternalSampleRate = max_internal_fs_Hz;
  encControl.packetSize = (packetSize_ms * sampleRate) / 1000;
  encControl.packetLossPercentage = 0;
  encControl.useInBandFEC = 0;
  encControl.useDTX = 0;
  encControl.complexity = complexity_mode;
  encControl.bitRate = (targetRate_bps > 0 ? targetRate_bps : 0);

  if (API_fs_Hz > MAX_API_FS_KHZ * 1000 || API_fs_Hz < 0)
    goto failed;

  /* Add Silk header to stream */
  callback(userdata, (void*)"\x02#!SILK_V3", sizeof(char) * 10);

  /* Create Encoder */
  result = SKP_Silk_SDK_Get_Encoder_Size(&encSizeBytes);
  if (result) goto failed;

  /* Reset Encoder */
  psEnc = malloc(encSizeBytes);
  result = SKP_Silk_SDK_InitEncoder(psEnc, &encStatus);
  if (result) goto failed;

  smplsSinceLastPacket = 0;

  while (1) {

    if (psRead - pcmData >= dataLen)
      break;

    /* Read input */
    counter = (frameSizeReadFromFile_ms * API_fs_Hz) / 1000;
    if (counter * sizeof(SKP_int16) > psReadEnd - psRead) {
      memset(in, 0x00, sizeof(in));

      size_t realrd = (psReadEnd - psRead);
      memcpy(in, psRead, realrd); psRead += realrd;
    }

    else {
      size_t realrd = counter * sizeof(SKP_int16);
      memcpy(in, psRead, realrd); psRead += realrd;
    }

#ifdef _SYSTEM_IS_BIG_ENDIAN
    swap_endian(in, counter);
#endif

    /* max payload size */
    nBytes = MAX_BYTES_PER_FRAME * MAX_INPUT_FRAMES;

    /* Silk Encoder */
    SKP_Silk_SDK_Encode(psEnc, &encControl, in, (SKP_int16)counter, payload, &nBytes);

    /* Get packet size */
    packetSize_ms = (SKP_int)((1000 * (SKP_int32)encControl.packetSize) / encControl.API_sampleRate);

    smplsSinceLastPacket += (SKP_int)counter;
    if (((1000 * smplsSinceLastPacket) / API_fs_Hz) == packetSize_ms) {

      /* Write payload size */
#ifdef _SYSTEM_IS_BIG_ENDIAN
      nBytes_LE = nBytes;
      swap_endian(&nBytes_LE, 1);
      callback(userdata, (void*)&nBytes_LE, sizeof(SKP_int16));
#else
      callback(userdata, (void*)&nBytes, sizeof(SKP_int16));
#endif
      /* Write payload */
      callback(userdata, payload, sizeof(SKP_uint8) * nBytes);

      smplsSinceLastPacket = 0;
    }
  }

  free(psEnc);
  return 1;

failed:
  if (psEnc) free(psEnc);
  return 0;
}
