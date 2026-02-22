'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AgentConfig {
  researcher_role: string;
  researcher_goal: string;
  analyst_role: string;
  analyst_goal: string;
  writer_role: string;
  writer_goal: string;
  editor_role: string;
  editor_goal: string;
}

export default function Settings() {
  const [config, setConfig] = useState<AgentConfig>({
    researcher_role: 'Expert Research Analyst',
    researcher_goal: 'Find accurate information and summarize 3 key insights',
    analyst_role: 'Critical Analysis Expert',
    analyst_goal: 'Identify biases, fact-check, and extract key insights',
    writer_role: 'Professional Content Writer',
    writer_goal: 'Create engaging, SEO-optimized content',
    editor_role: 'Chief Editor',
    editor_goal: 'Polish content to publication standards',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('agent_config');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('agent_config', JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaultConfig = {
      researcher_role: 'Expert Research Analyst',
      researcher_goal: 'Find accurate information and summarize 3 key insights',
      analyst_role: 'Critical Analysis Expert',
      analyst_goal: 'Identify biases, fact-check, and extract key insights',
      writer_role: 'Professional Content Writer',
      writer_goal: 'Create engaging, SEO-optimized content',
      editor_role: 'Chief Editor',
      editor_goal: 'Polish content to publication standards',
    };
    setConfig(defaultConfig);
    localStorage.setItem('agent_config', JSON.stringify(defaultConfig));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">⚙️ Agent Settings</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>

        {/* Saved Message */}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            ✅ Settings saved!
          </div>
        )}

        {/* Researcher */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-800 mb-4">🔍 Researcher Agent</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={config.researcher_role}
                onChange={(e) => setConfig({...config, researcher_role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
              <textarea
                value={config.researcher_goal}
                onChange={(e) => setConfig({...config, researcher_goal: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
              />
            </div>
          </div>
        </div>

        {/* Analyst */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">📊 Analyst Agent</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={config.analyst_role}
                onChange={(e) => setConfig({...config, analyst_role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
              <textarea
                value={config.analyst_goal}
                onChange={(e) => setConfig({...config, analyst_goal: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
              />
            </div>
          </div>
        </div>

        {/* Writer */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-purple-800 mb-4">✍️ Writer Agent</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={config.writer_role}
                onChange={(e) => setConfig({...config, writer_role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
              <textarea
                value={config.writer_goal}
                onChange={(e) => setConfig({...config, writer_goal: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
              />
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-red-800 mb-4">🔧 Editor Agent</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                value={config.editor_role}
                onChange={(e) => setConfig({...config, editor_role: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
              <textarea
                value={config.editor_goal}
                onChange={(e) => setConfig({...config, editor_goal: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            💾 Save Settings
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            🔄 Reset to Default
          </button>
        </div>
      </div>
    </main>
  );
}
