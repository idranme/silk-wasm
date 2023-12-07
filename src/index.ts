import silkWasm from './silk_wasm.js'
import { concat } from './utils'

export interface encodeResult {
    data: Uint8Array
    duration: number
}

export interface decodeResult {
    data: Uint8Array
    duration: number
}

export async function encode(input: Uint8Array, sampleRate: number): Promise<encodeResult> {
    const instance = await silkWasm()

    const arr: Uint8Array[] = []
    let totalLength = 0

    const ret = instance.silk_encode(input, input.length, sampleRate, (chunk: Uint8Array) => {
        totalLength += chunk.length
        arr.push(Uint8Array.from(chunk))
    })

    if (ret === 0) throw new Error('silk encoding failure')

    return {
        data: concat(arr, totalLength).slice(0, -1),
        duration: ret
    }
}

export async function decode(input: Uint8Array, sampleRate: number): Promise<decodeResult> {
    const instance = await silkWasm()

    const arr: Uint8Array[] = []
    let totalLength = 0

    const ret = instance.silk_decode(input, input.length, sampleRate, (chunk: Uint8Array) => {
        totalLength += chunk.length
        arr.push(Uint8Array.from(chunk))
    })

    if (ret === 0) throw new Error('silk decoding failure')

    return {
        data: concat(arr, totalLength),
        duration: ret
    }
}

export function getDuration(silk: Uint8Array, frameMs = 20): number {
    const tencent = silk[0] === 0x02
    let offset = tencent ? 10 : 9
    let i = 0
    const dataView = new DataView(silk.buffer)
    while (offset < silk.length) {
        const size = dataView.getUint16(offset, true)
        offset += 2
        i += 1
        offset += size
    }
    return i * frameMs
}