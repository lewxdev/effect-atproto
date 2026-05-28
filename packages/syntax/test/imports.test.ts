import { assert, describe, it } from "@effect/vitest";

import * as Syntax from "@effect-atproto/syntax";
import * as Did from "@effect-atproto/syntax/Did";
import * as Handle from "@effect-atproto/syntax/Handle";
import * as Nsid from "@effect-atproto/syntax/Nsid";
import * as RecordKey from "@effect-atproto/syntax/RecordKey";
import * as Tid from "@effect-atproto/syntax/Tid";

describe("@effect-atproto/syntax package imports", () => {
  it("exposes the root module surface", () => {
    assert.deepStrictEqual(Object.keys(Syntax), [
      "Did",
      "Handle",
      "Nsid",
      "RecordKey",
      "Tid",
    ]);
  });

  it("exposes public subpath modules", () => {
    assert.deepStrictEqual(Object.keys(Did), ["Did"]);
    assert.deepStrictEqual(Object.keys(Handle), ["Handle"]);
    assert.deepStrictEqual(Object.keys(Nsid), ["Nsid"]);
    assert.deepStrictEqual(Object.keys(RecordKey), ["RecordKey"]);
    assert.deepStrictEqual(Object.keys(Tid), ["Tid"]);
  });
});
