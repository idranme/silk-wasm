# Silk Wasm

[![npm](https://img.shields.io/npm/v/silk-wasm?style=flat-square)](https://www.npmjs.com/package/silk-wasm)

## API
```ts
function encode(input: Buffer, sampleRate: number): Promise<Buffer>
```

input 为 pcm 文件，samplingRate 为采样率。 

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