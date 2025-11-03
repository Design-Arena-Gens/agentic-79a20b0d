import { NextResponse } from 'next/server'
import { generateViralContent, type ContentGenerationRequest } from '@/lib/ai/contentGenerator'

export async function POST(request: Request) {
  try {
    const body: ContentGenerationRequest = await request.json()

    if (!body.topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
    }

    const content = await generateViralContent(body)

    return NextResponse.json(content)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
