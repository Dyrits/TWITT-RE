# Tweet-Re

---

# Full Stack TypeScript [![CI](https://github.com/mike-north/full-stack-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/mike-north/full-stack-ts/actions/workflows/ci.yml)

Mike North's Full Stack TypeScript course

- Video: [Frontend Masters](https://frontendmasters.com/workshops/fullstack-typescript/)
- Course website: [TypeScript Training: Full Stack TypeScript](https://www.typescript-training.com/course/full-stack-typescript)

## Setup

First, if you want to ensure you're using the correct Node.js and package manager versions, [install Volta](http://volta.sh)

```sh
# install Volta
curl https://get.volta.sh | bash

# install Node
volta install node
```

Then, check out a local copy of this repository

```sh
git clone git@github.com:mike-north/full-stack-ts
cd full-stack-typescript
```

Next, install the project dependencies

```sh
yarn
```

Build the project for the first time

```sh
yarn build
```

And finally, start the project

```sh
yarn dev
```

After the client and server build processes complete, you should see an "imitation Twitter" running on [http://localhost:1234](http://localhost:1234).

## Legal

&copy; 2022 Mike North, all rights reserved.

## Targeted security verification

The November 3, 2026 update pins patched resolution floors for proxy-addr 2.0.8 and shell-quote 1.12.0. With Node.js 26 LTS, install using `yarn install --frozen-lockfile` and run `yarn test:security`. That test uses the compiled server after the normal type-checked build, runs the real Apollo/Express GraphQL endpoint against a temporary JSON database, checks query/create/read behavior, and checks proxy subnet trust and rejection of an invalid shell operator containing a newline. It does not use the repository's database or contact external services.

Yarn audit paths fell from 183 findings (3 critical, 115 high) to 179 (0 critical, 114 high), with distinct advisory IDs falling from 55 to 52 and no new IDs. Many known findings remain. The shared, server, and client production builds pass. The separate course resolver examples now declare their own context type and return the required user in UserStats, fixing the pre-existing full-build failure without changing the running resolver factory. The normal postinstall build also passes. Ordinary workspace tests only print that no tests exist; use the dedicated security smoke test for actual HTTP coverage. No deployment was performed.

### UUID dependency update (November 2026)

Server IDs now use Node's built-in `crypto.randomUUID()` instead of a separate UUID package. Existing entity prefixes and UUID v4 formatting stay unchanged. A clean frozen Yarn install builds shared, server and client; the compiled GraphQL smoke test checks creation, unique UUID v4 IDs and readback against a scratch JSON database. The direct UUID package and its old type package are removed. Other dependency advisories remain.


### Targeted transitive refresh (November 9, 2026)

The Yarn lock now refreshes selected vulnerable transitive packages within their existing declared ranges and major versions. Same-major Lodash 4 and qs 6 resolution floors close findings left by older narrow transitive ranges. The existing TypeScript compiler and declaration versions are retained: an unrestricted dependency refresh introduced type errors and was rejected. Root and server runtime declarations now match the Node 26 LTS version already recorded by Volta.

On Node 26.13.0, a fresh frozen Yarn install with normal postinstall built shared, server and client successfully. `yarn test:security` passed against the newly compiled server and disposable JSON database, including the real GraphQL query/create/read checks, UUID formatting/uniqueness, proxy trust and shell-operator checks, plus Lodash and qs smoke checks. No source business logic, real database, deployment or external service was changed.

Yarn audit fell from 51 to seven distinct advisory IDs, with no new IDs. Path findings fell from 173 (114 high, 47 moderate, 12 low) to 22 (16 high, six moderate). Residual findings remain in Apollo Server 3, older GraphQL tools, Immutable 3 and inherited UUID. This is a partial security update, not a clean audit. The ordinary workspace tests still only print that no tests exist; the dedicated smoke test provides the actual HTTP coverage. Client UI behavior and external integrations are not newly certified by this lock refresh.

### Follow-up advisory reconciliation (November 9, 2026)

The grouped Dependabot update is included, together with narrow same-major floors for graphql-config's minimatch 4.2.6 and relay-compiler's Immutable 3.8.4. These two parents pin older minor releases, so the explicit resolutions are intentional. Clean frozen installation, normal postinstall, shared/server/client builds, both GraphQL code generators and the real GraphQL scratch-database smoke test pass on Node 26.13.0. The client production asset names/content remain unchanged. Generated client output has an existing formatting difference when regenerated and is not committed by this dependency-only change.

Yarn audit is not a complete security inventory for this legacy graph: it omits genuine installed findings in GraphQL tooling (including Undici, jsonwebtoken and got) that GitHub Dependabot reports. The prior seven-ID Yarn result must not be read as the total remaining risk. Comparing all 45 current GitHub alerts against exact lock versions and affected ranges removes 16 findings, leaving 29 known findings pending GitHub's rescan. Yarn's narrower inventory falls from seven IDs/22 paths to four IDs/16 paths, without new IDs. Remaining GitHub findings include legacy Apollo Server 3, Undici and inherited GraphQL tools, busboy, tmp, UUID, Parcel's development server, jsonwebtoken and got. This remains a partial update, not an all-clear. No deployment, existing database, external integration or new UI verification was performed.
