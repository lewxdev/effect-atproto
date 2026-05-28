/**
 * Timestamp identifier syntax.
 *
 * @since 0.1.0
 */
import type * as Brand from "effect/Brand";
import * as Schema from "effect/Schema";

const TID_PATTERN = /^[234567abcdefghij][234567abcdefghijklmnopqrstuvwxyz]{12}$/;

/**
 * Timestamp identifier syntax.
 *
 * TIDs are compact timestamp identifiers encoded with atproto's sortable
 * base32 alphabet. This schema validates existing TID strings only; it does
 * not generate new identifiers.
 *
 * Spec: https://atproto.com/specs/tid
 *
 * @since 0.1.0
 */
export const Tid: Schema.Codec<Tid, string> = Schema.String.check(
  Schema.isPattern(TID_PATTERN, {
    expected: "a TID",
  }),
).pipe(Schema.brand("Tid"));

/**
 * Timestamp identifier type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Tid = Brand.Branded<string, "Tid">;
