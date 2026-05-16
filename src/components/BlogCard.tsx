import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Clock, ArrowRight } from 'lucide-react';
import { Blog } from '../lib/api';

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  const preview = blog.content.slice(0, 180) + (blog.content.length > 180 ? '...' : '');
  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <article className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/40 hover:bg-slate-800/80 transition-all duration-300 group flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="inline-block text-xs font-medium bg-emerald-500/15 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
          {blog.subject || 'General'}
        </span>
        <span className="flex items-center gap-1 text-slate-500 text-xs whitespace-nowrap">
          <Clock size={12} />
          {date}
        </span>
      </div>

      <h2 className="text-white font-bold text-xl mb-3 leading-snug group-hover:text-emerald-400 transition-colors">
        {blog.title}
      </h2>

      <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">{preview}</p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-400 text-sm">
            <ThumbsUp size={14} className="text-emerald-400" />
            {blog.likes}
          </span>
          <span className="flex items-center gap-1.5 text-slate-400 text-sm">
            <ThumbsDown size={14} className="text-rose-400" />
            {blog.dislikes}
          </span>
        </div>
        <Link
          to={`/blogs/${blog.id}`}
          className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium hover:gap-2.5 transition-all"
        >
          Read more <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
