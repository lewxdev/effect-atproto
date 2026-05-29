/**
 * Repository record key syntax.
 *
 * @since 0.1.0
 */

import type * as Brand from "effect/Brand";
import * as Function from "effect/Function";
import * as Schema from "effect/Schema";

const RKEY_PATTERN = /^(?!\.\.?$)[A-Za-z0-9._:~-]+$/;

/**
 * Runtime brand identifier used for `Rkey` identifiers.
 *
 * @category type IDs
 * @since 0.1.0
 */
export const RkeyTypeId: RkeyTypeId = "@effect-atproto/syntax/Rkey";

/**
 * Brand identifier used for `Rkey` identifiers.
 *
 * @category type IDs
 * @since 0.1.0
 */
export type RkeyTypeId = "@effect-atproto/syntax/Rkey";

/**
 * Repository record key syntax.
 *
 * Record keys identify records within an atproto repository collection. This
 * schema validates the baseline `record-key` syntax only; collection-specific
 * key policies such as `tid`, `nsid`, or `literal:self` are separate concerns.
 *
 * Spec: https://atproto.com/specs/record-key
 *
 * @since 0.1.0
 */
export const Rkey: Schema.Codec<Rkey, string> = Function.pipe(
  Schema.String,
  Schema.check(
    Schema.isLengthBetween(1, 512),
    Schema.isPattern(RKEY_PATTERN, { expected: "a valid rkey" }),
  ),
  Schema.brand(RkeyTypeId),
);

/**
 * Repository record key type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Rkey = Brand.Branded<string, RkeyTypeId>;
