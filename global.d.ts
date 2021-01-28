declare module '*.wasm' {
  const wasm: () => Promise<any>;
  export default wasm
}

interface Window {
  global: string;
}
