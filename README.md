# 🏨 Booking App
A modern hotel booking web application built with **Next.js**, **PostgreSQL**, and **Midtrans Payment Gateway**.  
This app allows users to browse hotels, make reservations, and complete payments online with Google Authentication support.  

🌐 **Live Demo:** [Booking App](https://booking-hotel-flame.vercel.app/)
---

## ✨ Features
- 🔑 **Authentication** with Google (NextAuth)
- 🏨 **Hotel booking system** with real-time availability
- 💳 **Online payment** integration using Midtrans
- 🗄️ **PostgreSQL** with Prisma ORM
- ☁️ **Blob storage** support with Vercel
- 📱 **Responsive UI** (mobile-friendly)

---
## 🚀 Tech Stack
- [Next.js](https://nextjs.org/) – React Framework
- [PostgreSQL](https://www.postgresql.org/) – Relational Database
- [Prisma](https://www.prisma.io/) – ORM
- [NextAuth.js](https://next-auth.js.org/) – Authentication
- [Midtrans](https://midtrans.com/) – Payment Gateway
- [Vercel](https://vercel.com/) – Deployment

## 📂 Project Structure
```bash
booking-app/
│── prisma/          # Database schema & migrations
│── src/             # Source code
│   ├── app/         # Next.js app directory
│   ├── components/  # UI components
│   ├── lib/         # Configs, utils, etc.
│   └── pages/       # API routes & auth
│── .env.example     # Environment variables (sample)
│── package.json     # Dependencies
└── README.md
```
---
Copy `.env.example` → `.env` and fill with your own values:

```env
AUTH_SECRET="your-auth-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

POSTGRES_URL="your-postgres-url"
POSTGRES_URL_NON_POOLING="your-postgres-nonpool-url"
POSTGRES_USER="your-db-user"
POSTGRES_HOST="your-db-host"
POSTGRES_PASSWORD="your-db-password"
POSTGRES_DATABASE="your-db-name"
POSTGRES_URL_NO_SSL="your-db-url-no-ssl"
POSTGRES_PRISMA_URL="your-prisma-url"

NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
MIDTRANS_SERVER_KEY="your-midtrans-server-key"
```
## 🛠️ Installation & Running Locally
### 1. Clone repository
```bash
git clone https://github.com/oniauliya99/booking-app.git
cd booking-app
```

### 2. Install Dependency
```bash
pnpm install
atau
npm install
```
### 3. Database Setup
```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Running App
```bash
pnpm dev
atau
npm run dev
```

