'use client'

import { useEffect, useRef } from 'react'

export default function Paper({ text }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight
    }
  }, [text])

  return (
    <div className="w-full flex flex-col justify-end" style={{ maxHeight: '38vh' }}>
      <div
        className="relative paper-lines paper-margin bg-cream rounded-t-sm overflow-hidden"
        style={{
          background: '#f5ead6',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.5), inset 0 0 40px rgba(180,140,80,0.08)',
          paddingTop: '28px',
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around items-center w-8 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{ background: 'rgba(0,0,0,0.15)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)' }}
            />
          ))}
        </div>
        <div
          ref={contentRef}
          className="px-12 pb-4 overflow-y-auto"
          style={{ maxHeight: '34vh', scrollBehavior: 'smooth' }}
        >
          <p
            className="font-mono whitespace-pre-wrap break-all"
            style={{ fontFamily: '"Courier Prime", monospace', fontSize: '15px', lineHeight: '28px', color: '#1a1208' }}
          >
            {text}
            <span
              className="inline-block animate-blink align-text-bottom"
              style={{ width: '8px', height: '16px', marginLeft: '1px', background: '#1a1208' }}
            />
          </p>
        </div>
      </div>
    </div>
  )
}