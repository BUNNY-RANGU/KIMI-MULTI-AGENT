'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { apiRequest } from '@/lib/api';

export default function ResearchDetail() {
  const params = useParams();
  const [research, setResearch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest(`/history/${params.id}`)
      .then(data => {
        setResearch(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen p-8 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!research || research.error) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-3xl">
          <h1 className="text-2xl font-bold mb-4">Intelligence Not Found</h1>
          <Link href="/history" className="text-primary font-bold hover:underline">
            ← Return to Vault
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/history" className="text-primary text-sm font-bold hover:underline flex items-center gap-1 mb-2">
              ← Return to Vault
            </Link>
            <h1 className="text-3xl font-extrabold tracking-tight">{research.topic}</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-primary/10 text-primary text-xs font-black uppercase px-3 py-1 rounded-full">
                {research.content_type}
              </span>
              <span className="text-sm text-foreground/40 font-medium tracking-tight">📅 {research.created_at}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(research.final_content)}
              className="bg-background/50 border border-glass-border p-3 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm flex items-center gap-2 font-bold text-sm"
            >
              <span>📋</span> Copy
            </button>
            <Link
              href="/"
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-sm whitespace-nowrap"
            >
              + New Mission
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-3xl border-primary/5 shadow-2xl overflow-hidden">
          <div className="bg-primary/5 p-4 border-b border-glass-border px-8">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Intelligence Brief</span>
          </div>
          <div className="p-8 md:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed text-lg">
              {research.final_content}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
