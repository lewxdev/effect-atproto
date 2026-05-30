/**
 * Timestamp identifier syntax.
 *
 * @since 0.1.0
 */

import type * as Brand from "effect/Brand";
import * as Function from "effect/Function";
import * as Schema from "effect/Schema";

/**
 * Runtime brand identifier used for `Tid` identifiers.
 *
 * @category type IDs
 * @since 0.1.0
 */
export const TidTypeId: TidTypeId = "@effect-atproto/syntax/Tid";

/**
 * Brand identifier used for `Tid` identifiers.
 *
 * @category type IDs
 * @since 0.1.0
 */
export type TidTypeId = "@effect-atproto/syntax/Tid";

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
export const Tid: Schema.Codec<Tid, string> = Function.pipe(
  Schema.String,
  Schema.check(
    Schema.isPattern(TID_PATTERN, { expected: "a valid TID" }),
  ),
  Schema.brand(TidTypeId),
);

/**
 * Timestamp identifier type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Tid = Brand.Branded<string, TidTypeId>;
