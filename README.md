# Silk Wasm

[![npm](https://img.shields.io/npm/v/silk-wasm?style=flat-square)](https://www.npmjs.com/package/silk-wasm)

QQ/微信语音编解码

## API
```ts
// pcm 转 silk。input 为单声道 pcm_s16le 文件，samplingRate 为采样率。 
interface encodeResult {
    data: Uint8Array
    duration: number
}
function encode(input: Uint8Array, sampleRate: number): Promise<encodeResult>

// silk 转 pcm。input 为 silk 文件，samplingRate 为采样率。 
interface decodeResult {
    data: Uint8Array
}
function decode(input: Uint8Array, sampleRate: number): Promise<decodeResult>

// 获取 silk 音频时长，输出单位为毫秒。
function getDuration(silk: Uint8Array, frameMs?: number): number
```

## Example

```js
const { encode } = require('silk-wasm');
const { readFile, writeFile } = require('fs/promises');

(async function () {
    const pcm = await readFile('./test.pcm')
    const silk = await encode(pcm, 24000)
    await writeFile('./test.silk', silk.data)
})()
```

## Build wasm
```
cd binding
emcmake cmake .
emmake make
```