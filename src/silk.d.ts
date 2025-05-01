// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
}

type EmbindString = ArrayBuffer|Uint8Array|Uint8ClampedArray|Int8Array|string;
interface EmbindModule {
  silk_encode(_0: EmbindString, _1: number, _2: (output: Uint8Array) => void): number;
  silk_decode(_0: EmbindString, _1: number, _2: (output: Uint8Array) => void): number;
}

export type MainModule = WasmModule & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
