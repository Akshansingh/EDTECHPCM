import type { ReactNode } from "react"

interface FloatingAnimationProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FloatingAnimation({ children, delay = 0, duration = 3, className = "" }: FloatingAnimationProps) {
  return (
    <div
      className={`animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}
