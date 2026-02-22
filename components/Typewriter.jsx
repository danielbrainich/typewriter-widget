'use client'

import { useState, useEffect, useRef } from 'react'
import Paper from './Paper'
import Keyboard, { flashKey } from './Keyboard'
import { useTypewriterSound } from '@/hooks/useTypewriterSound'

export default function Typewriter() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState(null) // null | 'saving' | 'saved' | 'error'
  const [shareUrl, setShareUrl] = useState(null)
  const inputRef = useRef(null)
  const { playClack, playReturn } = useTypewriterSound()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChar = (char) => {
    if (char === 'Backspace') {
      playClack()
      flashKey('Backspace')
      setText((prev) => prev.slice(0, -1))
    } else if (char === '\n') {
      playReturn()
      flashKey('Enter')
      setText((prev) => prev + '\n')
    } else {
      playClack()
      flashKey(char)
      setText((prev) => prev + char)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleChar('\n') }
    else if (e.key === 'Backspace') { e.preventDefault(); handleChar('Backspace') }
    else if (e.key.length === 1) { handleChar(e.key) }
  }

  const handleFile = async () => {
    if (!text.trim()) return
    setStatus('saving')
    setShareUrl(null)

    try {
      const res = await fetch('/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      const url = `${window.location.origin}/note/${data.slug}`
      setShareUrl(url)
      setStatus('saved')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const handleCopy = () => {
    if (shareUrl) navigator.clipboard.writeText(shareUrl)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-end"
      style={{
        background: 'radial-gradient(ellipse at 50% 100%, #3d2810 0%, #1a1208 60%)',
        cursor: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        style={{ position: 'fixed', opacity: 0, pointerEvents: 'none', top: -100 }}
        readOnly
      />

      {/* Share URL toast */}
      {status === 'saved' && shareUrl && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-sm z-50"
          style={{
            background: '#f5ead6',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            fontFamily: '"Special Elite", cursive',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="text-xs" style={{ color: '#1a1208' }}>filed →</span>
          <span className="text-xs opacity-60 max-w-xs truncate" style={{ color: '#1a1208' }}>{shareUrl}</span>
          <button
            onClick={handleCopy}
            className="text-xs px-2 py-1 rounded-sm transition-opacity hover:opacity-70"
            style={{ background: '#1a1208', color: '#f5ead6', fontFamily: '"Special Elite", cursive' }}
          >
            copy
          </button>
          <button
            onClick={() => { setStatus(null); setShareUrl(null); setText('') }}
            className="text-xs opacity-40 hover:opacity-70 transition-opacity"
            style={{ color: '#1a1208' }}
          >
            ✕
          </button>
        </div>
      )}

      {status === 'saving' && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-sm text-xs z-50"
          style={{ background: '#f5ead6', fontFamily: '"Special Elite", cursive', color: '#1a1208', boxShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
        >
          filing...
        </div>
      )}

      {status === 'error' && (
        <div
          className="fixed top-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-sm text-xs z-50"
          style={{ background: '#f5ead6', fontFamily: '"Special Elite", cursive', color: '#8b2020', boxShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
        >
          something went wrong — try again
        </div>
      )}

      {/* Paper */}
      <div className="w-full max-w-xl px-4 mb-4">
        <Paper text={text} />
      </div>

      {/* Typewriter body */}
      <div className="w-full max-w-2xl px-2">
        {/* Platen */}
        <div
          className="mx-8 rounded-t-xl flex items-center justify-center overflow-hidden relative"
          style={{
            background: 'linear-gradient(180deg, #3a3028 0%, #2a2018 40%, #3a3028 100%)',
            height: '36px',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.05)',
          }}
        >
          <div
            className="w-full mx-3 rounded-full"
            style={{
              height: '22px',
              background: 'linear-gradient(180deg, #5a5048 0%, #3a3028 50%, #5a5048 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
            }}
          />
          <div className="absolute left-20 top-1.5 bottom-1.5 w-0.5 rounded-sm opacity-60" style={{ background: '#b8962e' }} />
          <div className="absolute right-20 top-1.5 bottom-1.5 w-0.5 rounded-sm opacity-60" style={{ background: '#b8962e' }} />
        </div>

        {/* Body */}
        <div
          className="relative px-6 rounded-b-lg"
          style={{
            background: 'linear-gradient(170deg, #5a5048 0%, #3d3428 30%, #2a2018 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          <span
            className="absolute top-3 right-9 text-xs tracking-widest uppercase opacity-60"
            style={{ fontFamily: '"Special Elite", cursive', color: '#b8962e', letterSpacing: '3px' }}
          >
            Coronet
          </span>

          <div className="absolute top-3 left-9 flex gap-4">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="relative rounded-full"
                style={{ width: 16, height: 16, background: 'radial-gradient(circle at 40% 35%, #8b4040, #4a1010)', boxShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full" style={{ width: 6, height: 6, background: '#1a1208' }} />
                </div>
              </div>
            ))}
          </div>

          <Keyboard onKeyPress={handleChar} onFile={handleFile} />
        </div>

        {/* Bottom plate */}
        <div
          className="mx-2 rounded-b-2xl"
          style={{ background: 'linear-gradient(180deg, #2a2018, #1a1208)', height: '14px', boxShadow: '0 6px 16px rgba(0,0,0,0.8)' }}
        />

        {/* Feet */}
        <div className="flex justify-between px-10 -mt-0.5 mb-0">
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                width: 50, height: 10,
                background: 'linear-gradient(180deg, #1a1208, #0d0a04)',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.8)',
              }}
            />
          ))}
        </div>
      </div>

      <p
        className="fixed bottom-3 text-xs tracking-widest uppercase opacity-40 pointer-events-none"
        style={{ fontFamily: '"Special Elite", cursive', color: '#b8962e' }}
      >
        click anywhere &amp; type
      </p>
    </div>
  )
}