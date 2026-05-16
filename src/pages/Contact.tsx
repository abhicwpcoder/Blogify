import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { api } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.sendContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={20} className="text-emerald-400" />,
      label: 'Address',
      value: 'Dhamale Building, Finolex Chowk\nOld Mumbai-Pune Highway\nPimpri-Chinchwad, Pune 411018',
    },
    {
      icon: <Phone size={20} className="text-emerald-400" />,
      label: 'Phone',
      value: '+91 7767951802',
    },
    {
      icon: <Mail size={20} className="text-emerald-400" />,
      label: 'Email',
      value: 'abhijeetdepale9@gmail.com',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      {/* Header */}
      <section className="relative overflow-hidden py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/10 via-slate-950 to-emerald-900/10 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            Get in <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
            {contactInfo.map(({ icon, label, value }) => (
              <div key={label} className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 bg-slate-700/60 rounded-xl flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{value}</p>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 rounded-2xl p-5 mt-6">
              <p className="text-emerald-400 text-sm font-medium mb-1">Response Time</p>
              <p className="text-slate-400 text-sm">We typically respond within 24–48 hours. Your message matters to us!</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/40 border border-slate-700/40 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>

              {success ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-400 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-4 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Your Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-900/60 border border-slate-700/50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-slate-900/60 border border-slate-700/50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows={7}
                      className="w-full bg-slate-900/60 border border-slate-700/50 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-all resize-none text-sm leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25 w-full justify-center"
                  >
                    <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
