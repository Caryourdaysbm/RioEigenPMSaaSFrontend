# PM SaaS Frontend (Vite + React + Tailwind)

Quick scaffold that connects to the FastAPI backend. Set VITE_API_URL in a .env file if needed.

Scripts:
- npm run dev
- npm run build
- npm run preview

Notes:
- This scaffold keeps auth in localStorage and uses the backend endpoints created in the FastAPI scaffold.
- Tailwind config included; you must run `npx tailwindcss -i ./src/styles/tailwind.css -o ./src/styles/output.css --watch` or configure PostCSS build step in Vite.
