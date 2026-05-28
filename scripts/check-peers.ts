const rootPackage = await Bun.file("package.json").json();
const syntaxPackage = await Bun.file("packages/syntax/package.json").json();

const rootEffect = rootPackage.devDependencies?.effect;
const syntaxEffect = syntaxPackage.peerDependencies?.effect;

if (rootEffect !== syntaxEffect) {
  console.error(
    `effect peer mismatch: root devDependencies.effect=${rootEffect} packages/syntax peerDependencies.effect=${syntaxEffect}`,
  );
  process.exit(1);
}
