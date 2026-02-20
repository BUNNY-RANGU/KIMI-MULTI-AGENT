'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState('blog');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, content_type: contentType }),
      });

      if (!response.ok) throw new Error('Research failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to research. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🚀 ResearchSquad AI
          </h1>
          <p className="text-xl text-gray-600">
            4-Agent Research & Content System
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., AI agents in healthcare 2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content Type
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="blog">Blog Post</option>
                <option value="linkedin">LinkedIn Post</option>
                <option value="report">Business Report</option>
                <option value="thread">Twitter Thread</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? '🔍 Researching...' : '🚀 Start Research'}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-lg text-gray-600">4 agents working...</span>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Final Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📝 Final Content
              </h2>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-700">
                {result.final}
              </div>
            </div>

            {/* Agent Outputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-2">📋 Research Brief</h3>
                <p className="text-sm text-blue-700 line-clamp-4">{result.brief}</p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-2">📊 Analysis</h3>
                <p className="text-sm text-green-700 line-clamp-4">{result.analysis}</p>
              </div>
            </div>

            {/* Sources */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-4">🔗 Sources</h3>
              <ul className="space-y-2">
                {result.sources.map((source: any, idx: number) => (
                  <li key={idx} className="text-sm">
                    <a href={source.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}