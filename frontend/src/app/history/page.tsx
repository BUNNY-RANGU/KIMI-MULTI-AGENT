'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiRequest } from '@/lib/api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest('/history')
      .then(data => {
        setHistory(data.history);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12 glass p-6 rounded-2xl px-8">
          <div>
            <h1 className="text-3xl font-extrabold kimi-gradient">Research Vault</h1>
            <p className="text-foreground/50 text-sm">Access your intelligence history</p>
          </div>
          <Link href="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            + New Mission
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* History List */}
        {!loading && history.length === 0 && (
          <div className="glass rounded-3xl p-20 text-center">
            <span className="text-5xl mb-4 block">📭</span>
            <p className="text-foreground/50 text-xl font-medium">Your vault is empty.</p>
            <Link href="/" className="text-primary font-bold mt-4 inline-block hover:underline">
              Start your first research mission →
            </Link>
          </div>
        )}

        {!loading && history.map((item: any) => (
          <div key={item.id} className="glass rounded-2xl p-6 mb-4 hover:border-primary/30 transition-all group">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">{item.topic}</h2>
                <div className="flex items-center gap-4">
                  <span className="bg-primary/10 text-primary text-xs font-black uppercase px-3 py-1 rounded-full">
                    {item.content_type}
                  </span>
                  <span className="text-sm text-foreground/40 font-medium">📅 {item.created_at}</span>
                </div>
              </div>
              <Link
                href={`/history/${item.id}`}
                className="w-12 h-12 bg-background/50 border border-glass-border rounded-xl flex items-center justify-center text-xl hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
