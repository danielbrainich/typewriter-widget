import { useRef, useCallback } from 'react'

export function useTypewriterSound() {
  const audioCtxRef = useRef(null)

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    return audioCtxRef.current
  }

  const playClack = useCallback(() => {
    try {
      const ctx = getCtx()
      const bufferSize = ctx.sampleRate * 0.04
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 6)
      }
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 2200 + Math.random() * 600
      filter.Q.value = 0.8
      const gain = ctx.createGain()
      gain.gain.value = 0.55 + Math.random() * 0.25
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start()
    } catch (e) {}
  }, [])

  const playReturn = useCallback(() => {
    try {
      const ctx = getCtx()
      const bufferSize = ctx.sampleRate * 0.12
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3) * 0.6
      }
      const source = ctx.createBufferSource()
      source.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 800
      const gain = ctx.createGain()
      gain.gain.value = 0.7
      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start()
    } catch (e) {}
  }, [])

  return { playClack, playReturn }
}