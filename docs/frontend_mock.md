# Frontend Mock

The frontend mock is the first usable apnaPA screen.

It uses local dummy data and does not call any API yet. This keeps the dashboard, Agent interaction, onboarding state, Telegram-linking state, and manual entry flows testable before backend integration.

---

## Run

```bash
npm.cmd start --prefix frontend
```

Open:

```text
http://localhost:4173
```

---

## Test

```bash
npm.cmd test --prefix frontend
```

---

## Included Flows

- Mock login and logout.
- Dashboard overview.
- Dashboard daily state engine, weekly trend, AI insight, recent activity, and pending reminders.
- Health range toolbar, nutrition progress, streaks, active goal, AI suggestions, and daily summaries.
- Finance range toolbar, spending metrics, active goal, AI suggestions, category breakdown, and daily summaries.
- Reminder queue and automation rules.
- Memory preview.
- Settings.
- Manual meal entry.
- Manual expense entry.
- Dashboard Agent mock replies.
- Dummy onboarding completion.
- Dummy Telegram linking.

---

## Integration Boundary

The mock intentionally does not use `fetch` or `/api` routes. FastAPI integration should begin only after backend and agent dummy tests are stable.

The Dashboard, Health, Finance, and Reminders views should preserve the sections from `dashboard.html` during the upcoming Next.js conversion.
