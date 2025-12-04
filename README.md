🔗 TinyLink – URL Shortener with Analytics

TinyLink is a full-stack URL shortening web application built using Next.js (App Router) and MongoDB. It allows users to shorten long URLs, track click counts in real time, view detailed statistics, and manage links easily through a clean dashboard.

🚀 Features

✅ Shorten long URLs instantly

✅ Custom short code generation

✅ Redirect with automatic click tracking

✅ View real-time analytics & stats

✅ Delete short links

✅ Health check API for uptime monitoring

✅ Fully responsive UI

✅ RESTful API architecture

🛠️ Tech Stack

Frontend: Next.js (App Router)

Backend: Next.js API Routes

Database: MongoDB + Mongoose

Styling: Tailwind CSS

Deployment: Vercel / Render

Tools: GitHub, Postman

📂 Project Folder Structure
app/
 ├── page.js                  → Dashboard UI
 ├── healthz/route.js         → Health Check API
 ├── api/
 │   └── links/
 │       ├── route.js         → Create & Fetch Links
 │       └── [code]/route.js → Get & Delete by Code
 ├── [code]/route.js          → Redirect Handler
 ├── code/[code]/page.js      → Analytics Page

lib/
 ├── mongo.js                 → Database Connection
 └── models/
     └── Link.js              → Mongoose Schema
🔥 API Endpoints
Method	Endpoint	Description
GET	/healthz	Server health check
POST	/api/links	Create short link
GET	/api/links	Get all links
GET	/api/links/:code	Get stats for one link
DELETE	/api/links/:code	Delete a link
GET	/:code	Redirect to original URL
⚙️ Environment Variables

Create a .env.local file in the root folder:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000

