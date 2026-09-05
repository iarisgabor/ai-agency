import { useEffect, useRef, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface ScrambleTextProps {
  text: string
  isHovered: boolean
  className?: string
}

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text)
      return
    }

    frameRef.current = 0
    const interval = setInterval(() => {
      frameRef.current += 1
      const revealedChars = Math.floor(frameRef.current / 4)

      let next = ''
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        if (char === ' ') {
          next += ' '
        } else if (i < revealedChars) {
          next += char
        } else {
          next += randomChar()
        }
      }
      setDisplay(next)

      if (revealedChars >= text.length) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [isHovered, text])

  return <span className={className}>{display}</span>
}
