declare module '*.wasm' {
  const wasm: (options?: WebAssembly.Imports) => Promise<WebAssembly.Memory>;
  export default wasm;
}
declare module 'rollup-plugin-less';
declare module 'rollup-plugin-babel';

interface Window {
  v_global: string;
}