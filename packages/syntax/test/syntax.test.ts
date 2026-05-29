import * as BunFileSystem from "@effect/platform-bun/BunFileSystem";
import { assert, describe, it } from "@effect/vitest";
import { Effect, FileSystem, Schema, Stream } from "effect";

import { Did, Handle, Nsid, Rkey, Tid } from "../src/index.ts";

const fixtureBaseUrl = new URL("../../../vendor/atproto-interop-tests/syntax/", import.meta.url);

const validate = Effect.fnUntraced(function*<T>(schema: Schema.Codec<T, string>, id: string) {
  const fs = yield* FileSystem.FileSystem;

  for (const [kind, expectedTag] of [["invalid", "Failure"], ["valid", "Success"]] as const) {
    const file = `${id}_syntax_${kind}.txt`;
    const { pathname } = new URL(file, fixtureBaseUrl);

    const values = yield* fs.stream(pathname).pipe(
      Stream.decodeText,
      Stream.splitLines,
      Stream.filter((line) => line !== "" && line[0] !== "#"),
      Stream.runCollect,
    );

    assert.isNotEmpty(values, `${file} had no fixture values`);

    for (const value of values) {
      const exit = Schema.decodeExit(schema)(value);
      assert.strictEqual(exit._tag, expectedTag, `${file}: ${value}`);
    }
  }
}, Effect.provide(BunFileSystem.layer));

describe("syntax fixtures", () => {
  it.effect("validates DID vectors", () => validate(Did.Did, "did"));
  it.effect("validates handle vectors", () => validate(Handle.Handle, "handle"));
  it.effect("validates NSID vectors", () => validate(Nsid.Nsid, "nsid"));
  it.effect("validates record key vectors", () => validate(Rkey.Rkey, "recordkey"));
  it.effect("validates TID vectors", () => validate(Tid.Tid, "tid"));
});
