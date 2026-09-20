# loadtest

Scripts to deliberately break this site's weak spots — mainly the contact
form, which today has **no CAPTCHA, no honeypot, and no rate limit**. Use
these to confirm that's true, and re-run them later after fixes land to
confirm it's not anymore.

Written for Deno, kept out of the Next.js app (excluded from `tsconfig.json`
and `eslint.config.mjs`) since it uses Deno globals, not Node/browser ones.

Two ways to run this:

- **`loadtest.ipynb`** — cell-by-cell, see output inline, tweak a param and
  re-run just that cell. Recommended for exploring/iterating.
- **`scenarios/*.ts`** — plain CLI scripts, same underlying logic
  (`lib/scenarios.ts`), useful for a one-shot run or scripting/CI later.

## Notebook setup (one-time)

```bash
deno jupyter --install --force --display "Deno (loadtest)"
```

Then open `loadtest/loadtest.ipynb` in VS Code (Jupyter extension required —
`ms-toolsai.jupyter`) and select the **"Deno (loadtest)"** kernel in the
top-right kernel picker. Run cells top to bottom, or re-run a single cell
after changing its params.

If you'd rather use JupyterLab/Notebook instead of VS Code, `pip install
jupyterlab` and run `jupyter lab` from this directory — the kernelspec is
already registered globally.

## Safety

- Defaults are small (`--count=10 --concurrency=5`) and every script
  requires `--yes` to actually run — without it, it prints what it _would_
  do and exits.
- `assertSafeTarget` in `config.ts` refuses to run against anything that
  isn't `localhost` or a `*preview*.workers.dev` host, so you can't
  fat-finger this at a production URL. Override with `LOADTEST_ALLOW_ANY=1`
  if you really mean it.
- **Check your Firebase billing plan before running scenario 1 or 3.**
  Spark (free) plan: writes past the daily quota just start failing, zero
  cost. Blaze (pay-as-you-go): writes past the free tier are billed. Confirm
  in Firebase Console → Usage & billing.
- Scenario 1 and 3 send **real emails via Resend** and write **real docs to
  Firestore**. Clean up test data from the admin panel / Firestore console
  afterwards.

## Target

Defaults to `https://next-codenalgo-preview.mughalfrazk.workers.dev`.
Override with `LOADTEST_TARGET=http://localhost:3000` to hit local dev
instead (no quota risk at all — recommended for iterating on the scripts
themselves).

## Scenarios

Run via `deno task`, or `deno run` directly:

```bash
cd loadtest

# 1. Flood the contact form like a spam bot would (uses real Firestore + Resend quota)
deno task flood-contact -- --count=10 --concurrency=5 --yes

# 2. Submit an oversized payload (no max-length on `name`/`details` today)
deno task oversized-payload -- --sizeKb=1024 --yes

# 3. Fire a concurrent burst to probe the write -> email -> rollback race
deno task concurrent-race -- --count=20 --yes

# 4. Confirm the server actually rejects what client-side validation blocks
deno task bypass-consent -- --yes

# 5. Raw request flood against static pages (no Firestore/Resend involved, free-tier safe)
deno task static-flood -- --count=200 --concurrency=20 --yes
```

Or target local dev while iterating:

```bash
LOADTEST_TARGET=http://localhost:3000 deno task flood-contact -- --count=5 --yes
```

## Reading results

**HTTP status alone doesn't tell you whether a submission succeeded.**
Next Server Action form posts return `200` with a full HTML page regardless
of whether validation passed or the action itself failed — the real
pass/fail state is embedded in React's hydrated form state, not the status
code. Verified against the live preview: all three deliberately-invalid
cases in scenario 4 came back `200`. The only reliable ground truth is
checking the Firestore `contactSubmissions` collection (or the admin panel)
for whether a doc actually landed after each run.

## What "handled" looks like

- **Scenario 1**: should start getting rejected (429 or similar) well before
  count=100 once rate limiting / Turnstile is in place. Today it succeeds
  100% of the time.
- **Scenario 2**: should be rejected with a validation error once
  `name`/`details` get a `.max()` in `src/models/contactSubmission.ts`.
- **Scenario 3**: should never leave a `contactSubmissions` doc stuck in
  `emailStatus: 'pending'` in Firestore.
- **Scenario 4**: should always be rejected — this one should already pass.
- **Scenario 5**: informational only; watch p95/p99 latency and status
  codes as concurrency increases.
