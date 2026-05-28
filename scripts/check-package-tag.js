const [tag] = Bun.argv.slice(2);

if (tag === undefined) {
  console.error("usage: bun scripts/check-package-tag.js <tag>");
  process.exit(1);
}

const proc = Bun.spawn(["git", "ls-remote", "--exit-code", "--tags", "origin", `refs/tags/${tag}`], {
  stdout: "ignore",
  stderr: "ignore",
});

const exists = await proc.exited === 0 ? "true" : "false";
const output = `exists=${exists}\n`;

if (process.env.GITHUB_OUTPUT === undefined) {
  process.stdout.write(output);
} else {
  await Bun.write(process.env.GITHUB_OUTPUT, output);
}
