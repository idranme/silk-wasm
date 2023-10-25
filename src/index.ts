import silkWasm from './silk_wasm.js'

export async function encode(input: Buffer, sampleRate: number): Promise<Buffer> {
    const instance = await silkWasm()
    const u8Array = Uint8Array.from(input)

    const arr: Uint8Array[] = []

    const ret = instance.silk_encode(u8Array, u8Array.length, sampleRate, (chunk: Uint8Array) => {
        arr.push(chunk)
    })

    if (ret === 0) throw new Error('编码失败')

    return Buffer.concat(arr).subarray(0, -1)
}

export async function decode(input: Buffer, sampleRate: number): Promise<Buffer> {
    const instance = await silkWasm()
    const u8Array = Uint8Array.from(input)

    const arr: Uint8Array[] = []

    const ret = instance.silk_decode(u8Array, u8Array.length, sampleRate, (chunk: Uint8Array) => {
        arr.push(chunk)
    })

    if (ret === 0) throw new Error('解码失败')

    return Buffer.concat(arr)
}

export function getDuration(silk: Buffer, frameMs = 20): number {
    const tencent = silk[0] === 0x02
    let offset = tencent ? 10 : 9
    let i = 0
    while (offset < silk.length) {
        const size = silk.readUInt16LE(offset)
        offset += 2
        i += 1
        offset += size
    }
    return i * frameMs
}