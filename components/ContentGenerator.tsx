'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Copy, Download, Send } from 'lucide-react'
import { generateViralContent, type ContentGenerationRequest, type GeneratedContent } from '@/lib/ai/contentGenerator'
import { useContentStore } from '@/lib/stores/contentStore'

export default function ContentGenerator() {
  const [request, setRequest] = useState<ContentGenerationRequest>({
    topic: '',
    platform: 'instagram',
    tone: 'casual',
    length: 'medium'
  })
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram'])

  const addContent = useContentStore((state) => state.addContent)

  const handleGenerate = async () => {
    if (!request.topic) return

    setLoading(true)
    try {
      const content = await generateViralContent(request)
      setGeneratedContent(content)
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAndSchedule = () => {
    if (!generatedContent) return

    addContent({
      type: request.platform,
      caption: generatedContent.caption,
      title: generatedContent.title,
      description: generatedContent.description,
      hashtags: generatedContent.hashtags,
      imagePrompt: generatedContent.imagePrompt,
      imageUrl: 'https://source.unsplash.com/random/1080x1080/?social-media',
      status: 'draft',
      platforms: selectedPlatforms
    })

    alert('Content saved! Go to Schedule tab to set posting time.')
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    )
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Generate Viral Content
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Topic / Idea</label>
            <input
              type="text"
              value={request.topic}
              onChange={(e) => setRequest({ ...request, topic: e.target.value })}
              placeholder="E.g., Morning routines for productivity"
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Platform</label>
              <select
                value={request.platform}
                onChange={(e) =>
                  setRequest({ ...request, platform: e.target.value as any })
                }
                className="input-field"
              >
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="facebook">Facebook</option>
                <option value="threads">Threads</option>
                <option value="pinterest">Pinterest</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tone</label>
              <select
                value={request.tone}
                onChange={(e) => setRequest({ ...request, tone: e.target.value as any })}
                className="input-field"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Length</label>
              <select
                value={request.length}
                onChange={(e) => setRequest({ ...request, length: e.target.value as any })}
                className="input-field"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !request.topic}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 inline mr-2" />
                Generate Content
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Content Display */}
      {generatedContent && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Generated Content</h3>

          <div className="space-y-4">
            {generatedContent.title && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Title</label>
                  <button
                    onClick={() => handleCopy(generatedContent.title!)}
                    className="text-primary hover:text-primary/80"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">{generatedContent.title}</p>
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Caption / Description</label>
                <button
                  onClick={() => handleCopy(generatedContent.caption)}
                  className="text-primary hover:text-primary/80"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{generatedContent.caption}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Hashtags</label>
                <button
                  onClick={() => handleCopy(generatedContent.hashtags.join(' '))}
                  className="text-primary hover:text-primary/80"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-primary">{generatedContent.hashtags.join(' ')}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Image Prompt (for AI generation)</label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">{generatedContent.imagePrompt}</p>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Post to Platforms</label>
              <div className="flex flex-wrap gap-2">
                {['instagram', 'youtube', 'facebook', 'threads', 'pinterest'].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                      selectedPlatforms.includes(platform)
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button onClick={handleSaveAndSchedule} className="btn-primary flex-1">
                <Send className="w-5 h-5 inline mr-2" />
                Save & Schedule
              </button>
              <button className="btn-secondary">
                <Download className="w-5 h-5 inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
