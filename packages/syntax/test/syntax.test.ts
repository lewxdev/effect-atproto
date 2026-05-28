import * as BunFileSystem from "@effect/platform-bun/BunFileSystem";
import { assert, describe, it } from "@effect/vitest";
import { Effect, Exit, FileSystem, Schema } from "effect";

import * as Did from "../src/Did.js";
import * as Handle from "../src/Handle.js";
import * as Nsid from "../src/Nsid.js";
import * as RecordKey from "../src/RecordKey.js";
import * as Tid from "../src/Tid.js";

const fixtureBaseUrl = new URL("../../../vendor/atproto-interop-tests/syntax/", import.meta.url);

const fixturePath = (file: string) => new URL(file, fixtureBaseUrl).pathname;

const readFixture = (file: string) =>
  Effect.gen(function*() {
    const fs = yield* FileSystem.FileSystem;
    const text = yield* fs.readFileString(fixturePath(file));

    return text
      .split("\n")
      .map((line) => line.endsWith("\r") ? line.slice(0, -1) : line)
      .filter((line) => line !== "" && line !== "#" && !line.startsWith("# "));
  });

const assertDecodes = <S extends Schema.Top>(
  schema: S,
  values: ReadonlyArray<string>,
) => Effect.forEach(values, (value) => Schema.decodeUnknownEffect(schema)(value), { discard: true });

const assertRejects = <S extends Schema.Top>(
  schema: S,
  values: ReadonlyArray<string>,
) =>
  Effect.forEach(values, (value) =>
    Effect.gen(function*() {
      const result = yield* Effect.exit(Schema.decodeUnknownEffect(schema)(value));

      assert.strictEqual(Exit.isFailure(result), true, value);
    }), { discard: true });

describe("syntax fixtures", () => {
  it.effect("validates interop fixture vectors", () =>
    Effect.gen(function*() {
      const didValid = yield* readFixture("did_syntax_valid.txt");
      const didInvalid = yield* readFixture("did_syntax_invalid.txt");
      const handleValid = yield* readFixture("handle_syntax_valid.txt");
      const handleInvalid = yield* readFixture("handle_syntax_invalid.txt");
      const nsidValid = yield* readFixture("nsid_syntax_valid.txt");
      const nsidInvalid = yield* readFixture("nsid_syntax_invalid.txt");
      const recordKeyValid = yield* readFixture("recordkey_syntax_valid.txt");
      const recordKeyInvalid = yield* readFixture("recordkey_syntax_invalid.txt");
      const tidValid = yield* readFixture("tid_syntax_valid.txt");
      const tidInvalid = yield* readFixture("tid_syntax_invalid.txt");

      yield* assertDecodes(Did.Did, didValid);
      yield* assertRejects(Did.Did, didInvalid);
      yield* assertDecodes(Handle.Handle, handleValid);
      yield* assertRejects(Handle.Handle, handleInvalid);
      yield* assertDecodes(Nsid.Nsid, nsidValid);
      yield* assertRejects(Nsid.Nsid, nsidInvalid);
      yield* assertDecodes(RecordKey.RecordKey, recordKeyValid);
      yield* assertRejects(RecordKey.RecordKey, recordKeyInvalid);
      yield* assertDecodes(Tid.Tid, tidValid);
      yield* assertRejects(Tid.Tid, tidInvalid);
    }).pipe(Effect.provide(BunFileSystem.layer)));
});
