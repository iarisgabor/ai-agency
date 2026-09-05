import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import SquashHamburger from './SquashHamburger'
import ScrambleText from './ScrambleText'

const CONTACT_EMAIL = 'iaris.gabor28@gmail.com'

interface NavbarProps {
  entranceComplete: boolean
}

function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: 'smooth' })
}

export default function Navbar({ entranceComplete }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [downloadHovered, setDownloadHovered] = useState(false)

  const goToDespre = () => {
    scrollToY(window.innerHeight)
    setIsOpen(false)
  }
  const goToRezultate = () => {
    scrollToY(window.innerHeight * 2)
    setIsOpen(false)
  }

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-50 h-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop */}
      <div className="mx-auto hidden h-full max-w-7xl items-center justify-between px-8 sm:flex">
        <div className="flex items-center gap-2">
          <motion.div
            className={`${isOpen ? 'hidden md:flex' : 'flex'} h-12 items-center gap-2 rounded-[14px] bg-white/15 px-5 backdrop-blur-md`}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Logo className="h-[18px] w-[18px] text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">
              Iaris Gabor
            </span>
          </motion.div>

          <motion.div
            className="flex h-12 items-center overflow-hidden rounded-[14px] bg-white/15 backdrop-blur-md"
            animate={{ width: isOpen ? 290 : 48 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          >
            <button
              onClick={() => setIsOpen((v) => !v)}
              className={`flex shrink-0 items-center justify-center transition-colors ${
                isOpen
                  ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-white/10 hover:bg-white/20'
                  : 'h-12 w-12 rounded-[14px]'
              }`}
              aria-label="Meniu"
            >
              <SquashHamburger isOpen={isOpen} />
            </button>

            <motion.div
              className="flex items-center gap-6 pl-4 pr-6 whitespace-nowrap"
              initial={{ x: 15, opacity: 0 }}
              animate={isOpen ? { x: 0, opacity: 1 } : { x: 15, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={goToDespre}
                onMouseEnter={() => setHoveredLink('despre')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[16px] font-normal text-white/85 hover:text-white"
              >
                <ScrambleText text="Despre" isHovered={hoveredLink === 'despre'} />
              </button>
              <button
                onClick={goToRezultate}
                onMouseEnter={() => setHoveredLink('rezultate')}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[16px] font-normal text-white/85 hover:text-white"
              >
                <ScrambleText
                  text="Rezultate"
                  isHovered={hoveredLink === 'rezultate'}
                />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-black"
          onMouseEnter={() => setDownloadHovered(true)}
          onMouseLeave={() => setDownloadHovered(false)}
          whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
          whileTap={{ scale: 0.97 }}
        >
          <i className="bi bi-envelope text-[16px]" />
          <ScrambleText text="Contact" isHovered={downloadHovered} />
        </motion.a>
      </div>

      {/* Mobile */}
      <div className="flex h-full items-center justify-between gap-2 px-4 sm:hidden">
        <motion.div
          className="flex h-9 items-center gap-1.5 overflow-hidden rounded-[10px] bg-white/15 px-3.5 backdrop-blur-md"
          animate={{ width: isOpen ? 0 : 'auto', paddingLeft: isOpen ? 0 : 14, paddingRight: isOpen ? 0 : 14, opacity: isOpen ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <Logo className="h-[14px] w-[14px] shrink-0 text-white" />
          <span className="text-[13px] font-medium tracking-tight whitespace-nowrap text-white">
            Iaris Gabor
          </span>
        </motion.div>

        <motion.div
          className="flex h-9 items-center overflow-hidden rounded-[10px] bg-white/15 backdrop-blur-md"
          animate={{ width: isOpen ? '100%' : 36 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        >
          <button
            onClick={() => setIsOpen((v) => !v)}
            className={`flex shrink-0 items-center justify-center transition-colors ${
              isOpen
                ? 'ml-1 h-7 w-7 rounded-[8px] bg-white/10 hover:bg-white/20'
                : 'h-9 w-9 rounded-[10px]'
            }`}
            aria-label="Meniu"
          >
            <SquashHamburger isOpen={isOpen} mobile />
          </button>

          <motion.div
            className="flex items-center gap-4 pl-3 whitespace-nowrap"
            initial={{ x: 15, opacity: 0 }}
            animate={isOpen ? { x: 0, opacity: 1 } : { x: 15, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={goToDespre}
              className="text-[13px] font-normal text-white/85"
            >
              Despre
            </button>
            <button
              onClick={goToRezultate}
              className="text-[13px] font-normal text-white/85"
            >
              Rezultate
            </button>
          </motion.div>
        </motion.div>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 text-black"
        >
          <i className="bi bi-envelope text-[13px]" />
          <span className="text-[13px]">Contact</span>
        </a>
      </div>
    </motion.nav>
  )
}
