'use client'

import { TrendingUp, Users, Heart, MessageCircle, Share2, Eye, Instagram, Youtube, Facebook } from 'lucide-react'

export default function AnalyticsDashboard() {
  const stats = [
    { label: 'Total Posts', value: '247', change: '+12%', icon: Share2, color: 'bg-blue-500' },
    { label: 'Total Reach', value: '1.2M', change: '+24%', icon: Eye, color: 'bg-purple-500' },
    { label: 'Engagement', value: '45.2K', change: '+18%', icon: Heart, color: 'bg-pink-500' },
    { label: 'Followers', value: '89.5K', change: '+8%', icon: Users, color: 'bg-green-500' }
  ]

  const platformStats = [
    { platform: 'Instagram', posts: 92, engagement: '12.4K', reach: '456K', icon: Instagram, color: 'text-pink-600' },
    { platform: 'YouTube', posts: 45, engagement: '18.2K', reach: '523K', icon: Youtube, color: 'text-red-600' },
    { platform: 'Facebook', posts: 78, engagement: '9.8K', reach: '234K', icon: Facebook, color: 'text-blue-600' },
    { platform: 'Threads', posts: 18, engagement: '3.1K', reach: '87K', icon: MessageCircle, color: 'text-gray-800' },
    { platform: 'Pinterest', posts: 14, engagement: '1.7K', reach: '92K', icon: Share2, color: 'text-red-500' }
  ]

  const recentPosts = [
    {
      id: 1,
      platform: 'Instagram',
      caption: 'Morning productivity hacks that changed my life 🌅',
      likes: 2430,
      comments: 156,
      shares: 89,
      time: '2 hours ago'
    },
    {
      id: 2,
      platform: 'YouTube',
      caption: 'The Ultimate Social Media Strategy Guide 2024',
      likes: 5820,
      comments: 342,
      shares: 421,
      time: '5 hours ago'
    },
    {
      id: 3,
      platform: 'Facebook',
      caption: 'Automation tips for busy entrepreneurs 🚀',
      likes: 1240,
      comments: 78,
      shares: 156,
      time: '1 day ago'
    }
  ]

  const topPerforming = [
    {
      content: '5 AI tools every content creator needs',
      platform: 'Instagram',
      engagement: '18.5K',
      viralScore: 9.2
    },
    {
      content: 'How I grew to 100K followers in 6 months',
      platform: 'YouTube',
      engagement: '24.1K',
      viralScore: 9.0
    },
    {
      content: 'Content calendar template (Free)',
      platform: 'Pinterest',
      engagement: '12.3K',
      viralScore: 8.8
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Analytics Dashboard
        </h2>
        <div className="flex gap-2">
          <select className="input-field py-2">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Breakdown */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Platform Performance</h3>
        <div className="space-y-4">
          {platformStats.map((platform) => (
            <div key={platform.platform} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <platform.icon className={`w-8 h-8 ${platform.color}`} />
                <div>
                  <p className="font-semibold">{platform.platform}</p>
                  <p className="text-sm text-gray-600">{platform.posts} posts</p>
                </div>
              </div>
              <div className="flex gap-8 text-sm">
                <div>
                  <p className="text-gray-600">Engagement</p>
                  <p className="font-semibold">{platform.engagement}</p>
                </div>
                <div>
                  <p className="text-gray-600">Reach</p>
                  <p className="font-semibold">{platform.reach}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                    {post.platform}
                  </span>
                  <span className="text-xs text-gray-500">{post.time}</span>
                </div>
                <p className="text-sm mb-3">{post.caption}</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4" />
                    {post.shares}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing */}
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Top Performing Content</h3>
          <div className="space-y-4">
            {topPerforming.map((content, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold flex-1">{content.content}</p>
                  <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded font-semibold ml-2">
                    {content.viralScore}/10
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{content.platform}</span>
                  <span className="font-semibold text-primary">{content.engagement} engagements</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Chart Placeholder */}
      <div className="card">
        <h3 className="text-xl font-bold mb-4">Engagement Trends</h3>
        <div className="h-64 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Chart visualization would go here</p>
        </div>
      </div>
    </div>
  )
}
