# PM SaaS Frontend (Vite + React + Tailwind)

Quick scaffold that connects to the FastAPI backend. rename the `.env.example` file to `.env`.

first do 
- npm i
- npm i @vitejs/plugin-react
- npm install -D @tailwindcss/postcss

postcss.config.js content should be:
    ```
     module.exports = {
       plugins: {
         '@tailwindcss/postcss': {},
         autoprefixer: {},
       },
     }


Scripts:
- npm run dev
- npm run build


Notes:
- This scaffold keeps auth in localStorage and uses the backend endpoints created in the FastAPI scaffold.
- Tailwind config included; you must run `npx tailwindcss -i ./src/styles/tailwind.css -o ./src/styles/output.css --watch` or configure PostCSS build step in Vite.
