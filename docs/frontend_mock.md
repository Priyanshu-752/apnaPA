# Frontend Mock

The frontend mock is now a route-based Next.js frontend scaffold.

It still uses local dummy data and does not call any API yet. This keeps the dashboard, Agent interaction, onboarding state, Telegram-linking state, profile editing, and manual entry flows testable before backend integration.

---

## Run

```bash
npm.cmd run dev --prefix frontend
```

Open:

```text
http://localhost:3000
```

---

## Test

```bash
npm.cmd test --prefix frontend
```

---

## Included Flows

- Mock login and logout.
- Protected auth and dashboard route groups.
- Dashboard overview.
- Dashboard daily state engine, weekly trend, AI insight, recent activity, and pending reminders.
- Health range toolbar, nutrition progress, streaks, active goal, AI suggestions, and daily summaries.
- Finance range toolbar, spending metrics, active goal, AI suggestions, category breakdown, and daily summaries.
- Reminder queue and automation rules.
- Memory preview.
- Settings with editable profile details.
- Manual meal entry.
- Manual expense entry.
- Dashboard Agent mock replies.
- Dummy onboarding completion.
- Dummy Telegram linking.

---

## Integration Boundary

The mock intentionally does not use `fetch` or `/api` routes. A backend scaffold now exists, but frontend integration should still begin only after backend persistence, real auth verification, and route contracts are stable enough to avoid churn.

The current App Router scaffold should preserve the Dashboard, Health, Finance, and Reminders content from `dashboard.html` while backend integration is added.
