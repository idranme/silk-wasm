// forked from https://github.com/nodejs/node/blob/5fab505c766fee37123f840099ced56a6198dc84/lib/buffer.js#L575
// MIT License
export function concat(list: Uint8Array[], length?: number) {
    if (list.length === 0) return new Uint8Array()

    if (length === undefined) {
        length = 0
        for (let i = 0; i < list.length; i++) {
            if (list[i].length) {
                length += list[i].length
            }
        }
    }

    const buffer = new Uint8Array(length)
    let pos = 0
    for (let i = 0; i < list.length; i++) {
        const buf = list[i]
        pos += _copyActual(buf, buffer, pos, 0, buf.length)
    }

    // Note: `length` is always equal to `buffer.length` at this point
    if (pos < length) {
        // Zero-fill the remaining bytes if the specified `length` was more than
        // the actual total length, i.e. if we have some remaining allocated bytes
        // there were not initialized.
        buffer.fill(0, pos, length)
    }

    return buffer
}

// forked from https://github.com/nodejs/node/blob/5fab505c766fee37123f840099ced56a6198dc84/lib/buffer.js#L243
// MIT License
function _copyActual(source: Uint8Array, target: Uint8Array, targetStart: number, sourceStart: number, sourceEnd: number) {
    if (sourceEnd - sourceStart > target.length - targetStart)
        sourceEnd = sourceStart + target.length - targetStart

    let nb = sourceEnd - sourceStart
    const sourceLen = source.length - sourceStart
    if (nb > sourceLen)
        nb = sourceLen

    if (sourceStart !== 0 || sourceEnd < source.length)
        source = new Uint8Array(source.buffer, source.byteOffset + sourceStart, nb)

    target.set(source, targetStart)

    return nb
}

export function ensureMonoPcm(channelData: Float32Array[]): Float32Array {
    const { length: numberOfChannels } = channelData
    if (numberOfChannels === 1) {
        return channelData[0]
    }
    const monoData = new Float32Array(channelData[0].length)
    for (let i = 0; i < monoData.length; i++) {
        let sum = 0
        for (let j = 0; j < numberOfChannels; j++) {
            sum += channelData[j][i]
        }
        monoData[i] = sum / numberOfChannels
    }
    return monoData
}

export function ensureS16lePcm(input: Float32Array): ArrayBuffer {
    const numberOfFrames = input.length
    const bytesPerSample = Math.ceil(16 / 8)
    const fileLength = numberOfFrames * bytesPerSample
    const arrayBuffer = new ArrayBuffer(fileLength)
    const int16Array = new Int16Array(arrayBuffer)
    for (let offset = 0; offset < numberOfFrames; offset++) {
        const sampleValueFloat = input[offset]
        const sampleValueInt16 = floatToSignedInt16(sampleValueFloat)
        int16Array[offset] = sampleValueInt16
    }
    return arrayBuffer
}

// input: [-1,1] float32
function floatToSignedInt16(v: number): number {
    v *= 32768
    v = ~~v
    return v > 32767 ? 32767 : v
}