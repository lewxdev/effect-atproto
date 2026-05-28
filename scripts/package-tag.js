const [workspace] = Bun.argv.slice(2);

if (workspace === undefined) {
  console.error("usage: bun scripts/package-tag.js <workspace>");
  process.exit(1);
}

const { name, version } = await Bun.file(`${workspace}/package.json`).json();
const tag = `${name}@${version}`;
const output = `name=${name}\nversion=${version}\ntag=${tag}\n`;

if (process.env.GITHUB_OUTPUT === undefined) {
  process.stdout.write(output);
} else {
  await Bun.write(process.env.GITHUB_OUTPUT, output);
}
