import { motion } from 'framer-motion'

interface SquashHamburgerProps {
  isOpen: boolean
  mobile?: boolean
}

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 20 }

export default function SquashHamburger({ isOpen, mobile }: SquashHamburgerProps) {
  const size = mobile ? 15 : 18
  const height = mobile ? 15 : 18
  const barHeight = mobile ? 1.2 : 1.5

  return (
    <div className="relative" style={{ width: size, height }}>
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full"
        style={{ height: barHeight, top: 0 }}
        animate={
          isOpen
            ? { rotate: 45, y: height / 2 - barHeight / 2 }
            : { rotate: 0, y: 0 }
        }
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full"
        style={{ height: barHeight, top: height / 2 - barHeight / 2 }}
        animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
        transition={SPRING}
      />
      <motion.span
        className="absolute left-0 right-0 bg-white rounded-full"
        style={{ height: barHeight, bottom: 0 }}
        animate={
          isOpen
            ? { rotate: -45, y: -(height / 2 - barHeight / 2) }
            : { rotate: 0, y: 0 }
        }
        transition={SPRING}
      />
    </div>
  )
}
