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

describe("syntax schemas", () => {
  it("validates spec examples", () => {
    assert.strictEqual(
      Schema.decodeUnknownSync(Did.Did)("did:plc:ewvi7nxzyoun6zhxrhs64oiz"),
      "did:plc:ewvi7nxzyoun6zhxrhs64oiz",
    );
    assert.strictEqual(
      Schema.decodeUnknownSync(Did.Did)("did:web:user.example.com"),
      "did:web:user.example.com",
    );

    assert.strictEqual(
      Schema.decodeUnknownSync(Handle.Handle)("Alice.Bsky.Social"),
      "alice.bsky.social",
    );
    assert.strictEqual(
      Schema.decodeUnknownSync(Nsid.Nsid)("COM.Atproto.Sync.getRecord"),
      "com.atproto.sync.getRecord",
    );

    assert.strictEqual(
      Schema.decodeUnknownSync(RecordKey.RecordKey)("3jui7kd54zh2y"),
      "3jui7kd54zh2y",
    );
    assert.strictEqual(Schema.decodeUnknownSync(RecordKey.RecordKey)("self"), "self");

    assert.strictEqual(
      Schema.decodeUnknownSync(Tid.Tid)("3jzfcijpj2z2a"),
      "3jzfcijpj2z2a",
    );
    assert.strictEqual(
      Schema.decodeUnknownSync(Tid.Tid)("2222222222222"),
      "2222222222222",
    );
  });

  it("normalizes handles to lowercase", () => {
    assert.strictEqual(
      Schema.decodeUnknownSync(Handle.Handle)("A.ISI.EDU"),
      "a.isi.edu",
    );
    assert.strictEqual(
      Schema.decodeUnknownSync(Handle.Handle)("Alice.Bsky.Social"),
      "alice.bsky.social",
    );
  });

  it("normalizes NSID authority and preserves the name segment", () => {
    assert.strictEqual(
      Schema.decodeUnknownSync(Nsid.Nsid)("COM.Atproto.Sync.getRecord"),
      "com.atproto.sync.getRecord",
    );
    assert.strictEqual(
      Schema.decodeUnknownSync(Nsid.Nsid)("ONE.TWO.THREE.FiVe"),
      "one.two.three.FiVe",
    );
  });

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
