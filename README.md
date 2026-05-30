> [!NOTE]
> Early development. The feature table below tracks planned AT Protocol SDK
> surface area and current support.

# effect-atproto

An AT Protocol SDK built on Effect.

The implementation is driven solely by the official
[AT Protocol specification](https://atproto.com/specs/).

## Feature Completeness

Support levels mirror the [AT Protocol SDKs](https://atproto.com/sdks) feature
ratings: `full`, `partial`, and `none`.

| Feature      | Support   | Description                                                      |
| ------------ | --------- | ---------------------------------------------------------------- |
| Identifiers  | `partial` | DID and handle parsing, normalization, and validation.           |
| Bsky helpers | `none`    | Bluesky-specific lexicons, types, and app helpers.               |
| Lexicon      | `none`    | Generic Lexicon schema support and XRPC client.                  |
| Identity     | `none`    | DID and handle resolution.                                       |
| Streaming    | `none`    | WebSocket event stream subscriptions for firehose and Jetstream. |
| Service auth | `none`    | Service-to-service JWT authentication.                           |
| Crypto       | `none`    | Key generation, signing, and signature verification.             |
| Repo         | `none`    | Repository data structure parsing, reading, and writing.         |
| PLC          | `none`    | PLC directory read and write operations.                         |
| OAuth server | `none`    | OAuth 2.0 authorization server implementation.                   |

---

See [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution, commit, issue, and
pull request rules.
