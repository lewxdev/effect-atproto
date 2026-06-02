# @effect-atproto/syntax

Effect schemas for AT Protocol syntax strings.

This package is syntax-only. It validates and normalizes string syntax; it does
not perform identity resolution, make network requests, generate TIDs, or expose
a `Cid` schema.

## Install

```sh
bun add @effect-atproto/syntax effect
```

## Imports

Import the schema you need and use the standard `effect/Schema` helpers.

```ts
import { Did } from "@effect-atproto/syntax/Did";
import * as Schema from "effect/Schema";
```

## Examples

### `AtIdentifier`

```ts
import { AtIdentifier } from "@effect-atproto/syntax/AtIdentifier";
import * as Schema from "effect/Schema";

const identifier = Schema.decodeSync(AtIdentifier)("LEWX.DEV");
// "lewx.dev"
```

Spec: [Restricted AT URI syntax](https://atproto.com/specs/at-uri-scheme#restricted-at-uri-syntax)

### `AtUri`

```ts
import { AtUriFromString } from "@effect-atproto/syntax/AtUri";
import * as Schema from "effect/Schema";

const uri = Schema.decodeSync(AtUriFromString)("at://LEWX.DEV/APP.BSKY.FEED.post/3lfbegemqmc2v");
// { authority: "lewx.dev", collection: "app.bsky.feed.post", rkey: "3lfbegemqmc2v" }
```

Spec: [Restricted AT URI syntax](https://atproto.com/specs/at-uri-scheme#restricted-at-uri-syntax)

### `Did`

```ts
import { Did } from "@effect-atproto/syntax/Did";
import * as Schema from "effect/Schema";

const did = Schema.decodeSync(Did)("did:plc:5zcg3kb3yhfdh5xbpq7raf3p");
```

Spec: [DID syntax](https://atproto.com/specs/did)

### `Handle`

```ts
import { Handle } from "@effect-atproto/syntax/Handle";
import * as Schema from "effect/Schema";

const handle = Schema.decodeSync(Handle)("LEWX.DEV");
// "lewx.dev"
```

Spec: [Handle syntax](https://atproto.com/specs/handle)

### `Nsid`

```ts
import { Nsid } from "@effect-atproto/syntax/Nsid";
import * as Schema from "effect/Schema";

const nsid = Schema.decodeSync(Nsid)("APP.BSKY.FEED.post");
// "app.bsky.feed.post"
```

Spec: [NSID syntax](https://atproto.com/specs/nsid)

### `Rkey`

```ts
import { Rkey } from "@effect-atproto/syntax/Rkey";
import * as Schema from "effect/Schema";

const rkey = Schema.decodeSync(Rkey)("3lfbegemqmc2v");
```

Spec: [Record key syntax](https://atproto.com/specs/record-key)

### `Tid`

```ts
import { Tid } from "@effect-atproto/syntax/Tid";
import * as Schema from "effect/Schema";

const tid = Schema.decodeSync(Tid)("3jzfcijpj2z2a");
```

Spec: [TID syntax](https://atproto.com/specs/tid)
