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
