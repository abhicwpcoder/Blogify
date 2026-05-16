import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SquarePen as PenSquare, BookOpen, TrendingUp } from 'lucide-react';
import { api, Blog } from '../lib/api';
import BlogCard from '../components/BlogCard';

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getBlogs()
      .then(setBlogs)
      .catch(() => setError('Failed to load blogs. Make sure the backend server is running.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-950 to-teal-900/10 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 mb-6">
            <TrendingUp size={14} />
            Stories that inspire
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
            Share Your
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"> Story</span>
            <br />with the World
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A community-driven blog platform where curious minds share their travel adventures,
            life lessons, and everything in between.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
            >
              <PenSquare size={18} /> Start Writing
            </Link>
            <a
              href="#blogs"
              className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-emerald-500/50 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:bg-slate-800/50"
            >
              <BookOpen size={18} /> Browse Blogs
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-800/50 bg-slate-900/30 py-8">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { label: 'Total Posts', value: blogs.length },
            { label: 'Total Likes', value: blogs.reduce((a, b) => a + b.likes, 0) },
            { label: 'Active Readers', value: '∞' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-emerald-400">{value}</div>
              <div className="text-slate-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section id="blogs" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Latest Posts</h2>
            <p className="text-slate-500 mt-1">Discover stories from our community</p>
          </div>
          <Link
            to="/create"
            className="hidden sm:flex items-center gap-2 text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors"
          >
            <PenSquare size={15} /> New Post
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-800/40 rounded-2xl p-6 animate-pulse h-64" />
            ))}
          </div>
        )}

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-6 text-center">
            {error}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-500 text-lg">No blogs yet. Be the first to write one!</p>
            <Link to="/create" className="mt-4 inline-block text-emerald-400 hover:text-emerald-300 font-medium">
              Write the first post
            </Link>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
