# Mail Wolf

Mail Wolf is a safety-first SaaS concept for classifying and cleaning up years
of Gmail clutter. It explains each classification with representative examples,
keeps ambiguous messages in review, and stages destructive actions as reversible
batches.

The current build includes a polished public landing page and an interactive demo
workspace. Gmail is not connected yet; all mailbox data in the workspace is
fictional and no external actions are performed.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The product workspace is at
[http://localhost:3000/dashboard](http://localhost:3000/dashboard).

## Current scope

- Responsive landing page with light and dark themes
- Interactive classification review workspace
- Per-group Trash, Review, and Keep decisions
- Representative examples and explicit safety exclusions
- Simulated batch approval and undo
- Deterministic rule design documented in [`docs/rules-engine.md`](docs/rules-engine.md)

## Planned milestones

1. Add ZITADEL authentication and protected application routes.
2. Add Gmail OAuth with read-only scanning first.
3. Persist classification results and user-specific rules.
4. Add an AI classifier only for messages left in the gray area.
5. Request Gmail modification access when the user approves cleanup.
