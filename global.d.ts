declare module '*.wasm' {
  const wasm: (options?: WebAssembly.Imports) => Promise<WebAssembly.Memory>;
  export default wasm;
}

interface Window {
  __GLOBAL__meaning: string;
}

// 推荐使用这个
declare const __GLOBAL__meaning: string;