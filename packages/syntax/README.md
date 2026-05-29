# @effect-atproto/syntax

Effect schemas for AT Protocol syntax strings.

This package is syntax-only. It validates and normalizes string syntax; it does
not perform identity resolution, make network requests, generate TIDs, or expose
`AtUri`, `Cid`, or `AtIdentifier` schemas.

## Install

```sh
bun add @effect-atproto/syntax effect
```

## Imports

Import the schema you need and use the standard `effect/Schema` helpers.

```ts
import { Did } from "@effect-atproto/syntax";
import * as Schema from "effect/Schema";
```

## Examples

### Did

```ts
import { Did } from "@effect-atproto/syntax/Did";
import * as Schema from "effect/Schema";

const did = Schema.decodeUnknownSync(Did)("did:plc:ewvi7nxzyoun6zhxrhs64oiz");
```

Spec: https://atproto.com/specs/did

### Handle

```ts
import { Handle } from "@effect-atproto/syntax/Handle";
import * as Schema from "effect/Schema";

const handle = Schema.decodeUnknownSync(Handle)("Alice.Bsky.Social");
// "alice.bsky.social"
```

Spec: https://atproto.com/specs/handle

### Nsid

```ts
import { Nsid } from "@effect-atproto/syntax/Nsid";
import * as Schema from "effect/Schema";

const nsid = Schema.decodeUnknownSync(Nsid)("COM.Atproto.Sync.getRecord");
// "com.atproto.sync.getRecord"
```

Spec: https://atproto.com/specs/nsid

### Rkey

```ts
import { Rkey } from "@effect-atproto/syntax/Rkey";
import * as Schema from "effect/Schema";

const rkey = Schema.decodeUnknownSync(Rkey)("3jui7kd54zh2y");
```

Spec: https://atproto.com/specs/record-key

### Tid

```ts
import { Tid } from "@effect-atproto/syntax/Tid";
import * as Schema from "effect/Schema";

const tid = Schema.decodeUnknownSync(Tid)("3jzfcijpj2z2a");
```

Spec: https://atproto.com/specs/tid
