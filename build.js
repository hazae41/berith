import { readFileSync, rmSync, writeFileSync } from "fs";

const wasm = readFileSync("./wasm/pkg/berith_bg.wasm");
writeFileSync(`./wasm/pkg/berith.wasm.js`, `export const wasm = "${wasm.toString("base64")}";`);
writeFileSync(`./wasm/pkg/berith.wasm.d.ts`, `export const wasm: string;`);

const script = readFileSync(`./wasm/pkg/berith.js`, "utf8")
  .replace("export { initSync }", "export { init, initSync }")
  .replace("input = new URL('berith_bg.wasm', import.meta.url);", "throw new Error();")

const typing = readFileSync(`./wasm/pkg/berith.d.ts`, "utf8")
  .replace("export default function init", "export function init")

writeFileSync(`./wasm/pkg/berith.js`, script)
writeFileSync(`./wasm/pkg/berith.d.ts`, typing)

rmSync(`./wasm/pkg/.gitignore`, { force: true });