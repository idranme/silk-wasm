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
/* Silk decoder test program */
/*****************************/

#include "include/common.h"
#include "include/codec.h"

int __dllexport
silkDecode(unsigned char* silkData, int dataLen,
int sampleRate, cb_codec callback, void* userdata)
{
  SKP_uint8 payload[MAX_BYTES_PER_FRAME * MAX_INPUT_FRAMES * (MAX_LBRR_DELAY + 1)];
  SKP_uint8* payloadEnd = NULL, * payloadToDec = NULL;
  SKP_int16 nBytesPerPacket[MAX_LBRR_DELAY + 1];
  SKP_int16 out[((FRAME_LENGTH_MS * MAX_API_FS_KHZ) << 1) * MAX_INPUT_FRAMES], * outPtr;
  SKP_int32 remainPackets = 0;
  SKP_int16 len, nBytes, totalLen = 0;
  SKP_int32 decSizeBytes, result;
  unsigned char* psRead = silkData;
  void* psDec = NULL;

  SKP_SILK_SDK_DecControlStruct DecControl;

  /* Check Silk header */
  if (strncmp((char*)psRead, "\x02#!SILK_V3", 0x0A) != 0)
  goto failed;
  
  psRead += 0x0A;

  /* Create decoder */
  result = SKP_Silk_SDK_Get_Decoder_Size(&decSizeBytes);
  if (result) goto failed;

  /* Reset decoder */
  psDec = malloc(decSizeBytes);
  result = SKP_Silk_SDK_InitDecoder(psDec);
  if (result) goto failed;

  payloadEnd = payload;
  DecControl.framesPerPacket = 1;
  DecControl.API_sampleRate = sampleRate;

  /* Simulate the jitter buffer holding MAX_FEC_DELAY packets */
  {
    for (int i = 0; i < MAX_LBRR_DELAY; i++) {

      /* Read payload size */
      nBytes = *(SKP_int16*)psRead;
      psRead += sizeof(SKP_int16);

#ifdef _SYSTEM_IS_BIG_ENDIAN
      swap_endian(&nBytes, 1);
#endif

      /* Read payload */
      memcpy(payloadEnd, (SKP_uint8*)psRead, nBytes);
      psRead += sizeof(SKP_uint8) * nBytes;

      nBytesPerPacket[i] = nBytes;
      payloadEnd += nBytes;
    }

    nBytesPerPacket[MAX_LBRR_DELAY] = 0;
  }

  while (1) {

    if (remainPackets == 0) {

      /* Read payload size */
      nBytes = *(SKP_int16*)psRead;
      psRead += sizeof(SKP_int16);

#ifdef _SYSTEM_IS_BIG_ENDIAN
      swap_endian(&nBytes, 1);
#endif

      if (nBytes < 0 || psRead - silkData >= dataLen) {
        remainPackets = MAX_LBRR_DELAY;
        goto decode;
    }

      /* Read payload */
      memcpy(payloadEnd, (SKP_uint8*)psRead, nBytes);
      psRead += sizeof(SKP_uint8) * nBytes;

  }
    else if (--remainPackets <= 0) break;

  decode:
    if (nBytesPerPacket[0] != 0) {
      nBytes = nBytesPerPacket[0];
      payloadToDec = payload;
    }

    outPtr = out;
    totalLen = 0;
    int frames = 0;

    /* Decode all frames in the packet */
    do {
      /* Decode 20 ms */
      SKP_Silk_SDK_Decode(psDec, &DecControl, 0, payloadToDec, nBytes, outPtr, &len);

      frames++;
      outPtr += len;
      totalLen += len;

      if (frames > MAX_INPUT_FRAMES) {
        /* Hack for corrupt stream that could generate too many frames */
        outPtr = out;
        totalLen = 0;
        frames = 0;
      }

      /* Until last 20 ms frame of packet has been decoded */
    } while (DecControl.moreInternalDecoderFrames);

    /* Write output to file */
#ifdef _SYSTEM_IS_BIG_ENDIAN
    swap_endian(out, totalLen);
#endif

    callback(userdata, (void*)out, sizeof(SKP_int16) * totalLen);

    /* Update buffer */
    SKP_int16 totBytes = 0;
    for (int i = 0; i < MAX_LBRR_DELAY; i++) {
      totBytes += nBytesPerPacket[i + 1];
    }

    /* Check if the received totBytes is valid */
    if (totBytes < 0 || totBytes > sizeof(payload))
      goto failed;

    SKP_memmove(payload, &payload[nBytesPerPacket[0]], totBytes * sizeof(SKP_uint8));
    payloadEnd -= nBytesPerPacket[0];
    SKP_memmove(nBytesPerPacket, &nBytesPerPacket[1], MAX_LBRR_DELAY * sizeof(SKP_int16));
}

  free(psDec);
  return 1;

failed:
  if (psDec) free(psDec);
  return 0;
}
