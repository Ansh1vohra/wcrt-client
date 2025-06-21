'use client'
import { useEffect, useRef } from 'react'

interface SafeHTMLProps {
  html: string
  className?: string
}

const SafeHTML = ({ html, className }: SafeHTMLProps) => {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (divRef.current) {
      // Sanitize content if needed (recommended)
      divRef.current.innerHTML = html
    }
  }, [html])

  return <div ref={divRef} className={className} />
}

export default SafeHTML;