import silkWasm from './silk_wasm.js'

export async function encode(input: Buffer, sampleRate: number) {
    const instance = await silkWasm()
    const u8Array = Uint8Array.from(input)

    const arr: Buffer[] = []

    const ret = instance.silk_encode(u8Array, input.length, sampleRate, (chunk) => {
        const buf = Buffer.from(chunk)
        arr.push(buf)
    })

    if (ret === 0) throw new Error('编码失败')

    return Buffer.concat(arr).subarray(0, -1)
}