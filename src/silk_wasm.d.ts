// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    let HEAPF64: any;
    let HEAP_DATA_VIEW: any;
    let HEAP8: any;
    let HEAPU8: any;
    let HEAP16: any;
    let HEAPU16: any;
    let HEAP32: any;
    let HEAPU32: any;
    let HEAP64: any;
    let HEAPU64: any;
}
interface WasmModule {
}

interface EmbindModule {
  silk_encode(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: number, _2: number, _3: any): number;
  silk_decode(_0: ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string, _1: number, _2: number, _3: any): number;
}
export type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
