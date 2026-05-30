/**
 * Handle syntax.
 *
 * @since 0.1.0
 */

import type * as Brand from "effect/Brand";
import * as Function from "effect/Function";
import * as Schema from "effect/Schema";
import * as SchemaTransformation from "effect/SchemaTransformation";

/**
 * Runtime brand identifier used for `Handle` identifiers.
 *
 * @category type IDs
 * @since 0.1.0
 */
export const HandleTypeId: HandleTypeId = "@effect-atproto/syntax/Handle";

/**
 * Brand identifier used for `Handle` identifiers.
 *
 * @category type IDs
 * @since 0.1.0
 */
export type HandleTypeId = "@effect-atproto/syntax/Handle";

const HANDLE_PATTERN = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]([a-z0-9-]{0,61}[a-z0-9])?$/;

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
export const Handle: Schema.Codec<Handle, string> = Function.pipe(
  Schema.String,
  Schema.decode(
    SchemaTransformation.toLowerCase(),
  ),
  Schema.check(
    Schema.isMaxLength(253),
    Schema.isPattern(HANDLE_PATTERN, { expected: "a valid handle" }),
  ),
  Schema.brand(HandleTypeId),
);

/**
 * Handle type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Handle = Brand.Branded<string, HandleTypeId>;
