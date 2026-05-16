import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, SquarePen as PenSquare, Send } from 'lucide-react';
import { api } from '../lib/api';

export default function CreateBlog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', subject: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const created = await api.createBlog(form);
      navigate(`/blogs/${created.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create blog.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <PenSquare size={20} className="text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold">Write a New Post</h1>
          </div>
          <p className="text-slate-500 ml-14">Share your story with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Blog Title <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Give your post a catchy title..."
              className="w-full bg-slate-800/60 border border-slate-700/50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Subject / Category
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="e.g. Travel, Life, Technology..."
              className="w-full bg-slate-800/60 border border-slate-700/50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Content <span className="text-rose-400">*</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your story here... Let it flow!"
              rows={14}
              className="w-full bg-slate-800/60 border border-slate-700/50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all resize-none leading-relaxed"
            />
            <p className="text-slate-600 text-xs mt-2">{form.content.length} characters</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
            >
              <Send size={16} /> {loading ? 'Publishing...' : 'Publish Post'}
            </button>
            <Link
              to="/"
              className="text-slate-500 hover:text-slate-300 font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
