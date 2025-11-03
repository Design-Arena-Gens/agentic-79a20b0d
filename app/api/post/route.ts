import { NextResponse } from 'next/server'
import { createSocialMediaAPI } from '@/lib/api/socialMedia'

export async function POST(request: Request) {
  try {
    const { platforms, caption, imageUrl, title, hashtags } = await request.json()

    const config = {
      instagram: {
        accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
        accountId: process.env.INSTAGRAM_ACCOUNT_ID || ''
      },
      youtube: {
        apiKey: process.env.YOUTUBE_API_KEY || '',
        channelId: process.env.YOUTUBE_CHANNEL_ID || ''
      },
      facebook: {
        accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
        pageId: process.env.FACEBOOK_PAGE_ID || ''
      },
      threads: {
        accessToken: process.env.THREADS_ACCESS_TOKEN || ''
      },
      pinterest: {
        accessToken: process.env.PINTEREST_ACCESS_TOKEN || '',
        boardId: process.env.PINTEREST_BOARD_ID || ''
      }
    }

    const api = createSocialMediaAPI(config)

    const results = await api.postToMultiplePlatforms(
      {
        caption,
        imageUrl,
        title,
        hashtags
      },
      platforms
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Post API Error:', error)
    return NextResponse.json(
      { error: 'Failed to post content' },
      { status: 500 }
    )
  }
}
