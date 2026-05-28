/**
 * Handle syntax.
 *
 * @since 0.1.0
 */
import type * as Brand from "effect/Brand";
import * as Schema from "effect/Schema";
import * as SchemaTransformation from "effect/SchemaTransformation";

const HANDLE_PATTERN = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/;

const NormalizedHandle = Schema.String.check(
  Schema.isMaxLength(253),
  Schema.isPattern(HANDLE_PATTERN, {
    expected: "a handle",
  }),
  Schema.isLowercased(),
);

/**
 * Handle syntax.
 *
 * Handles use DNS hostname syntax, must contain at least two labels, and decode
 * to lowercase because handle syntax is case-insensitive.
 *
 * Spec: https://atproto.com/specs/handle
 *
 * @since 0.1.0
 */
export const Handle: Schema.Codec<Handle, string> = Schema.String.pipe(
  Schema.decodeTo(NormalizedHandle, SchemaTransformation.toLowerCase()),
  Schema.brand("Handle"),
);

/**
 * Handle type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Handle = Brand.Branded<string, "Handle">;
