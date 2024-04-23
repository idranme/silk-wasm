import Instance from './silk_wasm.js'
import * as WavDecoder from 'wav-file-decoder'
import { concat, ensureMonoPcm, ensureS16lePcm, toUTF8String } from './utils'

export interface encodeResult {
    /** silk */
    data: Uint8Array
    /** unit: milliseconds */
    duration: number
}

export interface decodeResult {
    /** pcm_s16le */
    data: Uint8Array
    /** unit: milliseconds */
    duration: number
}

export interface WavFileInfo {
    chunkInfo: {
        chunkId: string
        dataOffset: number
        dataLength: number
    }[]
    fmt: {
        formatCode: number
        numberOfChannels: number
        sampleRate: number
        bytesPerSec: number
        bytesPerFrame: number
        bitsPerSample: number
    }
}

/**
   * 编码为 SILK
   * @param input WAV 或单声道 pcm_s16le 文件
   * @param sampleRate `input` 的采样率，可为 8000/12000/16000/24000/32000/44100/48000
   * @return SILK
   */
export async function encode(input: ArrayBufferView | ArrayBuffer, sampleRate: number): Promise<encodeResult> {
    const instance = await Instance()
    let buffer = ArrayBuffer.isView(input) ? input.buffer : input

    if (buffer.byteLength === 0) throw new Error('input data length is 0')

    if (WavDecoder.isWavFile(input)) {
        const { channelData, sampleRate: wavSampleRate } = WavDecoder.decodeWavFile(input)
        sampleRate ||= wavSampleRate
        buffer = ensureS16lePcm(ensureMonoPcm(channelData))
    }

    const arr: Uint8Array[] = []
    let outputLength = 0

    const ret = instance.silk_encode(buffer, buffer.byteLength, sampleRate, (chunk: Uint8Array) => {
        outputLength += chunk.length
        arr.push(chunk.slice())
    })

    if (ret === 0) throw new Error('silk encoding failure')
    const last = arr.pop()
    if (last) {
        arr.push(last.slice(0, -1))
        outputLength--
    }

    return {
        data: concat(arr, outputLength),
        duration: ret
    }
}

/**
   * 将 SILK 解码为 PCM
   * @param input SILK 文件
   * @param sampleRate `input` 的采样率
   * @return pcm_s16le
   */
export async function decode(input: ArrayBufferView | ArrayBuffer, sampleRate: number): Promise<decodeResult> {
    const instance = await Instance()
    const buffer = ArrayBuffer.isView(input) ? input.buffer : input

    if (buffer.byteLength === 0) throw new Error('input data length is 0')

    const arr: Uint8Array[] = []
    let outputLength = 0

    const ret = instance.silk_decode(buffer, buffer.byteLength, sampleRate, (chunk: Uint8Array) => {
        outputLength += chunk.length
        arr.push(chunk.slice())
    })

    if (ret === 0) throw new Error('silk decoding failure')

    return {
        data: concat(arr, outputLength),
        duration: ret
    }
}

/**
   * 获取 SILK 音频时长
   * @param data SILK 文件
   * @param frameMs SILK 的 frameMs，可为 20/40/60/80/100，默认为 20
   * @return 单位为毫秒的时长
   */
export function getDuration(data: ArrayBufferView | ArrayBuffer, frameMs = 20): number {
    const buffer = ArrayBuffer.isView(data) ? data.buffer : data
    const tencent = data[0] === 0x02
    let offset = tencent ? 10 : 9
    let blocks = 0
    const view = new DataView(buffer)
    while (offset < view.byteLength) {
        const size = view.getUint16(offset, true)
        blocks += 1
        offset += size + 2
    }
    return blocks * frameMs
}

/**
   * 检测是否为 WAV 文件
   * @param data 任意文件
   */
export function isWav(data: ArrayBufferView | ArrayBuffer): boolean {
    return WavDecoder.isWavFile(data)
}

/**
   * 获取 WAV 文件的信息
   * @param data WAV 文件
   * @return metadata
   */
export function getWavFileInfo(data: ArrayBufferView | ArrayBuffer): WavFileInfo {
    return WavDecoder.getWavFileInfo(data)
}

/**
   * 检测是否为 SILK 文件
   * @param data 任意文件
   */
export function isSilk(data: ArrayBufferView | ArrayBuffer): boolean {
    const buffer = ArrayBuffer.isView(data) ? data.buffer : data
    if (buffer.byteLength < 7) return false
    return toUTF8String(buffer, 0, 7).includes('#!SILK')
}