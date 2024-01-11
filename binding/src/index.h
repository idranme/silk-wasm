#ifndef INDEX_H
#define INDEX_H

#include <emscripten/val.h>

typedef struct codec_ctx
{
    emscripten::val cb;
} codec_ctx_t;

void codec_callback(void *userdata, unsigned char *data, int len);

int silk_encode(std::string data, int data_len, int sample_rate, emscripten::val cb);

int silk_decode(std::string data, int data_len, int sample_rate, emscripten::val cb);

#endif
