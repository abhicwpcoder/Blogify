import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Pencil } from 'lucide-react';
import { api } from '../lib/api';

export default function UpdateBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', subject: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    api.getBlog(id)
      .then((blog) => setForm({ title: blog.title, subject: blog.subject, content: blog.content }))
      .catch(() => setError('Failed to load blog.'))
      .finally(() => setFetching(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.');
      return;
    }
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      await api.updateBlog(id, form);
      navigate(`/blogs/${id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update blog.');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <Link
          to={id ? `/blogs/${id}` : '/'}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Post
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Pencil size={20} className="text-amber-400" />
            </div>
            <h1 className="text-3xl font-bold">Edit Post</h1>
          </div>
          <p className="text-slate-500 ml-14">Update your blog post details</p>
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
              placeholder="Blog title..."
              className="w-full bg-slate-800/60 border border-slate-700/50 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
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
              className="w-full bg-slate-800/60 border border-slate-700/50 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all"
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
              placeholder="Write your updated story..."
              rows={14}
              className="w-full bg-slate-800/60 border border-slate-700/50 focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all resize-none leading-relaxed"
            />
            <p className="text-slate-600 text-xs mt-2">{form.content.length} characters</p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/25"
            >
              <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              to={id ? `/blogs/${id}` : '/'}
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
