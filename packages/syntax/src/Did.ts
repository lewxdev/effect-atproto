/**
 * Decentralized identifier syntax.
 *
 * @since 0.1.0
 */
import type * as Brand from "effect/Brand";
import * as Schema from "effect/Schema";

const DID_PATTERN = /^did:[a-z]+:[a-zA-Z0-9._:%-]*[a-zA-Z0-9._-]$/;

/**
 * Decentralized identifier syntax for AT Protocol.
 *
 * Validates the generic atproto DID identifier syntax described by the spec.
 * It does not restrict to blessed methods such as `did:plc` or `did:web`.
 *
 * Spec: https://atproto.com/specs/did
 *
 * @since 0.1.0
 */
export const Did: Schema.Codec<Did, string> = Schema.String.check(
  Schema.isMaxLength(2048),
  Schema.isPattern(DID_PATTERN, {
    expected: "an AT Protocol DID identifier",
  }),
).pipe(Schema.brand("Did"));

/**
 * Decentralized identifier type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Did = Brand.Branded<string, "Did">;
