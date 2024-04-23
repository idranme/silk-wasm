# Silk Wasm

[![npm](https://img.shields.io/npm/v/silk-wasm?style=flat-square)](https://www.npmjs.com/package/silk-wasm)

QQ/微信语音编解码

## API
```ts
interface encodeResult {
    data: Uint8Array
    duration: number
}

interface decodeResult {
    data: Uint8Array
    duration: number
}

/**
   * 编码为 SILK
   * @param input WAV 或单声道 pcm_s16le 文件
   * @param sampleRate `input` 的采样率，可为 8000/12000/16000/24000/32000/44100/48000
   * @return SILK
   */
function encode(input: ArrayBufferView | ArrayBuffer, sampleRate: number): Promise<encodeResult>

/**
   * 将 SILK 解码为 PCM
   * @param input SILK 文件
   * @param sampleRate `input` 的采样率
   * @return pcm_s16le
   */
function decode(input: ArrayBufferView | ArrayBuffer, sampleRate: number): Promise<decodeResult>

/**
   * 获取 SILK 音频时长
   * @param data SILK 文件
   * @param frameMs SILK 的 frameMs，可为 20/40/60/80/100，默认为 20
   * @return 单位为毫秒的时长
   */
function getDuration(data: ArrayBufferView | ArrayBuffer, frameMs?: number): number

/**
   * 检测是否为 WAV 文件
   * @param data 任意文件
   */
function isWav(data: ArrayBufferView | ArrayBuffer): boolean

/**
   * 获取 WAV 文件的信息
   * @param data WAV 文件
   * @return metadata
   */
function getWavFileInfo(data: ArrayBufferView | ArrayBuffer): WavFileInfo

/**
   * 检测是否为 SILK 文件
   * @param data 任意文件
   */
function isSilk(data: ArrayBufferView | ArrayBuffer): boolean
```

## Example

```js
import { encode } from './lib/index.mjs'  // use `silk-wasm` instead
import { readFile, writeFile } from 'fs/promises'

const pcm = await readFile('./testdata/canon.pcm')
const silk = await encode(pcm, 24000)
await writeFile('./test.silk', silk.data)
```

## Build wasm
```
cd binding
emcmake cmake .
emmake ninja
```