'use client';

import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await apiRequest('/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, content_type: contentType }),
      });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to research. Make sure backend is running at http://127.0.0.1:8000');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Bar */}
        <nav className="glass rounded-2xl p-4 mb-12 flex justify-between items-center px-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <h1 className="text-xl font-bold kimi-gradient">Kimi Research Squad</h1>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/history" className="text-sm font-medium hover:text-primary transition-colors">History</Link>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-500 hover:text-red-400"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
                <Link href="/auth/signup" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all">
                  Join Squad
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Deploy your <span className="kimi-gradient">AI Research Team</span>
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Researcher, Analyst, Writer, and Editor agents working together for your content.
          </p>
        </div>

        {/* Input Card */}
        <div className="glass rounded-3xl p-8 mb-8 border-primary/10">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2 ml-1">Research Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The impact of quantum computing on cybersecurity in 2025"
                className="w-full px-5 py-4 bg-background/50 border border-glass-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-2 ml-1">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-5 py-4 bg-background/50 border border-glass-border rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="blog">Blog Post</option>
                <option value="linkedin">LinkedIn Post</option>
                <option value="report">Business Report</option>
                <option value="thread">Twitter Thread</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-[0.99] disabled:bg-gray-500/50 transition-all shadow-xl shadow-primary/20"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Researching Multi-Agent Pipeline...
                  </span>
                ) : '🔥 Launch Research Squad'}
              </button>
            </div>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl mb-8 flex items-center gap-4">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Loading / Progress */}
        {loading && (
          <div className="glass rounded-3xl p-12 text-center animate-pulse border-primary/20">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-primary">Squad</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Multi-Agent Intelligence Active</h3>
                <p className="text-foreground/50">Coordinating Researcher, Analyst, Writer and Editor...</p>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}

        {/* Results Visualization */}
        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Final Content Section */}
            <div className="glass rounded-3xl overflow-hidden border-primary/10 shadow-2xl">
              <div className="bg-primary/5 p-6 border-b border-glass-border flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <span className="text-2xl">📝</span> Final Publication
                </h2>
                <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase rounded-full tracking-tighter">
                  Verified by Editor
                </span>
              </div>
              <div className="p-8 md:p-12">
                <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-lg">
                  {result.final}
                </div>
              </div>
            </div>

            {/* Behind the Scenes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass rounded-3xl p-8 border-blue-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black">01</span>
                </div>
                <h3 className="text-xl font-bold text-blue-500 mb-4 flex items-center gap-2">
                  📋 Research Brief
                </h3>
                <p className="text-foreground/70 leading-relaxed italic line-clamp-6">"{result.brief}"</p>
              </div>

              <div className="glass rounded-3xl p-8 border-green-500/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black">02</span>
                </div>
                <h3 className="text-xl font-bold text-green-500 mb-4 flex items-center gap-2">
                  📊 Analyst Insight
                </h3>
                <p className="text-foreground/70 leading-relaxed line-clamp-6">{result.analysis}</p>
              </div>
            </div>

            {/* Intelligence Sources */}
            <div className="glass rounded-3xl p-8 border-glass-border">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-2xl">🔗</span> Referenced Intelligence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.sources.map((source: any, idx: number) => (
                  <a
                    key={idx}
                    href={source.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-background/40 hover:bg-primary/5 border border-glass-border rounded-2xl transition-all flex flex-col gap-1 group"
                  >
                    <span className="text-xs font-bold text-primary opacity-60 group-hover:opacity-100 uppercase">Source {idx + 1}</span>
                    <span className="font-medium line-clamp-1 group-hover:text-primary transition-colors">{source.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}