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

The grouped Dependabot update is included, together with narrow same-major floors for graphql-config's minimatch 4.2.6 and relay-compiler's Immutable 3.8.4. These two parents pin older minor releases, so the explicit resolutions are intentional. Clean frozen installation, normal postinstall, shared/server/client builds, both GraphQL code generators and the real GraphQL scratch-database smoke test pass on Node 26.13.0. The client production asset names/content remain unchanged. Regenerating the previously checked-in client output removes duplicate type declarations. That pre-existing difference was not committed in this follow-up; it is repaired in the code-generation update below.

Yarn audit is not a complete security inventory for this legacy graph: it omits genuine installed findings in GraphQL tooling (including Undici, jsonwebtoken and got) that GitHub Dependabot reports. The prior seven-ID Yarn result must not be read as the total remaining risk. Comparing all 45 current GitHub alerts against exact lock versions and affected ranges removes 16 findings, leaving 29 known findings pending GitHub's rescan. Yarn's narrower inventory falls from seven IDs/22 paths to four IDs/16 paths, without new IDs. Remaining GitHub findings include legacy Apollo Server 3, Undici and inherited GraphQL tools, busboy, tmp, UUID, Parcel's development server, jsonwebtoken and got. This remains a partial update, not an all-clear. No deployment, existing database, external integration or new UI verification was performed.

### GraphQL code-generation update (November 9, 2026)

Both workspaces now use GraphQL Code Generator CLI 7.4.6, the latest CLI line declaring GraphQL 15 support. CLI 8 requires GraphQL 16+, so it is not forced into this application. The existing plugins and their options stay unchanged. CLI 6+ removed the abandoned Prisma loader, which removes much of the inherited vulnerable tooling graph. GraphQL stays on major 15 (locked to 15.11.0), with its declared minimum raised for the current WebSocket loader peer requirement. Node declaration files are pinned at 18.15.13 for compatibility with the existing TypeScript compiler and current WebSocket declarations; the actual tested runtime remains Node 26.13.0, not Node 18.

The narrow graphql-config minimatch floor is now 11.0.1 (locked to 11.0.5) because its normal major-10 range introduces another advisory. This is an intentional major override limited to that parent. The parent uses the retained minimatch named function, not APIs removed in major 11. `yarn test:codegen-config` checks schema/document/include/exclude, nested and dot-path matching. Local relative schema/document generation is tested; remote schema loaders, init wizard and watch mode are not verified.

On the same Node/Yarn toolchain, old and new CLIs generated byte-identical client and server output. The generated client file previously contained duplicate type declarations; regenerating it removes them. An unused event argument is also marked unused. These small existing blockers are fixed without suppressing TypeScript checks. Clean frozen install and normal postinstall, full build, both generators, client type-check, configuration matching checks and the real GraphQL scratch-database smoke pass. Actual Chromium against the compiled application and a scratch Apollo backend loads the timeline, creates a tweet and reads it after reload with no page errors. The inspected screenshot shows the expected layout. Live user data, external services, deployment, remote schema loading and every UI action are not covered.

The current npm advisory bulk endpoint, queried with every exact locked package/version, independently reproduces 29 baseline advisory IDs and reports six after this change, with no new IDs. The remaining IDs affect Apollo Server, Apollo Server Core, GraphQL Tools utils, Parcel's development server, got and inherited UUID. This reconciles the previously incomplete Yarn audit inventory, not a claim that every use is exploitable or that the repository is clean. GitHub's live alert count must still be checked after its own rescan. No deployment was performed.

### Development watcher update (November 9, 2026)

Nodemon is pinned to 3.1.11, removing its old update-notifier/got dependency chain. The newest Nodemon releases currently pull a minimatch line with an advisory, so this tested release is intentional. The exact existing nodemon config is unchanged. `yarn test:nodemon` runs a disposable child fixture with that config, checks startup, verifies src changes are ignored and checks restarts for dist and shared/dist changes. Both the original and upgraded watcher pass these checks. Fresh frozen install with normal build, code generation, client type-check and GraphQL scratch-database smoke pass on Node 26. The full npm bulk advisory inventory improves six to five IDs, with no new IDs; the remaining packages are Apollo Server/Core, inherited UUID, GraphQL Tools utils and Parcel's development server. This update does not start the real app against the repository database or deploy it.

### Apollo Server update (November 9, 2026)

The running API now uses Apollo Server 5.5.1 with the supported Express 4 integration. GraphQL is locked to 16.15.0, TypeScript to 5.9.3 and Node declarations to 26.6.6; the tested runtime is Node 26.13.0. The older compiler/declarations cannot type-check current Apollo/GraphQL Tools declarations, so these updates are part of the tested migration. Runtime GraphQL file loading/schema/merge packages move to current GraphQL-16-compatible versions. Existing generator plugins, generated types, business resolvers, schema, database format and static files stay unchanged.

The API remains at `/graphql`, with explicit CORS and JSON middleware replacing the old integration's implicit setup. CORS remains permissive as before. Apollo 5's default CSRF protection rejects unpreflighted simple requests; JSON POSTs from the existing client work, and GET clients must use a supported preflight header. The app now listens on the same HTTP server passed to Apollo's drain plugin, rather than creating a second untracked listener. `/static` and the configured port are retained. This teaching application still selects a seeded current user rather than implementing real authentication; the migration does not make it suitable for production use.

Original and candidate pass same-toolchain code generation, client type-check, real GraphQL scratch-database query/tweet-create/read/favorite-create/delete checks, and Chromium timeline/create/reload against the actual compiled backend. A fresh frozen install with no compiled output or cache, normal postinstall, full build and all security/config/watcher tests pass. `yarn test:apollo-http` checks CORS preflight, protected GET, rejected simple requests, malformed JSON, invalid query/variables, static content, unknown route and shutdown draining. The malformed JSON check intentionally produces Express's standard error log while asserting HTTP 400. The candidate screenshot was inspected. Remote schema loading, external services, every UI action and a production deployment remain unverified. Tests use disposable databases only.

The full npm advisory bulk comparison improves five to two IDs with no new IDs, removing Apollo Server/Core and inherited UUID findings. Old GraphQL Tools utilities inherited by retained plugins and Parcel's development server remain reported. This is still a partial security cleanup. GitHub's live alert count needs its own rescan.

### Parcel development-server fix (November 9, 2026)

Parcel, its core and Sass transformer now have a 2.16.4 minimum. The advisory's fix is an opt-in `--no-cors` setting, not a safe default: the client development command now includes it. Updating the version alone would leave development responses readable from unrelated websites. `yarn test:parcel-dev` starts the actual Parcel development server, checks HTML startup and confirms foreign and local Origin requests do not receive an Access-Control-Allow-Origin header. Same-origin app loading still works; the separate API's CORS behavior is unchanged. Do not remove this flag when starting the dev server manually.

Fresh frozen install/normal postinstall builds, both generators, client type-check, GraphQL scratch-DB tests and HTTP/config/watcher checks pass. Actual Chromium against both the production bundle and live Parcel dev server with a scratch Apollo API loads the timeline, creates a tweet and reads it after reload without page errors. The screenshot was inspected. Production bundle filenames/sizes change, with no application source change. No external services, real data or deployment is touched. The full npm bulk advisory inventory falls from two to one ID, no new IDs: old GraphQL Tools utilities inherited by retained generator plugins remain. GitHub's rescan is separate.
