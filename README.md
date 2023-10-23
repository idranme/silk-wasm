# Silk Wasm

[![npm](https://img.shields.io/npm/v/silk-wasm?style=flat-square)](https://www.npmjs.com/package/silk-wasm)

## API
```ts
// pcm 转 silk。input 为 pcm 文件，samplingRate 为采样率。 
function encode(input: Buffer, sampleRate: number): Promise<Buffer>

// silk 转 pcm。input 为 silk 文件，samplingRate 为采样率。 
function decode(input: Buffer, sampleRate: number): Promise<Buffer>

// 获取 silk 音频时长，输出单位为毫秒。
function getDuration(silk: Buffer, frameMs?: number): number
```

## Example

```js
const { encode } = require('silk-wasm');
const { readFile, writeFile } = require('fs/promises');

(async function () {
    const pcm = await readFile('./test.pcm')
    const silk = await encode(pcm, 24000)
    await writeFile('./test.silk', silk)
})()
```

## Build wasm
```
cd binding
emcmake cmake .
emmake make
```