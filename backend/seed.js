import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

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

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...\n');

    // Check if blogs table exists and has data
    const { data: existingBlogs, error: checkError } = await supabase
      .from('blogs')
      .select('id', { count: 'exact' });

    if (checkError) {
      console.error('✗ Error checking blogs table:', checkError.message);
      console.log('\n⚠️  Make sure you have created the tables in Supabase:');
      console.log('   1. Go to https://app.supabase.com');
      console.log('   2. Run the SQL migrations from the superbase/migrations folder');
      console.log('   3. Or execute these SQL commands manually:');
      console.log('\n--- Create blogs table ---');
      console.log(
        `CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject text NOT NULL DEFAULT '',
  content text NOT NULL,
  likes integer DEFAULT 0,
  dislikes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);`
      );
      console.log('\n--- Create contacts table ---');
      console.log(
        `CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);`
      );
      process.exit(1);
    }

    if (existingBlogs && existingBlogs.length > 0) {
      console.log(`✓ Database already contains ${existingBlogs.length} blog(s)`);
      console.log('Skipping seed insertion to avoid duplicates.\n');
      console.log('To reseed the database:');
      console.log('  1. Delete all blogs from your Supabase dashboard');
      console.log('  2. Run this script again\n');
      process.exit(0);
    }

    // Insert default blogs
    console.log(`Inserting ${defaultBlogs.length} default blogs...\n`);
    const { data: insertedBlogs, error: insertError } = await supabase
      .from('blogs')
      .insert(defaultBlogs.map(blog => ({
        ...blog,
        likes: 0,
        dislikes: 0
      })))
      .select();

    if (insertError) {
      console.error('✗ Error inserting blogs:', insertError.message);
      process.exit(1);
    }

    console.log(`✓ Successfully inserted ${insertedBlogs.length} blogs:\n`);
    insertedBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   Subject: ${blog.subject}`);
      console.log(`   ID: ${blog.id}\n`);
    });

    console.log('✓ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Unexpected error:', error.message);
    process.exit(1);
  }
}

seedDatabase();
