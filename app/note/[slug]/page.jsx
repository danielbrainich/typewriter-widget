import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function NotePage({ params }) {
  const slug = params.slug

  const { data, error } = await supabase
    .from('snippets')
    .select('content, created_at')
    .eq('slug', slug)
    .single()

  if (error || !data) notFound()

  const date = new Date(data.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: 'radial-gradient(ellipse at 50% 50%, #3d2810 0%, #1a1208 70%)' }}
    >
      <div className="w-full max-w-xl">
        <div
          className="relative paper-lines paper-margin rounded-t-sm"
          style={{
            background: '#f5ead6',
            boxShadow: '0 4px 40px rgba(0,0,0,0.6)',
            padding: '48px 48px 48px 56px',
          }}
        >
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around items-center w-8 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ background: 'rgba(0,0,0,0.15)' }} />
            ))}
          </div>
          <p style={{ fontFamily: '"Courier Prime", monospace', fontSize: '15px', lineHeight: '28px', color: '#1a1208', whiteSpace: 'pre-wrap', wordBreak: 'break-words' }}>
            {data.content}
          </p>
          <p className="mt-8 text-xs opacity-40 text-right" style={{ fontFamily: '"Special Elite", cursive', color: '#1a1208' }}>
            filed {date}
          </p>
        </div>
        <div style={{ background: '#ede0c4', height: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.4)', borderRadius: '0 0 2px 2px' }} />
      </div>
      <Link href="/" className="mt-12 text-xs tracking-widest uppercase opacity-50 hover:opacity-80 transition-opacity" style={{ fontFamily: '"Special Elite", cursive', color: '#b8962e' }}>
        write your own →
      </Link>
    </div>
  )
}
