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
    auto ctx = static_cast<codec_ctx_t *>(userdata);
    ctx->output.insert(ctx->output.end(), &p[0], &p[len]);
}

int silk_encode(const std::string &data, int sample_rate, callback_type cb)
{
    std::vector<unsigned char> output;
    codec_ctx_t ctx = {output};
    auto input = (unsigned char *)data.c_str();
    int ret = silkEncode(input, data.size(), sample_rate, codec_callback, &ctx);
    cb(emscripten::val(emscripten::typed_memory_view(ctx.output.size(), ctx.output.data())));
    return ret;
}

int silk_decode(const std::string &data, int sample_rate, callback_type cb)
{
    std::vector<unsigned char> output;
    codec_ctx_t ctx = {output};
    auto input = (unsigned char *)data.c_str();
    int ret = silkDecode(input, data.size(), sample_rate, codec_callback, &ctx);
    cb(emscripten::val(emscripten::typed_memory_view(ctx.output.size(), ctx.output.data())));
    return ret;
}

EMSCRIPTEN_BINDINGS(module)
{
    emscripten::function("silk_encode", &silk_encode);
    emscripten::function("silk_decode", &silk_decode);
    emscripten::register_type<callback_type>("(output: Uint8Array) => void");
}