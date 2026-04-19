import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const maxDuration = 60;

export async function POST(request) {
    try {
        const formData = await request.formData()
        const textContent = formData.get('textContent')

        if (!textContent) {
            return NextResponse.json({ error: 'No text content provided.' }, { status: 400 })
        }

        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: 'OpenAI API Key is missing. Please add OPENAI_API_KEY to your .env file.' },
                { status: 500 }
            )
        }

        const openai = new OpenAI({ apiKey })

        const prompt = `
You are a senior technical writer and blog editor for a digital skills academy called VBS (Virginia Business Solutions).

I am providing you with raw, unstructured text extracted from a document. Your job is to format it into a perfect, engaging blog post.

REQUIREMENTS:
1. Title: Create a catchy, SEO-friendly title based on the text.
2. Excerpt: Write a compelling 2-3 sentence summary of the post.
3. Content: Format the core text using beautiful GitHub-Flavored Markdown. Use headers (##, ###), bullet points, bolding, and code blocks where appropriate. Fix any typos or grammatical errors.
4. Tags: Suggest an array of 2-5 relevant tags (e.g., "React", "Career Advice", "Data Science").

RETURN FORMAT: MUST BE STRICT JSON matching this schema:
{
    "title": "Your Generated Title",
    "excerpt": "Your generated excerpt.",
    "content": "Your markdown formatted content.",
    "tags": ["tag1", "tag2"]
}

RAW TEXT TO PARSE:
"""
${textContent}
"""
`

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a blog post generator. Always respond with valid JSON only, no extra text.' },
                { role: 'user', content: prompt }
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        })

        const resultJson = response.choices[0].message.content

        if (!resultJson) {
            throw new Error('ChatGPT returned an empty response.')
        }

        const parsedData = JSON.parse(resultJson)

        return NextResponse.json({ success: true, data: parsedData }, { status: 200 })

    } catch (error) {
        console.error('AI Generation Error:', error)

        if (error?.status === 429) {
            return NextResponse.json(
                { error: 'ChatGPT quota exceeded. Please check your OpenAI billing at https://platform.openai.com/billing.' },
                { status: 429 }
            )
        }

        return NextResponse.json(
            { error: error.message || 'Failed to generate content' },
            { status: 500 }
        )
    }
}
