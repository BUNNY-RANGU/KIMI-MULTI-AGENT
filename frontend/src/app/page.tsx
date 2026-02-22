'use client';

import { useState } from 'react';
import Link from 'next/link';

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
      const response = await fetch('http://localhost:8000/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, content_type: contentType }),
      });

      if (!response.ok) throw new Error('Research failed');
      
      const data = await response.json();
      setResult(data);
      setStatus('done');
    } catch (err) {
      setError('Failed to research');
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">

        <Link href="/settings" className="text-purple-600 hover:underline">⚙️ Settings</Link>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">🚀 ResearchSquad AI</h1>
          <p className="text-xl text-gray-600">4-Agent Research & Content System</p>
        </div>

        {/* Auth Links */}
        <div className="text-center mb-6 space-x-4">
          <Link href="/auth/login" className="text-blue-600 hover:underline">Login</Link>
          <span className="text-gray-400">|</span>
          <Link href="/auth/signup" className="text-green-600 hover:underline">Sign Up</Link>
          <span className="text-gray-400">|</span>
          <Link href="/history" className="text-blue-600 hover:underline">History</Link>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Research Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., AI agents in healthcare 2025"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                disabled={status !== 'idle' && status !== 'done'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={status !== 'idle' && status !== 'done'}
              >
                <option value="blog">Blog Post</option>
                <option value="linkedin">LinkedIn Post</option>
                <option value="report">Business Report</option>
                <option value="thread">Twitter Thread</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status !== 'idle' && status !== 'done'}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {status === 'idle' || status === 'done' ? '🚀 Start Research' : '⏳ Researching...'}
            </button>
          </form>
        </div>

        {/* Live Agent Status */}
        {status !== 'idle' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">🤖 Agents Working...</h2>
            
            <div className="space-y-4">
              {/* Researcher */}
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full ${getStatusColor('researching')}`}></div>
                <div className="flex-1">
                  <p className="font-semibold">Researcher</p>
                  <p className="text-sm text-gray-500">
                    {status === 'researching' ? '🔍 Searching web & summarizing...' : 
                     (['analyzing', 'writing', 'editing', 'done'].includes(status)) ? '✅ Complete' : 'Waiting...'}
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
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 Final Content</h2>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-700">
                {result.final}
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(result.final);
                  alert('Copied!');
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                📋 Copy
              </button>
              <Link href="/history" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                📚 View History
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}