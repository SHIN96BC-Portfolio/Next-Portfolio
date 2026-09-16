---
name: safe-edit
description: >-
  Checks harness denylist and human-gate paths before editing auth, cookie,
  crypto, env, or deploy workflow files. Use before changing security-sensitive
  code, when the user mentions denylist, next-auth, secrets, or deploy YAML.
---

# Safe edit (denylist / human gate)

## Instructions

1. Read `docs/harness/DENYLIST.md` before editing.
2. If the target path matches denylist:
   - Stop and tell the user this is a **human gate**.
   - Do not “just fix” auth/cookie/crypto/env/deploy secrets unless the user explicitly approves that path in this turn.
3. Never add new `NEXT_PUBLIC_*SECRET*` (or PASSWORD / PRIVATE_KEY / API_KEY) usage. Existing debt is allowlisted only in `scripts/guard-harness.mjs`.
4. After approved edits, run `pnpm guard:harness` and then `pnpm verify:portfolio`.
5. Do not commit `.env` / `.env.local` or real secrets.

## Related

- `docs/harness/README.md`
- `#31` SECURITY code remediations (separate from harness guards)
