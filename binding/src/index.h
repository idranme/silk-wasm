#ifndef INDEX_H
#define INDEX_H

#include <emscripten/val.h>

EMSCRIPTEN_DECLARE_VAL_TYPE(callback_type);

typedef struct codec_ctx
{
    std::vector<unsigned char> output;
} codec_ctx_t;

void codec_callback(void *userdata, unsigned char *data, int len);

int silk_encode(const std::string &pcm_data, int sample_rate, callback_type cb);

int silk_decode(const std::string &silk_data, int sample_rate, callback_type cb);

#endif
