import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Pencil, Trash2, ArrowLeft, Clock, Tag } from 'lucide-react';
import { api, Blog } from '../lib/api';

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    if (!id) return;
    api.getBlog(id)
      .then(setBlog)
      .catch(() => setError('Blog not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleLike = async () => {
    if (!id || voting) return;
    setVoting(true);
    try {
      const updated = await api.likeBlog(id);
      setBlog(updated);
    } finally {
      setVoting(false);
    }
  };

  const handleDislike = async () => {
    if (!id || voting) return;
    setVoting(true);
    try {
      const updated = await api.dislikeBlog(id);
      setBlog(updated);
    } finally {
      setVoting(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this blog?')) return;
    setDeleting(true);
    try {
      await api.deleteBlog(id);
      navigate('/');
    } catch {
      alert('Failed to delete blog.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20 flex flex-col items-center justify-center text-center px-4">
        <p className="text-rose-400 text-xl mb-4">{error || 'Blog not found.'}</p>
        <Link to="/" className="text-emerald-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {blog.subject && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-500/15 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <Tag size={11} /> {blog.subject}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-slate-500 text-xs">
              <Clock size={12} /> {date}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
            {blog.title}
          </h1>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleLike}
              disabled={voting}
              className="flex items-center gap-2 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
            >
              <ThumbsUp size={15} /> Like ({blog.likes})
            </button>
            <button
              onClick={handleDislike}
              disabled={voting}
              className="flex items-center gap-2 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
            >
              <ThumbsDown size={15} /> Dislike ({blog.dislikes})
            </button>
            <div className="ml-auto flex items-center gap-2">
              <Link
                to={`/blogs/${blog.id}/update`}
                className="flex items-center gap-2 bg-slate-700/60 hover:bg-slate-700 border border-slate-600/50 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
              >
                <Pencil size={14} /> Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 bg-rose-900/30 hover:bg-rose-900/50 border border-rose-700/30 text-rose-400 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
              >
                <Trash2 size={14} /> {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="prose prose-invert prose-lg max-w-none">
          {blog.content.split('\n').map((para, i) => (
            <p key={i} className="text-slate-300 leading-relaxed mb-5 text-base sm:text-lg">
              {para}
            </p>
          ))}
        </div>

        {/* Footer bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">Was this helpful?</span>
            <button
              onClick={handleLike}
              disabled={voting}
              className="flex items-center gap-1.5 text-emerald-400 text-sm hover:text-emerald-300 transition-colors disabled:opacity-50"
            >
              <ThumbsUp size={14} /> {blog.likes}
            </button>
            <button
              onClick={handleDislike}
              disabled={voting}
              className="flex items-center gap-1.5 text-rose-400 text-sm hover:text-rose-300 transition-colors disabled:opacity-50"
            >
              <ThumbsDown size={14} /> {blog.dislikes}
            </button>
          </div>
          <Link to="/" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors flex items-center gap-1.5">
            <ArrowLeft size={14} /> All posts
          </Link>
        </div>
      </div>
    </div>
  );
}
