import { useEffect, useRef, useState } from 'react'

const CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><'

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface ScrambleInProps {
  text: string
  delay: number
  triggered: boolean
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [started, setStarted] = useState(false)
  const [display, setDisplay] = useState('')
  const cursorRef = useRef(0)

  useEffect(() => {
    if (!triggered) return
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [triggered, delay])

  useEffect(() => {
    if (!started) return

    const interval = setInterval(() => {
      cursorRef.current += 0.5
      const cursor = cursorRef.current

      let next = ''
      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        if (char === ' ') {
          next += ' '
        } else if (i < cursor) {
          next += char
        } else if (i < cursor + 3) {
          next += randomChar()
        } else {
          next += ''
        }
      }
      setDisplay(next)

      if (cursor >= text.length) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [started, text])

  if (!triggered) return <>&nbsp;</>

  return <>{display || ' '}</>
}
