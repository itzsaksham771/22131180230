# Design Document - URL Shortener

## 💡 Tech Stack
- **Frontend Framework**: React.js
- **Styling**: Material UI
- **Routing**: `react-router-dom`
- **Data Persistence**: `localStorage`

## 📌 Architectural Decisions
- Used localStorage for URL mapping, clicks, and expiry.
- Client-side handles URL shortening and redirection.
- Middleware logger logs important events (`logEvent()`).

## 🔁 Routing Strategy
- `/` → URL input form
- `/stats` → Analytics of all shortened URLs
- `/:shortcode` → Redirects to original URL and logs the click

## 🧠 Assumptions
- All users are trusted (no login needed).
- Location and source info in stats is mocked.
- App runs at `http://localhost:3000`.

## 📊 Data Modeling (localStorage)
```ts
{
  longUrl: string;
  createdAt: ISOString;
  expiry: ISOString;
  clicks: [{ timestamp, source, location }]
}
