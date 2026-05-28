/**
 * Repository record key syntax.
 *
 * @since 0.1.0
 */
import type * as Brand from "effect/Brand";
import * as Schema from "effect/Schema";

const RECORD_KEY_PATTERN = /^(?!\.\.?$)[A-Za-z0-9._:~-]+$/;

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
export const RecordKey: Schema.Codec<RecordKey, string> = Schema.String.check(
  Schema.isLengthBetween(1, 512),
  Schema.isPattern(RECORD_KEY_PATTERN, {
    expected: "a record key",
  }),
).pipe(Schema.brand("RecordKey"));

/**
 * Repository record key type.
 *
 * @since 0.1.0
 * @ignore
 */
export type RecordKey = Brand.Branded<string, "RecordKey">;
