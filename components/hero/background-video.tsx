'use client'

import { useEffect, useRef } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4'

const FADE_DURATION = 0.5 // seconds

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let rafId: number
    let replayTimeout: ReturnType<typeof setTimeout>

    const updateOpacity = () => {
      const { currentTime, duration } = video
      if (!Number.isFinite(duration) || duration === 0) {
        rafId = requestAnimationFrame(updateOpacity)
        return
      }

      let opacity = 1
      if (currentTime < FADE_DURATION) {
        // Fade in over the first 0.5s
        opacity = currentTime / FADE_DURATION
      } else if (currentTime > duration - FADE_DURATION) {
        // Fade out over the last 0.5s
        opacity = Math.max(0, (duration - currentTime) / FADE_DURATION)
      }

      video.style.opacity = String(opacity)
      rafId = requestAnimationFrame(updateOpacity)
    }

    const handleEnded = () => {
      video.style.opacity = '0'
      replayTimeout = setTimeout(() => {
        video.currentTime = 0
        void video.play()
      }, 100)
    }

    const startLoop = () => {
      void video.play()
      rafId = requestAnimationFrame(updateOpacity)
    }

    video.addEventListener('ended', handleEnded)
    if (video.readyState >= 2) {
      startLoop()
    } else {
      video.addEventListener('loadeddata', startLoop, { once: true })
    }

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(replayTimeout)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('loadeddata', startLoop)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      style={{ opacity: 0 }}
      src={VIDEO_URL}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  )
}
