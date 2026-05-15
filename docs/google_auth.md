# Google Auth Setup

This project now uses a browser Google sign-in flow on the frontend and exchanges the credential with FastAPI through local Next.js route handlers.

---

## Current Flow

1. The login screen loads Google Identity Services in the browser.
2. Google returns a browser credential to the frontend.
3. The frontend posts that credential to local `POST /api/auth/google`.
4. The Next.js route handler forwards it to FastAPI `POST /api/auth/google`.
5. FastAPI returns app tokens and user data.
6. The Next.js route handler stores `httpOnly` session cookies for later protected requests.

Important: the backend verifier is still dummy right now. The browser login flow is real, but server-side verification and persistence are still placeholder work.

---

## Frontend Environment

Create `frontend/.env` from `frontend/.env.example`:

```bash
Copy-Item frontend/.env.example frontend/.env
```

Set:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-web-oauth-client-id.apps.googleusercontent.com
APNAPA_BACKEND_URL=http://127.0.0.1:8000
```

---

## Google Cloud Requirements

The client id must come from a Google Cloud OAuth client of type `Web application`.

Add the local origins you use during development:

- `http://localhost:3000`
- `http://127.0.0.1:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3001`

If the login page shows `invalid_client` or `no registered origin`, the OAuth client is usually one of these:

- the wrong client type
- missing local origin entries
- a different client id than the one loaded into `frontend/.env`

---

## Run

Start the backend:

```bash
python -m uvicorn backend.main:app --reload
```

Start the frontend:

```bash
npm.cmd run dev --prefix frontend
```

Open:

```text
http://localhost:3000/login
```

---

## Troubleshooting

### `Error 401: invalid_client`

Use a `Web application` OAuth client and confirm the exact client id is in `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.

### `Access blocked: no registered origin`

Add the exact local origin you are using to the OAuth client in Google Cloud Console.

### Login succeeds in the popup but the app still fails later

Check that:

- the backend is running at `APNAPA_BACKEND_URL`
- `frontend/src/app/api/auth/google/route.ts` can reach FastAPI
- FastAPI is returning the current auth contract shape
