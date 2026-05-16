# Setup Guide — Blogify

## Quick Start (5 minutes)

### Step 1: Start the Backend
```bash
cd backend
npm start
```
You should see: `Backend server running on http://localhost:5000`

### Step 2: Start the Frontend
In a new terminal:
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Step 3: Explore
- Homepage shows 2 default blog posts
- Click any blog to read and like/dislike
- Create a new blog using the "Write a New Post" button
- Check the About and Contact pages

---

## Email Notifications Setup (Optional but Recommended)

When users submit the contact form, they should receive emails at `abhijeetdepale9@gmail.com`.

### To Enable Email Notifications:

1. **Create a Resend Account**
   - Go to https://resend.com and sign up
   - Verify your email

2. **Get Your API Key**
   - In Resend dashboard, go to API Keys section
   - Copy your API key (starts with `re_`)

3. **Add Secret to Supabase**
   - Go to your Supabase project dashboard
   - Navigate to: Settings → Edge Functions → Secrets
   - Click "New Secret"
   - Name: `RESEND_API_KEY`
   - Value: Paste your Resend API key
   - Click "Add secret"

4. **Test It**
   - Fill out the contact form on your app
   - You should receive an email at abhijeetdepale9@gmail.com within a few seconds

---

## Project File Structure Quick Reference

```
project/
├── src/                          # React frontend code
├── backend/                      # Express backend API
├── supabase/
│   ├── functions/
│   │   └── send-contact-email/   # Edge Function (handles emails)
│   └── migrations/               # Database schema
└── dist/                         # Build output (npm run build)
```

---

## Common Tasks

### Add a New Blog Post
1. Click "Write a New Post" button
2. Fill in Title, Subject, and Content
3. Click "Publish Post"
4. You'll be redirected to the blog detail page

### Edit an Existing Blog
1. Go to any blog post detail page
2. Click the "Edit" button
3. Update title, subject, or content
4. Click "Save Changes"

### Delete a Blog
1. Go to a blog post detail page
2. Click the "Delete" button
3. Confirm the deletion

### Like/Dislike a Blog
1. Open any blog post
2. Click the "Like" or "Dislike" button
3. Count updates instantly

### View Database Data (Supabase)
1. Go to https://app.supabase.com
2. Open your project
3. Go to: SQL Editor
4. Run: `SELECT * FROM blogs;` or `SELECT * FROM contacts;`

---

## Backend API Reference

All requests use JSON. Base URL: `http://localhost:5000/api`

### Create Blog
```
POST /api/blogs
Content-Type: application/json

{
  "title": "My First Blog",
  "subject": "Personal",
  "content": "Blog content here..."
}

Response: { id, title, subject, content, likes, dislikes, created_at }
```

### Get All Blogs
```
GET /api/blogs

Response: [{ id, title, subject, content, likes, dislikes, created_at }, ...]
```

### Get Single Blog
```
GET /api/blogs/{id}

Response: { id, title, subject, content, likes, dislikes, created_at }
```

### Update Blog
```
PUT /api/blogs/{id}
Content-Type: application/json

{
  "title": "Updated Title",
  "subject": "Updated Subject",
  "content": "Updated content..."
}

Response: { id, title, subject, content, likes, dislikes, created_at }
```

### Delete Blog
```
DELETE /api/blogs/{id}

Response: { message: "Blog deleted successfully" }
```

### Like a Blog
```
POST /api/blogs/{id}/like

Response: { id, title, ..., likes: 1, ... }
```

### Dislike a Blog
```
POST /api/blogs/{id}/dislike

Response: { id, title, ..., dislikes: 1, ... }
```

### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to inquire..."
}

Response: { message: "Message received...", submitted: true }
```

---

## Troubleshooting

### "Failed to load blogs. Make sure the backend server is running."
- ✅ Make sure backend is running: `cd backend && npm start`
- ✅ Check port 5000 is available
- ✅ Check firewall isn't blocking localhost:5000

### Backend crashes with "Cannot find module"
- Run `cd backend && npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Contact form says "Email service not configured"
- You need to add the RESEND_API_KEY secret to Supabase (see Email Notifications section above)
- Form submissions are still saved to database even if email fails

### Blog posts not appearing
- Check your internet connection to Supabase
- Verify Supabase URL and key in `.env` files
- Go to Supabase dashboard and check if `blogs` table exists with data

### Styling looks broken
- Make sure Tailwind CSS is loaded: Check browser DevTools → Network tab
- Try `npm run build` to rebuild
- Clear browser cache (Ctrl+Shift+Delete)

---

## Environment Variables

Your `.env` files are pre-configured. Here's what they contain:

**Frontend** (`.env`):
- `VITE_SUPABASE_URL` — Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — Public key for API calls

**Backend** (`backend/.env`):
- `SUPABASE_URL` — Same as frontend
- `SUPABASE_ANON_KEY` — Same as frontend
- `PORT` — Server port (default 5000)

---

## Next Steps

1. **Customize Content**
   - Replace default blogs with your own content
   - Update About page with your story
   - Modify contact email in Edge Function

2. **Add Authentication** (Future)
   - Users can own their blog posts
   - Secure edit/delete permissions

3. **Deploy** (Future)
   - Frontend: Vercel, Netlify, or similar
   - Backend: Can stay as is or deploy to Railway, Render
   - Database: Already on Supabase (no changes needed)

---

## Contact & Support

Built by Abhijeet Depale

- Email: abhijeetdepale9@gmail.com
- Phone: 7767951802
- Address: Dhamale Building, Finolex Chowk, Pimpri-Chinchwad, Pune 411018
