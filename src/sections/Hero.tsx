import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ScrambleIn from '../components/ScrambleIn'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4'

const SCRUB_SENSITIVITY = 0.8

interface HeroProps {
  entranceComplete: boolean
}

export default function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const lastXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoaded = () => {
      video.pause()
      video.currentTime = 0
      setReady(true)
    }
    video.addEventListener('loadedmetadata', handleLoaded)
    return () => video.removeEventListener('loadedmetadata', handleLoaded)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleSeeked = () => {
      seekingRef.current = false
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
        seekingRef.current = true
        video.currentTime = targetTimeRef.current
      }
    }
    video.addEventListener('seeked', handleSeeked)
    return () => video.removeEventListener('seeked', handleSeeked)
  }, [])

  useEffect(() => {
    if (!ready) return

    const handleMouseMove = (e: MouseEvent) => {
      const video = videoRef.current
      if (!video || !video.duration) return

      if (lastXRef.current === null) {
        lastXRef.current = e.clientX
        return
      }

      const deltaX = e.clientX - lastXRef.current
      lastXRef.current = e.clientX

      const deltaTime = (deltaX / window.innerWidth) * video.duration * SCRUB_SENSITIVITY
      let nextTime = targetTimeRef.current + deltaTime
      nextTime = Math.max(0, Math.min(video.duration, nextTime))
      targetTimeRef.current = nextTime

      if (!seekingRef.current) {
        seekingRef.current = true
        video.currentTime = nextTime
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [ready])

  return (
    <section className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 flex justify-center select-none"
        style={{ transform: 'translateY(calc(-50% + 50px))' }}
      >
        <span
          className="uppercase"
          style={{
            fontFamily: '"Anton SC", sans-serif',
            fontSize: 'clamp(120px, 30vw, 521px)',
            letterSpacing: '-4px',
            lineHeight: 1,
            opacity: 0.1,
            backgroundImage:
              'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          REZULTATE
        </span>
      </div>

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1" />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
              <ScrambleIn text="Clienți" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Cu AI" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
              initial={{ y: 25, opacity: 0 }}
              animate={
                entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }
              }
              transition={{
                duration: 0.9,
                ease: [0.215, 0.61, 0.355, 1.0],
                delay: 0.2,
              }}
            >
              Construiesc soluții AI care găsesc clienți, generează site-uri și
              automatizează procese pentru afaceri locale și profesioniști. De
              la prima idee până la primul client, totul e susținut de
              inteligență artificială.
            </motion.p>
          </div>

          <h1 className="text-left text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white md:text-right">
            <ScrambleIn text="Site-uri" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Automate" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>
    </section>
  )
}
