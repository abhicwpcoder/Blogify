# Email Configuration Guide

Your contact form will now send emails to **abhijeetdepale9@gmail.com** when users submit messages.

## ✉️ Setup Instructions (5 Minutes)

### Step 1: Create Resend Account
1. Go to [Resend.com](https://resend.com)
2. Sign up (free account available)
3. Verify your email

### Step 2: Get API Key
1. Go to [Resend Dashboard](https://dashboard.resend.com)
2. Click **API Keys** in the left sidebar
3. Click **Create API Key**
4. Copy the API key

### Step 3: Add to Your Project
1. Open `backend/.env`
2. Find the line: `RESEND_API_KEY=your_resend_api_key_here`
3. Replace `your_resend_api_key_here` with your copied API key
4. Save the file

**Example:**
```
RESEND_API_KEY=re_abc123xyz456...
```

### Step 4: Restart Backend
```bash
cd backend
npm start
```

Done! ✅

---

## 📧 How It Works

When a user submits the contact form:

1. **Saves to Database** ✓
   - Message is stored in Supabase `contacts` table
   - Can be viewed in Supabase Dashboard

2. **Sends Email** ✓
   - Recipient: **abhijeetdepale9@gmail.com**
   - Includes: Name, Email, Message
   - Formatted HTML email with styling

3. **Response to User** ✓
   - Shows success message even if email fails
   - Data is always saved (email is optional)

---

## 🧪 Test Email Sending

After setting up Resend:

1. Open your app at http://localhost:5173
2. Go to **Contact** page
3. Fill in the form:
   - Name: Your Name
   - Email: your@email.com
   - Message: Test message
4. Click **Send**
5. Check your email inbox (abhijeetdepale9@gmail.com) for the message

You should see an email like:

```
From: contact@blogify.com
To: abhijeetdepale9@gmail.com
Subject: New Contact Form Submission from [Your Name]

Message content in formatted HTML...
```

---

## ❌ Troubleshooting

### "Email send error" in console
- ✓ Check that RESEND_API_KEY is correct
- ✓ Verify your Resend account is active
- ✓ Check the API key hasn't been revoked

### Email not received
- ✓ Check spam/junk folder
- ✓ Verify email was sent (check console for ✅ confirmation)
- ✓ Try sending another test email

### RESEND_API_KEY error
- ✓ Make sure `.env` file exists (not `.env.example`)
- ✓ Restart the server after adding the key
- ✓ No spaces around the equals sign

### Emails work but going to spam
- Resend uses verified domains. To fix:
  1. Go to Resend Dashboard → Domains
  2. Add your domain
  3. Verify DNS records
  4. Or use a Resend subdomain (contact@[your-resend-subdomain].resend.dev)

---

## 📝 Email Template

The email sent to abhijeetdepale9@gmail.com includes:

- **Sender Name**: From the form
- **Sender Email**: From the form (clickable mailto link)
- **Message**: Full message text
- **Timestamp**: When submitted
- **Professional HTML formatting**: Clean, styled email

---

## 🔄 What Gets Saved

All contact submissions are stored in Supabase:

| Field | Value |
|-------|-------|
| id | Auto-generated UUID |
| name | Submitted name |
| email | Submitted email |
| message | Submitted message |
| created_at | Timestamp |

View submissions in Supabase Dashboard → Table Editor → contacts table

---

## 💡 Notes

- ✓ Emails work whether user is authenticated or not
- ✓ Spam protection built-in (Resend handles it)
- ✓ Email sending is asynchronous (doesn't block form submission)
- ✓ If email fails, submission is still saved to database
- ✓ Messages always go to abhijeetdepale9@gmail.com (hardcoded)

Need to change the email address? Edit `server.js` line 242:
```javascript
to: 'abhijeetdepale9@gmail.com',  // Change this
```
