#ifndef _CODEC_H_
#define _CODEC_H_

// Codec callback function
typedef void (cb_codec)(void* userdata, unsigned char* p, int len);

/**
 * Decode SILK data to PCM
 *
 * @param silkData silk file data
 *
 * @param dataLen data length
 *
 * @param sampleRate target samplerate
 *
 * @param callback codec callback
 *
 * @param userdata user data
 *
 * @return 0 = failed
 */
int silkDecode(const unsigned char* silkData, int dataLen, int sampleRate, cb_codec callback, void* userdata);

/**
 * Encode PCM data to SILK
 *
 * @param pcmData pcm data
 *
 * @param dataLen data length
 *
 * @param sampleRate target samplerate
 *
 * @param callback codec callback
 *
 * @param userdata user data
 *
 * @return 0 = failed
 */
int silkEncode(const unsigned char* pcmData, int dataLen, int sampleRate, cb_codec callback, void* userdata);

#endif /* _CODEC_H_ */
