extern "C"
{
#include <common.h>
#include <codec.h>
}
#include <emscripten/bind.h>
#include <emscripten/val.h>
#include <iostream>
using namespace std;
using namespace emscripten;

typedef struct codec_ctx
{
    val cb;
} codec_ctx_t;

void codec_callback(void *userdata, unsigned char *data, int len)
{
    codec_ctx_t ctx = *(codec_ctx_t *)userdata;
    ctx.cb(val(typed_memory_view(len, data)));
}

int silk_encode(std::string data, int data_len, int sample_rate, val cb)
{
    codec_ctx_t ctx = {cb};
    //unsigned char* uc = (unsigned char*) data.as<std::string>().c_str();
    unsigned char* uc = (unsigned char*) data.c_str();
    int ret = silkEncode(uc, data_len, sample_rate, codec_callback, &ctx);
    return ret;
}

EMSCRIPTEN_BINDINGS(module)
{
    emscripten::function("silk_encode", &silk_encode); // 绑定块的别名
}