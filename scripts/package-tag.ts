const [workspace] = Bun.argv.slice(2);

if (workspace === undefined) {
  console.error("usage: bun scripts/package-tag.ts <workspace>");
  process.exit(1);
}

const { name, version } = await Bun.file(`${workspace}/package.json`).json();
const tag = `${name}@${version}`;
const output = `name=${name}\nversion=${version}\ntag=${tag}\n`;

if (process.env.GITHUB_OUTPUT === undefined) {
  process.stdout.write(output);
} else {
  const file = Bun.file(process.env.GITHUB_OUTPUT);
  await Bun.write(process.env.GITHUB_OUTPUT, `${await file.text()}${output}`);
}
