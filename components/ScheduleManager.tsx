'use client'

import { useState } from 'react'
import { Calendar, Clock, Send, Edit, Trash2 } from 'lucide-react'
import { useContentStore } from '@/lib/stores/contentStore'
import { format } from 'date-fns'

export default function ScheduleManager() {
  const contents = useContentStore((state) => state.contents)
  const updateContent = useContentStore((state) => state.updateContent)
  const deleteContent = useContentStore((state) => state.deleteContent)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const draftContents = contents.filter((c) => c.status === 'draft')
  const scheduledContents = contents.filter((c) => c.status === 'scheduled')
  const publishedContents = contents.filter((c) => c.status === 'published')

  const handleSchedule = (contentId: string) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time')
      return
    }

    const scheduledDate = new Date(`${selectedDate}T${selectedTime}`)
    updateContent(contentId, {
      status: 'scheduled',
      scheduledDate
    })

    alert('Content scheduled successfully!')
  }

  const handlePublishNow = (contentId: string) => {
    updateContent(contentId, {
      status: 'published'
    })
    alert('Content published!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="w-6 h-6 text-primary" />
          Content Schedule
        </h2>
      </div>

      {/* Schedule Controls */}
      <div className="card">
        <h3 className="font-semibold mb-4">Schedule Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Draft Content */}
      <div className="card">
        <h3 className="font-semibold mb-4 text-lg">
          Draft Content ({draftContents.length})
        </h3>
        <div className="space-y-3">
          {draftContents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No draft content. Generate some content first!
            </p>
          ) : (
            draftContents.map((content) => (
              <div
                key={content.id}
                className="bg-gray-50 p-4 rounded-lg flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                      {content.type}
                    </span>
                    {content.platforms.map((platform) => (
                      <span
                        key={platform}
                        className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded capitalize"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm line-clamp-2">{content.caption}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Created: {format(content.createdAt, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleSchedule(content.id)}
                    className="bg-primary text-white px-3 py-2 rounded-lg hover:opacity-90 text-sm"
                  >
                    <Clock className="w-4 h-4 inline mr-1" />
                    Schedule
                  </button>
                  <button
                    onClick={() => handlePublishNow(content.id)}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:opacity-90 text-sm"
                  >
                    <Send className="w-4 h-4 inline mr-1" />
                    Post Now
                  </button>
                  <button
                    onClick={() => deleteContent(content.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Scheduled Content */}
      <div className="card">
        <h3 className="font-semibold mb-4 text-lg">
          Scheduled Posts ({scheduledContents.length})
        </h3>
        <div className="space-y-3">
          {scheduledContents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No scheduled posts</p>
          ) : (
            scheduledContents.map((content) => (
              <div
                key={content.id}
                className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex items-start justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Scheduled
                    </span>
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                      {content.type}
                    </span>
                  </div>
                  <p className="text-sm line-clamp-2 mb-2">{content.caption}</p>
                  <p className="text-sm font-semibold text-blue-600">
                    📅 {content.scheduledDate && format(content.scheduledDate, 'MMM dd, yyyy \'at\' HH:mm')}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => updateContent(content.id, { status: 'draft' })}
                    className="text-gray-600 hover:text-gray-800 px-2"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteContent(content.id)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Published Content */}
      <div className="card">
        <h3 className="font-semibold mb-4 text-lg">
          Published ({publishedContents.length})
        </h3>
        <div className="space-y-3">
          {publishedContents.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No published content yet</p>
          ) : (
            publishedContents.map((content) => (
              <div
                key={content.id}
                className="bg-green-50 border border-green-200 p-4 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Published
                  </span>
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                    {content.type}
                  </span>
                </div>
                <p className="text-sm line-clamp-2">{content.caption}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
