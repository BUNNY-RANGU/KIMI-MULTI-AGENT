'use client';

import { useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [status, setStatus] = useState<'idle' | 'researching' | 'analyzing' | 'writing' | 'editing' | 'done'>('idle');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('researching');
    setError('');
    setResult(null);

    try {
      const data = await apiRequest('/research', {
        method: 'POST',
        body: JSON.stringify({ topic, content_type: contentType }),
      });
      
      setResult(data);
      setStatus('done');
    } catch (err) {
      setError('Failed to research. Check if backend is running.');
      setStatus('idle');
    }
  };

  const getStatusColor = (step: string) => {
    const steps = ['researching', 'analyzing', 'writing', 'editing', 'done'];
    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return 'bg-green-500'; // Done
    if (stepIndex === currentIndex) return 'bg-blue-500 animate-pulse'; // Active
    return 'bg-gray-300'; // Waiting
  };

  return (
    <main className="min-h-screen p-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-6">
          <Link href="/settings" className="glass px-4 py-2 rounded-xl text-primary font-bold hover:scale-105 transition-all text-sm">⚙️ System Core</Link>
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 kimi-gradient tracking-tighter">ResearchSquad AI</h1>
          <p className="text-lg text-foreground/60 font-medium tracking-tight italic">Day 4: Autonomous Multi-Agent Intelligence</p>
        </div>

        {/* Auth Links */}
        <div className="text-center mb-10 flex items-center justify-center gap-6">
          <Link href="/auth/login" className="text-sm font-bold text-foreground/50 hover:text-primary transition-all uppercase tracking-widest">Login</Link>
          <div className="h-4 w-[1px] bg-glass-border"></div>
          <Link href="/auth/signup" className="text-sm font-bold text-foreground/50 hover:text-primary transition-all uppercase tracking-widest">Sign Up</Link>
          <div className="h-4 w-[1px] bg-glass-border"></div>
          <Link href="/history" className="text-sm font-bold text-foreground/50 hover:text-primary transition-all uppercase tracking-widest">History</Link>
        </div>

        {/* Input Form */}
        <div className="glass rounded-3xl p-8 mb-8 animate-float">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3 ml-1">Research Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., AI agents in healthcare 2025"
                className="w-full px-5 py-4 bg-background/50 border border-glass-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-foreground/30 text-foreground"
                required
                disabled={status !== 'idle' && status !== 'done'}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/50 mb-3 ml-1">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-5 py-4 bg-background border border-glass-border rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-foreground appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1.2em' }}
                disabled={status !== 'idle' && status !== 'done'}
              >
                <option value="blog" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">📰 Blog Post</option>
                <option value="linkedin" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">🔗 LinkedIn Post</option>
                <option value="report" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">📄 Business Report</option>
                <option value="thread" className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white">🐦 Twitter Thread</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status !== 'idle' && status !== 'done'}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:opacity-90 active:scale-[0.98] disabled:bg-gray-500/50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
            >
              {status === 'idle' || status === 'done' ? '🚀 Initiate Research' : '⏳ Processing Brief...'}
            </button>
          </form>
        </div>

        {/* Live Agent Status */}
        {status !== 'idle' && (
          <div className="glass rounded-3xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-6 text-foreground">🤖 Agents Working...</h2>
            
            <div className="space-y-6">
              {/* Researcher */}
              <div className="flex items-center space-x-5">
                <div className={`w-3 h-3 rounded-full shadow-lg ${getStatusColor('researching')}`}></div>
                <div className="flex-1">
                  <p className="font-bold text-foreground/80 uppercase text-xs tracking-wider">Researcher</p>
                  <p className="text-sm text-foreground/50 font-medium">
                    {status === 'researching' ? '🔍 Searching web & summarizing...' : 
                     (['analyzing', 'writing', 'editing', 'done'].includes(status)) ? '✅ Mission Complete' : 'Standing By...'}
                  </p>
                </div>
              </div>

              {/* Analyst */}
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor('analyzing')}`}></div>
                <div className="flex-1">
                  <p className="font-semibold">Analyst</p>
                  <p className="text-sm text-gray-500">
                    {status === 'analyzing' ? '🔍 Extracting insights...' : 
                     (['writing', 'editing', 'done'].includes(status)) ? '✅ Complete' : 'Waiting...'}
                  </p>
                </div>
              </div>

              {/* Writer */}
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor('writing')}`}></div>
                <div className="flex-1">
                  <p className="font-semibold">Writer</p>
                  <p className="text-sm text-gray-500">
                    {status === 'writing' ? '✍️ Creating content...' : 
                     (['editing', 'done'].includes(status)) ? '✅ Complete' : 'Waiting...'}
                  </p>
                </div>
              </div>

              {/* Editor */}
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor('editing')}`}></div>
                <div className="flex-1">
                  <p className="font-semibold">Editor</p>
                  <p className="text-sm text-gray-500">
                    {status === 'editing' ? '🔧 Polishing & SEO...' : 
                     status === 'done' ? '✅ Complete' : 'Waiting...'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        {result && status === 'done' && (
          <div className="space-y-6 animate-float">
            <div className="glass rounded-3xl overflow-hidden border-primary/20 shadow-2xl">
              <div className="bg-primary/10 p-5 border-b border-glass-border flex items-center justify-between px-8">
                <span className="text-xs font-black uppercase tracking-widest text-primary">Final Intelligence Brief</span>
                <span className="text-[10px] bg-primary text-white font-black px-2 py-1 rounded">SECURE</span>
              </div>
              <div className="p-8 md:p-12">
                <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap text-foreground tracking-tight leading-relaxed font-medium text-lg">
                  {result.final}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result.final);
                  alert('Copied to Clipboard');
                }}
                className="flex-1 bg-background/50 border border-glass-border text-foreground px-6 py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
              >
                📋 Copy Brief
              </button>
              <Link href="/history" className="flex-1 bg-primary text-white px-6 py-4 rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-center active:scale-95">
                📚 Archive Vault
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}