import { assert, describe, it } from "@effect/vitest";

import * as Syntax from "../src/index.js";

describe("@effect-atproto/syntax", () => {
  it("exposes public syntax modules", () => {
    assert.deepStrictEqual(Object.keys(Syntax), [
      "Did",
      "Handle",
      "Nsid",
      "RecordKey",
      "Tid",
    ]);
  });
});
