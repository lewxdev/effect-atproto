/**
 * AT URI syntax.
 *
 * @since 0.2.0
 */

import * as Function from "effect/Function";
import * as Schema from "effect/Schema";
import * as SchemaGetter from "effect/SchemaGetter";
import * as SchemaParser from "effect/SchemaParser";

import { AtIdentifier } from "./AtIdentifier.ts";
import { Nsid } from "./Nsid.ts";
import { Rkey } from "./Rkey.ts";

const AtUriParser = Schema.Union([
  Schema.TemplateLiteralParser(["at://", AtIdentifier, "/", Nsid, "/", Rkey]),
  Schema.TemplateLiteralParser(["at://", AtIdentifier, "/", Nsid]),
  Schema.TemplateLiteralParser(["at://", AtIdentifier]),
]);

/**
 * Restricted AT URI structure.
 *
 * Represents `at://AUTHORITY[/COLLECTION[/RKEY]]` values. Handle authorities
 * and collection NSID authorities are lowercase-normalized by their underlying
 * schemas, while DID and record-key content remains case-sensitive.
 *
 * Spec: https://atproto.com/specs/at-uri-scheme#restricted-at-uri-syntax
 *
 * @since 0.2.0
 */
export const AtUri: Schema.Codec<AtUri, AtUri.Encoded> = Schema.Union([
  Schema.Struct({ authority: AtIdentifier, collection: Nsid, rkey: Rkey }),
  Schema.Struct({ authority: AtIdentifier, collection: Nsid }),
  Schema.Struct({ authority: AtIdentifier }),
]);

/**
 * Restricted AT URI type.
 *
 * @since 0.2.0
 * @ignore
 */
export type AtUri =
  | { readonly authority: AtIdentifier; readonly collection: Nsid; readonly rkey: Rkey }
  | { readonly authority: AtIdentifier; readonly collection: Nsid }
  | { readonly authority: AtIdentifier };

export namespace AtUri {
  export type Encoded =
    | { readonly authority: string; readonly collection: string; readonly rkey: string }
    | { readonly authority: string; readonly collection: string }
    | { readonly authority: string };
}

/**
 * Restricted AT URI string codec.
 *
 * Decodes `at://AUTHORITY[/COLLECTION[/RKEY]]` strings to structured AT URI
 * values and encodes structured values back to AT URI strings.
 *
 * @since 0.2.0
 */
export const AtUriFromString: Schema.Codec<AtUri, string> = Function.pipe(
  Schema.String,
  Schema.check(Schema.isMaxLength(8192)),
  Schema.decodeTo(AtUri, {
    decode: SchemaGetter
      .transformOrFail(SchemaParser.decodeUnknownEffect(AtUriParser))
      .compose(SchemaGetter.transform((parts) =>
        parts.length === 6
          ? { authority: parts[1], collection: parts[3], rkey: parts[5] }
          : parts.length === 4
          ? { authority: parts[1], collection: parts[3] }
          : { authority: parts[1] }
      )),
    encode: SchemaGetter.transform((uri) =>
      "rkey" in uri
        ? `at://${uri.authority}/${uri.collection}/${uri.rkey}`
        : "collection" in uri
        ? `at://${uri.authority}/${uri.collection}`
        : `at://${uri.authority}`
    ),
  }),
);
