const packages = [
  {
    source: "packages/syntax/docs",
    target: "docs/api/syntax",
  },
];

await Bun.$`rm -rf docs/api`;

for (const { source, target } of packages) {
  await Bun.$`mkdir -p ${target}`;
  await Bun.$`cp -R ${source}/. ${target}/`;
}
