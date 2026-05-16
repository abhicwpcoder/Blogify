# Blogify — A Modern Blog Platform

A production-ready blog platform built with React, Node.js, Express, and Supabase. Share stories, read about travels and life lessons, and engage with a community of writers.

## Features

- **Responsive Design** — Beautiful dark theme with emerald/teal accents, fully responsive from mobile to desktop
- **Blog Management** — Create, read, update, and delete blog posts with rich content
- **Engagement** — Like and dislike posts to show appreciation or feedback
- **Contact Form** — Users can submit contact requests with automatic email notifications
- **Real-time Data** — Backend syncs with Supabase database
- **Default Content** — Pre-loaded with 2 sample blog posts
- **Email Notifications** — Contact form submissions trigger emails to admin

## Project Structure

```
project/
├── src/                          # React frontend (TypeScript)
│   ├── pages/
│   │   ├── Home.tsx             # Main blog feed
│   │   ├── BlogDetail.tsx        # Individual blog view with like/dislike
│   │   ├── CreateBlog.tsx        # Write new blog form
│   │   ├── UpdateBlog.tsx        # Edit existing blog form
│   │   ├── About.tsx             # About page
│   │   └── Contact.tsx           # Contact form
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation with mobile menu
│   │   ├── Footer.tsx            # Footer with links and contact info
│   │   └── BlogCard.tsx          # Reusable blog card component
│   ├── lib/
│   │   └── api.ts                # API client for backend communication
│   ├── App.tsx                   # Main app with React Router
│   └── index.css                 # Global styles & Tailwind
├── backend/                      # Node.js/Express API
│   ├── server.js                 # Express server with Supabase integration
│   ├── .env                      # Environment variables
│   └── package.json
├── supabase/
│   ├── functions/
│   │   └── send-contact-email/   # Edge function for email notifications
│   └── migrations/               # Database migrations
└── [Frontend build config files]
```

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, React Router, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, Cors
- **Database:** Supabase (PostgreSQL) with Row Level Security
- **Email:** Resend API (via Edge Functions)
- **Deployment:** Supabase Edge Functions for serverless

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account (database already provisioned)

### Environment Setup

The `.env` files are already configured with Supabase credentials:

**Frontend** (`/.env`):
```
VITE_SUPABASE_URL=https://twohxtajnfpzsuyjkdrn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Backend** (`/backend/.env`):
```
SUPABASE_URL=https://twohxtajnfpzsuyjkdrn.supabase.co
SUPABASE_ANON_KEY=...
PORT=5000
```

### Installation

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

**Terminal 1 — Backend Server:**
```bash
cd backend
npm start
# or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

**Terminal 2 — Frontend Development Server:**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Database Schema

### `blogs` Table
- `id` — UUID primary key
- `title` — Blog post title
- `subject` — Category/subject
- `content` — Full blog content
- `likes` — Like count
- `dislikes` — Dislike count
- `created_at` — Timestamp

### `contacts` Table
- `id` — UUID primary key
- `name` — Visitor name
- `email` — Visitor email
- `message` — Contact message
- `created_at` — Timestamp

## Default Blogs

Two sample blogs are pre-loaded in the database:
1. **Travel Blog** — "Love Travelling" with travel tips and adventures
2. **Moving On** — Personal story about life changes and adaptation

## API Endpoints

### Blogs
- `GET /api/blogs` — Get all blogs
- `GET /api/blogs/:id` — Get single blog
- `POST /api/blogs` — Create new blog
- `PUT /api/blogs/:id` — Update blog
- `DELETE /api/blogs/:id` — Delete blog
- `POST /api/blogs/:id/like` — Like a blog
- `POST /api/blogs/:id/dislike` — Dislike a blog

### Contact
- `POST /api/contact` — Submit contact form

## Email Configuration

Contact form submissions trigger emails via Resend API. To enable email notifications:

1. Create a Resend account (https://resend.com)
2. Get your API key from Resend dashboard
3. The `send-contact-email` Edge Function will be deployed with your RESEND_API_KEY

Emails are sent to: `abhijeetdepale9@gmail.com`

## Features in Detail

### Home Page
- Hero section with call-to-action
- Live stats (total posts, total likes, active readers)
- Blog grid with card previews
- Loading skeletons and error handling
- "No blogs yet" empty state with CTA

### Blog Detail
- Full post content
- Like/dislike buttons with counts
- Edit and delete buttons
- Back navigation
- Responsive layout

### Create/Edit Pages
- Rich form with title, subject, and content fields
- Character counter
- Loading states and error messages
- Redirect to blog detail on success

### About Page
- Brand story and mission
- Core values grid (4 columns)
- Call-to-action buttons

### Contact Page
- Contact information display
- Working contact form
- Success state with option to send another
- Email validation

## Development Notes

- The app uses Tailwind CSS for styling with a custom dark theme
- All components use Lucide React icons
- API calls are centralized in `src/lib/api.ts`
- Error handling includes user-friendly messages
- Mobile-first responsive design
- Smooth scrolling and transitions

## Troubleshooting

**Backend connection error on home page:**
- Ensure backend server is running on port 5000
- Check CORS is enabled (should be configured for localhost:5173)
- Verify Supabase credentials in `.env` files

**Contact form not sending emails:**
- Edge Function must be deployed (check Supabase dashboard)
- Resend API key must be configured as a secret
- Check browser console and server logs for errors

**Database migration issues:**
- Migrations are already applied during project setup
- Check Supabase dashboard → SQL Editor for table status

## Future Enhancements

- User authentication for blog ownership
- Comments system on blogs
- Search and filtering
- Blog categories/tags
- User profiles
- Admin dashboard
- Advanced email templates

## License

Built by Abhijeet Depale

Contact: abhijeetdepale9@gmail.com | Phone: 7767951802
