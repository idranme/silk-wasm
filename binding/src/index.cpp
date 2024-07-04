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

int silk_encode(const std::string &pcm_data, int sample_rate, callback_type cb)
{
    std::vector<unsigned char> output;
    codec_ctx_t ctx = {output};
    auto input = reinterpret_cast<const unsigned char *>(pcm_data.data());
    int ret = silkEncode(input, pcm_data.size(), sample_rate, codec_callback, &ctx);
    cb(emscripten::val(emscripten::typed_memory_view(ctx.output.size(), ctx.output.data())));
    return ret;
}

int silk_decode(const std::string &silk_data, int sample_rate, callback_type cb)
{
    std::vector<unsigned char> output;
    codec_ctx_t ctx = {output};
    auto input = reinterpret_cast<const unsigned char *>(silk_data.data());
    int ret = silkDecode(input, silk_data.size(), sample_rate, codec_callback, &ctx);
    cb(emscripten::val(emscripten::typed_memory_view(ctx.output.size(), ctx.output.data())));
    return ret;
}

EMSCRIPTEN_BINDINGS(module)
{
    emscripten::function("silk_encode", &silk_encode);
    emscripten::function("silk_decode", &silk_decode);
    emscripten::register_type<callback_type>("(output: Uint8Array) => void");
}