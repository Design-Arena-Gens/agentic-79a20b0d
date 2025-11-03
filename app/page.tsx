'use client'

import { useState } from 'react'
import { Sparkles, Send, Instagram, Youtube, Facebook, Share2, Calendar, TrendingUp } from 'lucide-react'
import ContentGenerator from '@/components/ContentGenerator'
import WorkflowBuilder from '@/components/WorkflowBuilder'
import ScheduleManager from '@/components/ScheduleManager'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'generate' | 'workflow' | 'schedule' | 'analytics'>('generate')

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Viral Content Automation</h1>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="bg-white/20 px-3 py-1 rounded-full">AI-Powered</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('generate')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'generate'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Generate Content
            </button>
            <button
              onClick={() => setActiveTab('workflow')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'workflow'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Share2 className="w-5 h-5" />
              Workflow
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'schedule'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-colors ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Analytics
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'generate' && <ContentGenerator />}
        {activeTab === 'workflow' && <WorkflowBuilder />}
        {activeTab === 'schedule' && <ScheduleManager />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <Instagram className="w-6 h-6" />
            <Youtube className="w-6 h-6" />
            <Facebook className="w-6 h-6" />
            <Share2 className="w-6 h-6" />
          </div>
          <p className="text-gray-400">Multi-Platform Social Media Automation</p>
        </div>
      </footer>
    </main>
  )
}
