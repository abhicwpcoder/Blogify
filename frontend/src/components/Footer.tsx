import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className="text-white font-bold text-xl">Blogify</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A place to share your stories, thoughts, and adventures with the world.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
                { to: '/create', label: 'Write a Blog' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-400 text-sm hover:text-emerald-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>Dhamale Building, Finolex Chowk,<br />Pimpri-Chinchwad, Pune 411018</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone size={15} className="shrink-0 text-emerald-400" />
                <span>7767951802</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={15} className="shrink-0 text-emerald-400" />
                <a href="mailto:abhijeetdepale9@gmail.com" className="hover:text-emerald-400 transition-colors">
                  abhijeetdepale9@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Github size={15} className="shrink-0 text-emerald-400" />
                <span>Abhijeet Depale</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Blogify. Designed and Built by Abhijeet Depale.
          </p>
          <p className="text-slate-600 text-xs">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
