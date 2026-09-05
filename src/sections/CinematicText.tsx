import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4'

export default function CinematicText() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  })

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120])
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1])
  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`

  return (
    <section
      ref={sectionRef}
      className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black"
    >
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10"
        style={{
          height: 180,
          background: 'linear-gradient(to bottom, #010103, transparent)',
        }}
      />

      <div
        className="relative z-10 flex h-full items-center justify-center"
        style={{ perspective: 400 }}
      >
        <motion.p
          className="max-w-5xl select-none px-6 text-center font-sans text-[22px] font-normal leading-[1.35] tracking-[-0.02em] text-white sm:px-12 sm:text-[30px] md:text-[36px] lg:text-[42px]"
          style={{ transform, opacity }}
        >
          O agenție AI construită pe încredere și rezultate măsurabile.
          Transform procese, date și idei în clienți reali. Fiecare
          interacțiune devine măsurabilă, structurată și vizibilă.
          Reconstruiesc continuu strategia de creștere ca pe o hartă vie a
          afacerii tale. Zgomotul devine semnal: date acționabile, decizii
          mai bune.
        </motion.p>
      </div>
    </section>
  )
}
