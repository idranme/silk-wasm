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