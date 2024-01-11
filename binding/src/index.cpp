#include "index.h"
extern "C"
{
#include <common.h>
#include <codec.h>
}
#include <emscripten/bind.h>
#include <emscripten/val.h>

void codec_callback(void *userdata, unsigned char *p, int len)
{
    codec_ctx_t ctx = *(codec_ctx_t *)userdata;
    ctx.cb(emscripten::val(emscripten::typed_memory_view(len, p)));
}

int silk_encode(std::string data, int data_len, int sample_rate, emscripten::val cb)
{
    codec_ctx_t ctx = {cb};
    unsigned char *input = (unsigned char *)data.c_str();
    int ret = silkEncode(input, data_len, sample_rate, codec_callback, &ctx);
    if (input != NULL)
    {
        delete[] input;
        input = NULL;
    }
    return ret;
}

int silk_decode(std::string data, int data_len, int sample_rate, emscripten::val cb)
{
    codec_ctx_t ctx = {cb};
    unsigned char *input = (unsigned char *)data.c_str();
    int ret = silkDecode(input, data_len, sample_rate, codec_callback, &ctx);
    if (input != NULL)
    {
        delete[] input;
        input = NULL;
    }
    return ret;
}

EMSCRIPTEN_BINDINGS(module)
{
    emscripten::function("silk_encode", &silk_encode);
    emscripten::function("silk_decode", &silk_decode);
}