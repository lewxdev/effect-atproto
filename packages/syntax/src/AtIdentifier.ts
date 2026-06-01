/**
 * AT Protocol identifier syntax.
 *
 * @since 0.2.0
 */

import type * as Brand from "effect/Brand";
import * as Function from "effect/Function";
import * as Schema from "effect/Schema";

import { Did } from "./Did.ts";
import { Handle } from "./Handle.ts";

/**
 * Runtime brand identifier used for `AtIdentifier` identifiers.
 *
 * @category type IDs
 * @since 0.2.0
 */
export const AtIdentifierTypeId: AtIdentifierTypeId = "@effect-atproto/syntax/AtIdentifier";

/**
 * Brand identifier used for `AtIdentifier` identifiers.
 *
 * @category type IDs
 * @since 0.2.0
 */
export type AtIdentifierTypeId = "@effect-atproto/syntax/AtIdentifier";

/**
 * AT Protocol account identifier syntax.
 *
 * Account identifiers may be either a DID or a handle. Handles decode to
 * lowercase through the underlying `Handle` schema.
 *
 * Spec: https://atproto.com/specs/at-uri-scheme#restricted-at-uri-syntax
 *
 * @since 0.2.0
 */
export const AtIdentifier: Schema.Codec<AtIdentifier, string> = Function.pipe(
  Schema.Union([Did, Handle]),
  Schema.brand(AtIdentifierTypeId),
);

/**
 * AT Protocol account identifier type.
 *
 * @since 0.2.0
 * @ignore
 */
export type AtIdentifier = Brand.Branded<Did | Handle, AtIdentifierTypeId>;
