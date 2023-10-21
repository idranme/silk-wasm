# Silk Wasm

[![npm](https://img.shields.io/npm/v/silk-wasm?style=flat-square)](https://www.npmjs.com/package/silk-wasm)

## API
```ts
function encode(input: Buffer, sampleRate: number): Promise<Buffer>
```

input 为 pcm 文件，samplingRate 为采样率。 

## Build wasm
```
cd binding
emcmake cmake .
emmake make
```