import Instance from './silk.js'
import * as WavDecoder from 'wav-file-decoder'
import { ensureMonoPcm, ensureS16lePcm, toUTF8String, binaryFromSource } from './utils'

export interface EncodeResult {
  /** SILK */
  data: Uint8Array
  /** in milliseconds */
  duration: number
}

export interface DecodeResult {
  /** pcm_s16le */
  data: Uint8Array
  /** in milliseconds */
  duration: number
}

/** @deprecated use `EncodeResult` instead */
export interface encodeResult extends EncodeResult {
}

/** @deprecated use `DecodeResult` instead */
export interface decodeResult extends DecodeResult {
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
 * @param sampleRate `input` 的采样率，可为 8000/12000/16000/24000/32000/44100/48000，当 `input` 为 WAV 时可填入 0
 * @returns SILK
 */
export async function encode(input: ArrayBufferView | ArrayBuffer, sampleRate: number): Promise<EncodeResult> {
  const instance = await Instance()
  let buffer = binaryFromSource(input)

  if (!buffer?.byteLength) throw new Error('input data length is 0')

  if (WavDecoder.isWavFile(input)) {
    const { channelData, sampleRate: wavSampleRate } = WavDecoder.decodeWavFile(input)
    sampleRate ||= wavSampleRate
    buffer = ensureS16lePcm(ensureMonoPcm(channelData))
  }

  let data = new Uint8Array()

  const duration = instance.silk_encode(buffer, sampleRate, (output: Uint8Array) => {
    data = output.slice()
  })

  if (duration === 0) throw new Error('silk encoding failure')

  return {
    data,
    duration
  }
}

/**
 * 将 SILK 解码为 PCM
 * @param input SILK 文件
 * @param sampleRate `input` 的采样率
 * @returns pcm_s16le
 */
export async function decode(input: ArrayBufferView | ArrayBuffer, sampleRate: number): Promise<DecodeResult> {
  const instance = await Instance()
  const buffer = binaryFromSource(input)

  if (!buffer?.byteLength) throw new Error('input data length is 0')

  let data = new Uint8Array()

  const duration = instance.silk_decode(buffer, sampleRate, (output: Uint8Array) => {
    if (output.length > 0) {
      data = output.slice()
    }
  })

  if (duration === 0) throw new Error('silk decoding failure')

  return {
    data,
    duration
  }
}

/**
 * 获取 SILK 音频时长
 * @param data SILK 文件
 * @param frameMs SILK 的 frameMs，可为 20/40/60/80/100，默认为 20
 * @returns 单位为毫秒的时长
 */
export function getDuration(data: ArrayBufferView | ArrayBuffer, frameMs = 20): number {
  const buffer = binaryFromSource(data)
  const view = new DataView(buffer)
  const byteLength = view.byteLength
  let offset = view.getUint8(0) === 2 ? 10 : 9
  let blocks = 0
  while (offset < byteLength) {
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
 * @returns metadata
 */
export function getWavFileInfo(data: ArrayBufferView | ArrayBuffer): WavFileInfo {
  return WavDecoder.getWavFileInfo(data)
}

/**
 * 检测是否为 SILK 文件
 * @param data 任意文件
 */
export function isSilk(data: ArrayBufferView | ArrayBuffer): boolean {
  const buffer = binaryFromSource(data)
  if (buffer.byteLength < 7) return false
  return toUTF8String(buffer, 0, 7).includes('#!SILK')
}
