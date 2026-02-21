'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/history')
      .then(res => res.json())
      .then(data => {
        setHistory(data.history);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">📚 Research History</h1>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            + New Research
          </Link>
        </div>


                {/* Add History Link */}
        <div className="text-center mb-6">
          <a href="/history" className="text-blue-600 hover:text-blue-800 font-semibold">
            📚 View Research History →
          </a>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {/* History List */}
        {!loading && history.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-gray-500 text-lg">No research yet. Create your first!</p>
          </div>
        )}

        {!loading && history.map((item: any) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl p-6 mb-4 hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{item.topic}</h2>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {item.content_type}
                  </span>
                  <span>{item.created_at}</span>
                </div>
              </div>
              <Link 
                href={`/history/${item.id}`}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                View →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}