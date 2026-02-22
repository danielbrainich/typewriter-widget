import { supabase } from '@/lib/supabase'
import { nanoid } from 'nanoid'

export async function POST(request) {
  try {
    const { content } = await request.json()

    if (!content || content.trim().length === 0) {
      return Response.json({ error: 'Content is required' }, { status: 400 })
    }

    const slug = nanoid(8)

    const { data, error } = await supabase
      .from('snippets')
      .insert({ slug, content: content.trim() })
      .select('slug')
      .single()

    if (error) throw error

    return Response.json({ slug: data.slug })
  } catch (err) {
    console.error(err)
    return Response.json({ error: 'Failed to save snippet' }, { status: 500 })
  }
}
