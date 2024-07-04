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
    const fileLength = input.length * 2
    const arrayBuffer = new ArrayBuffer(fileLength)
    const int16Array = new Int16Array(arrayBuffer)
    for (let offset = 0; offset < input.length; offset++) {
        const x = ~~(input[offset] * 32768)
        int16Array[offset] = x > 32767 ? 32767 : x
    }
    return arrayBuffer
}

export function toUTF8String(input: ArrayBuffer, start = 0, end = input.byteLength) {
    return (new TextDecoder()).decode(input.slice(start, end))
}

export function binaryFromSource(source: ArrayBufferView | ArrayBuffer) {
    if (ArrayBuffer.isView(source)) {
        return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength)
    } else {
        return source
    }
}