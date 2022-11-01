import { readFile, rm, writeFile } from "fs/promises";

const wasm = await readFile("./wasm/pkg/berith_bg.wasm");

await writeFile(
  `./wasm/pkg/berith.wasm.js`,
  `export const wasm = "${wasm.toString("base64")}";`
);

await writeFile(
  `./wasm/pkg/berith.wasm.d.ts`,
  `export const wasm: string;`
);

await rm(`./wasm/pkg/.gitignore`);