// Static inspection of plugin source files
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const base = resolve(process.env.USERPROFILE, ".dsh/profiles/web/node_modules");

console.log("=== static inspection of plugin source ===\n");

for (const pkg of ["dsh-prompt-profile", "dsh-web-search-pro", "@anweat/dsh-browser"]) {
  console.log(`--- ${pkg} ---`);
  // Find main entry point
  const candidates = [
    `${base}/${pkg}/lib/index.js`,
    `${base}/${pkg}/lib/index.mjs`,
    `${base}/${pkg}/index.js`,
  ];
  let main = null;
  for (const c of candidates) {
    if (existsSync(c)) { main = c; break; }
  }
  if (!main) { console.log(`  no entry found`); continue; }

  console.log(`  main: ${main.split(base)[1]}`);
  const src = readFileSync(main, "utf8");

  // Look for tool/service exports
  const toolMatches = src.matchAll(/["']?([\w-]+)["']?:\s*(?:async\s*)?(?:function|\([^)]*\)\s*=>)/g);
  const tools = [...new Set([...toolMatches].map(m => m[1]))].filter(t => t.length > 2 && !/^(id|name|type|version|require|import|export|const|let|var|if|else|return|await|async|new|class|function)$/.test(t));
  console.log(`  exposed fns (${tools.length}): ${tools.slice(0, 10).join(", ")}${tools.length > 10 ? "..." : ""}`);

  // Look for DSH-specific exports (apply, Config, name, inject)
  const hasApply = src.includes("export function apply") || src.includes("export const apply");
  const hasConfig = src.includes("export const Config");
  const hasName = src.match(/export const name\s*=\s*["']([\w-]+)["']/);
  const hasInject = src.match(/export const inject\s*=\s*\[([^\]]+)\]/);
  console.log(`  DSH shape: apply=${hasApply}, Config=${hasConfig}, name=${hasName?.[1] ?? "n/a"}, inject=${hasInject?.[1] ?? "n/a"}`);
}
