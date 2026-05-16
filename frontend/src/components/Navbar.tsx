import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, SquarePen as PenSquare } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/create', label: 'Write', icon: <PenSquare size={16} /> },
  ];

  const isActive = (to: string) =>
    pathname === to ? 'text-emerald-400 font-semibold' : 'text-slate-200 hover:text-emerald-400';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:bg-emerald-400 transition-colors">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Blogify</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ to, label, icon }) => (
              <Link key={to} to={to} className={`flex items-center gap-1.5 text-sm transition-colors ${isActive(to)}`}>
                {icon}{label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-200 hover:text-white p-2"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-700/50 py-3 space-y-1">
            {links.map(({ to, label, icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${isActive(to)}`}
              >
                {icon}{label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
