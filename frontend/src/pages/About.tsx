import { Link } from 'react-router-dom';
import { BookOpen, Globe, Heart, Users, SquarePen as PenSquare, Star } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Globe size={22} className="text-emerald-400" />,
      title: 'Global Perspective',
      desc: 'Stories from every corner of the world, connecting cultures and minds.',
    },
    {
      icon: <Heart size={22} className="text-rose-400" />,
      title: 'Authentic Voice',
      desc: 'We believe in honest storytelling — raw, real, and deeply personal.',
    },
    {
      icon: <Users size={22} className="text-teal-400" />,
      title: 'Community First',
      desc: 'Every writer and reader is part of our ever-growing family.',
    },
    {
      icon: <Star size={22} className="text-amber-400" />,
      title: 'Quality Content',
      desc: 'Thoughtful, well-crafted posts that leave a lasting impression.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/15 via-slate-950 to-emerald-900/10 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
            <BookOpen size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            About <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Blogify</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A platform born from a love of storytelling. We built Blogify to give every
            writer a beautiful stage and every reader a place to explore.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-slate-800/40 border border-slate-700/40 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Our Story</h2>
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <p>
              Blogify started as a simple idea: what if writing and sharing thoughts online
              felt as natural and enjoyable as journaling? We wanted to remove all the
              friction — no complex editors, no confusing dashboards, just you and your words.
            </p>
            <p>
              Our founder, Abhijeet Depale, built the first version of this platform while
              exploring the intersection of travel, technology, and storytelling. What began as
              a personal project quickly grew into something much bigger — a community of writers
              who share the same passion for authentic expression.
            </p>
            <p>
              Today, Blogify hosts stories about travel adventures, life lessons, technology
              insights, and everything in between. Every post is a window into someone's world,
              and we're honored to be the platform that opens that window.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map(({ icon, title, desc }) => (
            <div key={title} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 bg-slate-700/60 rounded-xl flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-900/30 via-slate-900 to-teal-900/20 border-y border-slate-800/50 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Story?</h2>
          <p className="text-slate-400 mb-8">
            Join our growing community of writers and readers. Your voice matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/create"
              className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-emerald-500/25"
            >
              <PenSquare size={18} /> Start Writing
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-slate-600 hover:border-emerald-500/40 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
