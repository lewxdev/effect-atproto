const [workspace] = Bun.argv.slice(2);

if (workspace === undefined) {
  console.error("usage: bun scripts/docgen.ts <workspace>");
  process.exit(1);
}

const proc = Bun.spawn(
  [
    "/usr/bin/env",
    "bun",
    "x",
    "--bun",
    "docgen",
    "--src",
    "src",
    "--out",
    "docs",
    "--exclude",
    "src/internal/**/*.ts",
  ],
  {
    cwd: workspace,
    stdout: "inherit",
    stderr: "inherit",
  },
);

process.exit(await proc.exited);
