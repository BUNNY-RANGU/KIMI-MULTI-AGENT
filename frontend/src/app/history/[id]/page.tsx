'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ResearchDetail() {
  const params = useParams();
  const [research, setResearch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/history/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setResearch(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </main>
    );
  }

  if (!research || research.error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Not Found</h1>
          <Link href="/history" className="text-blue-600 hover:underline">
            ← Back to History
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Link href="/history" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to History
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{research.topic}</h1>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {research.content_type}
            </span>
            <span>{research.created_at}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="prose max-w-none whitespace-pre-wrap text-gray-700">
            {research.final_content}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <button 
            onClick={() => navigator.clipboard.writeText(research.final_content)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
          >
            📋 Copy Content
          </button>
          <Link 
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            + New Research
          </Link>
        </div>
      </div>
    </main>
  );
}