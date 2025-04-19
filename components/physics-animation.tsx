"use client"

import { useEffect, useRef } from "react"

interface PhysicsAnimationProps {
  className?: string
}

export function PhysicsAnimation({ className = "" }: PhysicsAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width: number
    let height: number

    // Set canvas dimensions
    const updateDimensions = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    // Initialize
    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    // Particle system
    const particles: Particle[] = []
    const particleCount = Math.floor((width * height) / 8000)

    interface Particle {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      mass: number
      charge: number
      connections: number[]
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const isDarkMode = document.documentElement.classList.contains("dark")
      const radius = Math.random() * 3 + 2
      const charge = Math.random() > 0.5 ? 1 : -1

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: radius,
        color:
          charge > 0
            ? isDarkMode
              ? "rgba(96, 165, 250, 0.8)"
              : "rgba(37, 99, 235, 0.8)"
            : isDarkMode
              ? "rgba(239, 68, 68, 0.8)"
              : "rgba(220, 38, 38, 0.8)",
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        mass: radius * 2,
        charge: charge,
        connections: [],
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw background gradient
      const isDarkMode = document.documentElement.classList.contains("dark")
      const gradient = ctx.createLinearGradient(0, 0, width, height)

      if (isDarkMode) {
        gradient.addColorStop(0, "rgba(37, 99, 235, 0.5)")
        gradient.addColorStop(0.5, "rgba(30, 58, 138, 0.3)")
        gradient.addColorStop(1, "rgba(59, 130, 246, 0.4)")
      } else {
        gradient.addColorStop(0, "rgba(219, 234, 254, 0.8)")
        gradient.addColorStop(0.5, "rgba(147, 197, 253, 0.5)")
        gradient.addColorStop(1, "rgba(191, 219, 254, 0.6)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply forces between particles (simplified electromagnetic interaction)
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue

          const p2 = particles[j]
          const dx = p2.x - p.x
          const dy = p2.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            // Draw connection line
            const opacity = (1 - distance / 150) * 0.2
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = isDarkMode ? `rgba(147, 197, 253, ${opacity})` : `rgba(59, 130, 246, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()

            // Apply force
            if (distance > p.radius + p2.radius) {
              const force = ((p.charge * p2.charge) / (distance * distance)) * 0.2
              const angle = Math.atan2(dy, dx)
              p.vx += (Math.cos(angle) * force) / p.mass
              p.vy += (Math.sin(angle) * force) / p.mass
            }
          }
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Boundary check
        if (p.x < p.radius) {
          p.x = p.radius
          p.vx *= -0.8
        } else if (p.x > width - p.radius) {
          p.x = width - p.radius
          p.vx *= -0.8
        }

        if (p.y < p.radius) {
          p.y = p.radius
          p.vy *= -0.8
        } else if (p.y > height - p.radius) {
          p.y = height - p.radius
          p.vy *= -0.8
        }

        // Apply friction
        p.vx *= 0.99
        p.vy *= 0.99

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleThemeChange = () => {
      // Update particle colors when theme changes
      particles.forEach((p) => {
        const isDarkMode = document.documentElement.classList.contains("dark")
        p.color =
          p.charge > 0
            ? isDarkMode
              ? "rgba(96, 165, 250, 0.8)"
              : "rgba(37, 99, 235, 0.8)"
            : isDarkMode
              ? "rgba(239, 68, 68, 0.8)"
              : "rgba(220, 38, 38, 0.8)"
      })
    }

    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("themeChange", handleThemeChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  )
}
