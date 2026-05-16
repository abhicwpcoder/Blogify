-- ============================================
-- BLOGIFY DATABASE SETUP
-- ============================================
-- Copy and paste this entire file into:
-- Supabase Dashboard → SQL Editor → New Query
-- Then click "RUN"
-- ============================================

-- Drop existing tables if restarting from scratch (optional)
-- DROP TABLE IF EXISTS public.contacts CASCADE;
-- DROP TABLE IF EXISTS public.blogs CASCADE;

-- ============================================
-- CREATE BLOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.blogs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  subject text DEFAULT '',
  content text NOT NULL,
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON public.blogs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Remove old policies if they exist
DROP POLICY IF EXISTS "Anyone can read blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can update their own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authenticated users can delete their own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Allow public read" ON public.blogs;
DROP POLICY IF EXISTS "Allow insert" ON public.blogs;
DROP POLICY IF EXISTS "Allow update" ON public.blogs;
DROP POLICY IF EXISTS "Allow delete" ON public.blogs;

-- Create new policies
CREATE POLICY "Allow public read"
  ON public.blogs
  FOR SELECT
  USING (true);

CREATE POLICY "Allow insert"
  ON public.blogs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow update"
  ON public.blogs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow delete"
  ON public.blogs
  FOR DELETE
  USING (true);

-- ============================================
-- CREATE CONTACTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Remove old policies if they exist
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contacts;
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON public.contacts;
DROP POLICY IF EXISTS "Allow public insert" ON public.contacts;

-- Create new policy
CREATE POLICY "Allow public insert"
  ON public.contacts
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- INSERT DEFAULT BLOGS
-- ============================================
INSERT INTO public.blogs (title, subject, content, likes, dislikes)
VALUES 
  (
    'Getting Started with Web Development',
    'Web Development',
    'Web development is the process of creating websites and web applications. It involves HTML, CSS, and JavaScript to build interactive and responsive user interfaces. Start your journey by learning the basics of these three fundamental technologies.',
    0,
    0
  ),
  (
    'Understanding React Hooks',
    'React',
    'React Hooks revolutionized the way we write React components. They allow you to use state and other React features without writing class components. Learn about useState, useEffect, useContext, and custom hooks to write cleaner, more maintainable code.',
    0,
    0
  ),
  (
    'Database Design Best Practices',
    'Database',
    'Good database design is crucial for application performance. Focus on normalization, proper indexing, and efficient queries. Use ER diagrams to plan your schema before implementation. Always consider scalability and security in your design.',
    0,
    0
  ),
  (
    'The Power of REST APIs',
    'Backend',
    'REST APIs are the backbone of modern web applications. They follow standard HTTP methods (GET, POST, PUT, DELETE) to perform operations. Design your APIs to be stateless, cacheable, and maintainable. Version your APIs for backward compatibility.',
    0,
    0
  ),
  (
    'CSS Flexbox and Grid Layout',
    'Frontend',
    'Master CSS Flexbox and Grid to create responsive layouts. Flexbox is perfect for one-dimensional layouts, while Grid excels at two-dimensional designs. Use these modern layout techniques to build flexible and adaptive user interfaces.',
    0,
    0
  ),
  (
    'JavaScript Async/Await Guide',
    'JavaScript',
    'Async/await makes asynchronous JavaScript code easier to read and write. It allows you to handle promises in a more synchronous-like manner. Learn how to properly handle errors, manage concurrent operations, and avoid common pitfalls.',
    0,
    0
  )
ON CONFLICT DO NOTHING;
