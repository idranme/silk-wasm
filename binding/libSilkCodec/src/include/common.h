#ifndef _COMMON_H_
#define _COMMON_H_

#define _CRT_SECURE_NO_WARNINGS

#include <SKP_Silk_SDK_API.h>
#include <SKP_Silk_SigProc_FIX.h>

#include <stdlib.h>
#include <string.h>

/* Define codec specific settings */
#define MAX_INPUT_FRAMES        5
#define MAX_FRAME_LENGTH        480
#define FRAME_LENGTH_MS         20
#define MAX_API_FS_KHZ          48
#define MAX_LBRR_DELAY          2
#define MAX_BYTES_PER_FRAME     250 // Equals peak bitrate of 100 kbps

#ifdef _SYSTEM_IS_BIG_ENDIAN
/* Function to convert a little endian int16 to a */
/* big endian int16 or vica verca                 */
void swap_endian(
  SKP_int16       vec[],              /*  I/O array of */
  SKP_int         len                 /*  I   length      */
)
{
  SKP_int i;
  SKP_int16 tmp;
  SKP_uint8* p1, * p2;

  for (i = 0; i < len; i++) {
    tmp = vec[i];
    p1 = (SKP_uint8*)&vec[i]; p2 = (SKP_uint8*)&tmp;
    p1[0] = p2[1]; p1[1] = p2[0];
  }
}
#endif

#ifdef _WIN32
#define __dllexport __declspec(dllexport)
#else
#define __dllexport
#endif

#endif /* _COMMON_H_ */
