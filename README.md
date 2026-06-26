# 📚 Fable — Ebook Sharing Platform

> *Discover, share, and read original ebooks from emerging writers worldwide.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen?style=for-the-badge)](https://your-live-url.vercel.app)
[![Client Repo](https://img.shields.io/badge/GitHub-Client-181717?style=for-the-badge&logo=github)](https://github.com/your-username/fable-client)
[![Server Repo](https://img.shields.io/badge/GitHub-Server-181717?style=for-the-badge&logo=github)](https://github.com/your-username/fable-server)

---

## 🌟 What is Fable?

Fable is a full-stack ebook sharing platform built with the MERN stack (MongoDB, Express, React/Next.js, Node.js). It connects readers with independent writers, enabling seamless ebook discovery, purchasing, and management — all in one place.

---

## ✨ Key Features

**For Readers**
- Browse, search, filter, and sort ebooks by genre, price, and availability
- Purchase ebooks securely via **Stripe Checkout**
- Track purchase history and access a personal reading library
- Bookmark ebooks for later

**For Writers**
- Upload and manage ebooks with cover images via **imgBB**
- Publish/unpublish ebooks and monitor sales history
- Access a dedicated writer dashboard with analytics

**For Admins**
- Manage all users, ebooks, and transactions from a central dashboard
- Promote/demote user roles and moderate content
- View revenue analytics with charts and KPI cards

**Platform-wide**
- JWT-based authentication with Google OAuth via **BetterAuth**
- Role-based access control (Reader / Writer / Admin)
- Framer Motion animations and skeleton loaders
- Fully responsive across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 15, React 19, Tailwind CSS 4 |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **Auth** | JWT, BetterAuth (Google OAuth) |
| **Payments** | Stripe Checkout |
| **Image Upload** | imgBB API |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |

---

## 📦 NPM Packages Used

**Client**
`next` · `react` · `tailwindcss` · `axios` · `framer-motion` · `recharts` · `lucide-react` · `stripe` · `better-auth` 

**Server**
`express` · `mongodb` · `jsonwebtoken` · `cors` · `dotenv` · `stripe` · `nodemailer`

---

## 🔐 Admin Credentials

```
Email:    admin@fable.com
Password: Admin@123
```

---

## 🚀 Getting Started Locally

```bash
# Clone the repositories
git clone https://github.com/taniashahida-dev/Fable-Client
git clone https://github.com/taniashahida-dev/Fable-Server
```

---

## 🔒 Environment Variables

All sensitive keys — MongoDB URI, JWT secret, Stripe keys, imgBB API key, and Google OAuth credentials — are stored securely via `.env` files and never exposed in the codebase.

---

## 📁 Project Structure (Client)

```
fable-client/
├── app/
│   ├── (public)/         # Home, Browse, Ebook Details
│   ├── dashboard/
│   │   ├── user/         # Reader dashboard
│   │   ├── writer/       # Writer dashboard
│   │   └── admin/        # Admin dashboard
│   └── auth/             # Login, Register
├── components/           # Shared UI components
└── lib/                  # API helpers, utilities
```

---

*Built with ❤️ as part of an advanced MERN stack assignment.*
