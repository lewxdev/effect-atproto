/**
 * Namespaced identifier syntax.
 *
 * @since 0.1.0
 */
import type * as Brand from "effect/Brand";
import * as Schema from "effect/Schema";
import * as SchemaGetter from "effect/SchemaGetter";

const NSID_PATTERN =
  /^[a-z]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+(\.[a-zA-Z]([a-zA-Z0-9]{0,62})?)$/;

const normalizeAuthority = (nsid: string): string => {
  const lastDot = nsid.lastIndexOf(".");

  return lastDot === -1
    ? nsid
    : `${nsid.slice(0, lastDot).toLowerCase()}${nsid.slice(lastDot)}`;
};

const NormalizedNsid = Schema.String.check(
  Schema.isMaxLength(317),
  Schema.isPattern(NSID_PATTERN, {
    expected: "an NSID",
  }),
);

/**
 * Namespaced identifier syntax.
 *
 * NSIDs identify Lexicon schemas such as records and XRPC endpoints. Decode
 * normalizes the domain authority to lowercase while preserving the
 * case-sensitive final name segment.
 *
 * Spec: https://atproto.com/specs/nsid
 *
 * @since 0.1.0
 */
export const Nsid: Schema.Codec<Nsid, string> = Schema.String.pipe(
  Schema.decodeTo(NormalizedNsid, {
    decode: SchemaGetter.transform(normalizeAuthority),
    encode: SchemaGetter.passthrough(),
  }),
  Schema.brand("Nsid"),
);

/**
 * Namespaced identifier type.
 *
 * @since 0.1.0
 * @ignore
 */
export type Nsid = Brand.Branded<string, "Nsid">;
