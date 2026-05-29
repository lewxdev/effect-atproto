import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Effect, FileSystem, Path, Schema } from "effect";
import { ChildProcess, ChildProcessSpawner } from "effect/unstable/process";

const PackageJson = Schema.Struct({
  name: Schema.String,
  scripts: Schema.optional(Schema.Record(Schema.String, Schema.String)),
});

const withLayout = (content: string) => content.replace(/^---\n/, "---\nlayout: default\n");

const rewriteModule = (content: string, packageName: string) =>
  withLayout(content).replace(/^parent: Modules$/m, `parent: "${packageName}"`);

const packageIndex = (packageName: string, packagePath: string, navOrder: number) =>
  `---
layout: default
title: "${packageName}"
has_children: true
permalink: /${packagePath}/
nav_order: ${navOrder}
---
`;

const program = Effect.gen(function*() {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const spawner = yield* ChildProcessSpawner.ChildProcessSpawner;

  const packages = yield* fs.readDirectory("packages");

  for (const [index, packagePath] of packages.entries()) {
    const packageRoot = path.join("packages", packagePath);
    const packageJson = yield* Schema.decodeUnknownEffect(PackageJson)(
      JSON.parse(yield* fs.readFileString(path.join(packageRoot, "package.json"))),
    );
    const modulesRoot = path.join(packageRoot, "docs", "modules");

    if (packageJson.scripts?.docgen !== undefined) {
      yield* spawner.exitCode(ChildProcess.make("bun", ["run", "docgen"], {
        cwd: packageRoot,
        stdout: "inherit",
        stderr: "inherit",
      }));
    }

    const hasModules = yield* fs.exists(modulesRoot);

    if (hasModules) {
      const destination = path.join("docs", packagePath);

      yield* fs.remove(destination, { recursive: true, force: true });
      yield* fs.makeDirectory(destination, { recursive: true });
      yield* fs.writeFileString(
        path.join(destination, "index.md"),
        packageIndex(packageJson.name, packagePath, index + 2),
      );

      const files = yield* fs.readDirectory(modulesRoot);

      for (const file of files) {
        if (file.endsWith(".md") && file !== "index.md") {
          const content = yield* fs.readFileString(path.join(modulesRoot, file));
          yield* fs.writeFileString(path.join(destination, file), rewriteModule(content, packageJson.name));
        }
      }
    }
  }
});

program.pipe(Effect.provide(BunServices.layer), BunRuntime.runMain);
