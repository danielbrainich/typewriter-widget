'use client'

import { useState, useEffect } from 'react'

export default function Key({ label, wide = false, extraWide = false, onClick }) {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if (e.detail === label) {
        setPressed(true)
        setTimeout(() => setPressed(false), 120)
      }
    }
    window.addEventListener('typewriter-key', handler)
    return () => window.removeEventListener('typewriter-key', handler)
  }, [label])

  const handleClick = () => {
    setPressed(true)
    setTimeout(() => setPressed(false), 120)
    onClick?.()
  }

  const width = extraWide ? 140 : wide ? 58 : 34

  return (
    <div
      className="relative select-none cursor-pointer"
      style={{
        transform: pressed ? 'translateY(3px)' : 'translateY(0)',
        transition: 'transform 0.06s ease',
      }}
      onClick={handleClick}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #5a5048, #3d3428)',
          borderRadius: extraWide || wide ? '6px' : '50%',
          padding: '3px',
          boxShadow: pressed
            ? '0 1px 0 #1a1208, 0 2px 4px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)'
            : '0 4px 0 #1a1208, 0 5px 8px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
          transition: 'box-shadow 0.06s ease',
        }}
      >
        <div
          className="key-shine relative flex items-center justify-center"
          style={{
            background: pressed
              ? 'radial-gradient(ellipse at 40% 35%, #3a3020 0%, #1a1208 70%)'
              : 'radial-gradient(ellipse at 40% 35%, #4a3f30 0%, #2a1f0e 70%)',
            borderRadius: extraWide || wide ? '4px' : '50%',
            width: `${width}px`,
            height: '34px',
            fontFamily: '"Special Elite", cursive',
            fontSize: extraWide ? '10px' : '11px',
            color: pressed ? '#a09070' : '#c8b890',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6), inset 0 -1px 2px rgba(255,255,255,0.05)',
            transition: 'background 0.06s ease, color 0.06s ease',
            letterSpacing: extraWide ? '2px' : 'normal',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  )
}