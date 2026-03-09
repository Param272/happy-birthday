# Happy Birthday Kittu App

A full-stack interactive birthday web app with a React frontend and Node.js/Express backend.

## Project structure

```
birthday-kittu-app
├── frontend
│   ├── components
│   ├── pages
│   ├── animations
│   └── styles
└── backend
    ├── server.js
    ├── routes
    └── data
```

## Quick start

### 1) Backend

```bash
cd birthday-kittu-app/backend
npm install
npm run dev
```

Runs on `http://localhost:4000`.

### 2) Frontend

Open a second terminal:

```bash
cd birthday-kittu-app/frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

## API endpoints

- `GET /api/compliment` - Returns a random compliment for Kittu.
- `GET /api/message` - Returns a random birthday message.
- `POST /api/score` - Adds points to current love points and returns updated score.
- `GET /api/score` - Reads current love points.

## Build commands

```bash
cd birthday-kittu-app/frontend && npm run build
cd birthday-kittu-app/backend && npm start
```
