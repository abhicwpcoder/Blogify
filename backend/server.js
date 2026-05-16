import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Default blogs for seeding
const defaultBlogs = [
  {
    title: 'Getting Started with Web Development',
    subject: 'Web Development',
    content: 'Web development is the process of creating websites and web applications. It involves HTML, CSS, and JavaScript to build interactive and responsive user interfaces. Start your journey by learning the basics of these three fundamental technologies.'
  },
  {
    title: 'Understanding React Hooks',
    subject: 'React',
    content: 'React Hooks revolutionized the way we write React components. They allow you to use state and other React features without writing class components. Learn about useState, useEffect, useContext, and custom hooks to write cleaner, more maintainable code.'
  },
  {
    title: 'Database Design Best Practices',
    subject: 'Database',
    content: 'Good database design is crucial for application performance. Focus on normalization, proper indexing, and efficient queries. Use ER diagrams to plan your schema before implementation. Always consider scalability and security in your design.'
  },
  {
    title: 'The Power of REST APIs',
    subject: 'Backend',
    content: 'REST APIs are the backbone of modern web applications. They follow standard HTTP methods (GET, POST, PUT, DELETE) to perform operations. Design your APIs to be stateless, cacheable, and maintainable. Version your APIs for backward compatibility.'
  },
  {
    title: 'CSS Flexbox and Grid Layout',
    subject: 'Frontend',
    content: 'Master CSS Flexbox and Grid to create responsive layouts. Flexbox is perfect for one-dimensional layouts, while Grid excels at two-dimensional designs. Use these modern layout techniques to build flexible and adaptive user interfaces.'
  },
  {
    title: 'JavaScript Async/Await Guide',
    subject: 'JavaScript',
    content: 'Async/await makes asynchronous JavaScript code easier to read and write. It allows you to handle promises in a more synchronous-like manner. Learn how to properly handle errors, manage concurrent operations, and avoid common pitfalls.'
  }
];

// Initialize database and seed data
async function initializeDatabase() {
  try {
    // Check if blogs table exists and has data
    const { data: blogs, error: checkError } = await supabase
      .from('blogs')
      .select('id', { count: 'exact' })
      .limit(1);

    if (checkError) {
      console.log('\n⚠️  DATABASE NOT INITIALIZED\n');
      console.log('Tables do not exist in your Supabase project yet.\n');
      console.log('📋 SETUP INSTRUCTIONS:');
      console.log('1. Open the file: backend/setup.sql');
      console.log('2. Copy all the SQL code');
      console.log('3. Go to Supabase Dashboard → SQL Editor → New Query');
      console.log('4. Paste the SQL and click RUN');
      console.log('5. Come back here and restart the server\n');
      console.log('Quick setup guide: See ../QUICK_SETUP.md\n');
      console.log('Server starting anyway (API endpoints will fail until database is set up)...\n');
      return false;
    }

    if (blogs && blogs.length === 0) {
      console.log('📊 Database tables exist but are empty.');
      console.log('ℹ️  Adding 6 default blogs...\n');
      
      const { data: insertedBlogs, error: insertError } = await supabase
        .from('blogs')
        .insert(defaultBlogs.map(blog => ({
          ...blog,
          likes: 0,
          dislikes: 0
        })))
        .select();

      if (insertError) {
        console.warn('⚠️  Warning: Could not insert default blogs:', insertError.message);
        return true;
      }

      console.log(`✅ Successfully added ${insertedBlogs.length} default blogs:\n`);
      insertedBlogs.forEach((blog, index) => {
        console.log(`   ${index + 1}. ${blog.title}`);
      });
      console.log('');
      return true;
    } else {
      console.log(`✅ Database ready with ${blogs.length || 'some'} blog(s)\n`);
      return true;
    }
  } catch (error) {
    console.error('⚠️  Error during database initialization:', error.message);
    console.log('Server starting anyway...\n');
    return false;
  }
}

// GET all blogs
app.get('/api/blogs', async (req, res) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET single blog
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Blog not found' });
  res.json(data);
});

// POST create blog
app.post('/api/blogs', async (req, res) => {
  const { title, subject, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const { data, error } = await supabase
    .from('blogs')
    .insert([{ title, subject: subject || '', content, likes: 0, dislikes: 0 }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// PUT update blog
app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;
  const { title, subject, content } = req.body;

  const { data, error } = await supabase
    .from('blogs')
    .update({ title, subject, content })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: 'Blog not found' });
  res.json(data);
});

// DELETE blog
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Blog deleted successfully' });
});

// POST like a blog
app.post('/api/blogs/:id/like', async (req, res) => {
  const { id } = req.params;

  const { data: blog, error: fetchError } = await supabase
    .from('blogs')
    .select('likes')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) return res.status(500).json({ error: fetchError.message });
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  const { data, error } = await supabase
    .from('blogs')
    .update({ likes: blog.likes + 1 })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST dislike a blog
app.post('/api/blogs/:id/dislike', async (req, res) => {
  const { id } = req.params;

  const { data: blog, error: fetchError } = await supabase
    .from('blogs')
    .select('dislikes')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) return res.status(500).json({ error: fetchError.message });
  if (!blog) return res.status(404).json({ error: 'Blog not found' });

  const { data, error } = await supabase
    .from('blogs')
    .update({ dislikes: blog.dislikes + 1 })
    .eq('id', id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Save to database
    const { error: dbError } = await supabase
      .from('contacts')
      .insert([{ name, email, message }]);

    if (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({ error: 'Failed to save submission' });
    }

    // Send email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.warn('Warning: RESEND_API_KEY not configured. Email not sent.');
      return res.json({
        message: 'Submission received. Email notifications are not configured.',
        submitted: true,
        emailSent: false
      });
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'abhijeetdepale9@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <h2 style="color: #059669; margin-top: 0;">New Contact Form Submission</h2>
            
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; color: #374151; background-color: #f3f4f6; padding: 10px; border-radius: 4px;">${message}</p>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
              This email was sent from Blogify contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      }),
    });

    const emailData = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error('Email send error:', emailData);
      // Still return success since submission was saved in database
      return res.json({
        message: 'Submission received. Email notification failed but your message is saved.',
        submitted: true,
        emailSent: false
      });
    }

    console.log('✅ Email sent successfully to abhijeetdepale9@gmail.com');
    res.json({
      message: 'Message received and email sent successfully!',
      submitted: true,
      emailSent: true
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
});

// Initialize database on startup and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`📱 Frontend should connect to this server\n`);
  });
}).catch((error) => {
  console.error('Initialization error:', error);
  app.listen(PORT, () => {
    console.log(`⚠️  Server started on http://localhost:${PORT} (database may not be ready)`);
  });
});
