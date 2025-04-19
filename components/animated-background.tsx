"use client"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  className?: string
  variant?: "waves" | "particles" | "gradient"
  color?: "blue" | "purple" | "multi"
}

export function AnimatedBackground({ className = "", variant = "waves", color = "blue" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Waves animation
  useEffect(() => {
    if (!canvasRef.current || variant !== "waves") return

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

    // Wave parameters
    const waves = [
      { y: height * 0.3, length: 100, amplitude: 20, frequency: 0.015, speed: 0.05, color: getWaveColor(0) },
      { y: height * 0.4, length: 150, amplitude: 15, frequency: 0.02, speed: 0.03, color: getWaveColor(1) },
      { y: height * 0.5, length: 200, amplitude: 10, frequency: 0.01, speed: 0.02, color: getWaveColor(2) },
    ]

    function getWaveColor(index: number): string {
      const isDarkMode = document.documentElement.classList.contains("dark")

      if (color === "blue") {
        const opacity = 0.1 - index * 0.02
        return isDarkMode ? `rgba(96, 165, 250, ${opacity})` : `rgba(59, 130, 246, ${opacity})`
      } else if (color === "purple") {
        const opacity = 0.1 - index * 0.02
        return isDarkMode ? `rgba(167, 139, 250, ${opacity})` : `rgba(124, 58, 237, ${opacity})`
      } else {
        // Multi-color
        const colors = isDarkMode
          ? [
              `rgba(96, 165, 250, ${0.1 - index * 0.02})`,
              `rgba(167, 139, 250, ${0.1 - index * 0.02})`,
              `rgba(129, 140, 248, ${0.1 - index * 0.02})`,
            ]
          : [
              `rgba(59, 130, 246, ${0.1 - index * 0.02})`,
              `rgba(124, 58, 237, ${0.1 - index * 0.02})`,
              `rgba(79, 70, 229, ${0.1 - index * 0.02})`,
            ]
        return colors[index % colors.length]
      }
    }

    let time = 0

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        for (let x = 0; x < width; x++) {
          const dx = x * wave.frequency
          const dy = Math.sin(dx + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, wave.y + dy)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      time += 0.05
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleThemeChange = () => {
      // Force redraw when theme changes
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animate()
      }
    }

    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("themeChange", handleThemeChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, color])

  // Particles animation
  useEffect(() => {
    if (!canvasRef.current || variant !== "particles") return

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

    // Particle parameters
    const particleCount = Math.floor((width * height) / 10000)
    const particles: Particle[] = []

    function getParticleColor(): string {
      const isDarkMode = document.documentElement.classList.contains("dark")

      if (color === "blue") {
        return isDarkMode
          ? `rgba(96, 165, 250, ${Math.random() * 0.3 + 0.1})`
          : `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})`
      } else if (color === "purple") {
        return isDarkMode
          ? `rgba(167, 139, 250, ${Math.random() * 0.3 + 0.1})`
          : `rgba(124, 58, 237, ${Math.random() * 0.2 + 0.1})`
      } else {
        // Multi-color
        const colors = isDarkMode
          ? [
              `rgba(96, 165, 250, ${Math.random() * 0.3 + 0.1})`,
              `rgba(167, 139, 250, ${Math.random() * 0.3 + 0.1})`,
              `rgba(129, 140, 248, ${Math.random() * 0.3 + 0.1})`,
            ]
          : [
              `rgba(59, 130, 246, ${Math.random() * 0.2 + 0.1})`,
              `rgba(124, 58, 237, ${Math.random() * 0.2 + 0.1})`,
              `rgba(79, 70, 229, ${Math.random() * 0.2 + 0.1})`,
            ]
        return colors[Math.floor(Math.random() * colors.length)]
      }
    }

    interface Particle {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        color: getParticleColor(),
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((particle) => {
        // Move particle
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > height) particle.speedY *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleThemeChange = () => {
      // Force redraw when theme changes
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animate()
      }
    }

    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("themeChange", handleThemeChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, color])

  // Gradient animation
  useEffect(() => {
    if (!canvasRef.current || variant !== "gradient") return

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

    // Gradient parameters
    let gradientAngle = 0
    const gradientSpeed = 0.001

    function createGradient() {
      const x1 = width / 2 + Math.cos(gradientAngle) * width
      const y1 = height / 2 + Math.sin(gradientAngle) * height
      const x2 = width / 2 + Math.cos(gradientAngle + Math.PI) * width
      const y2 = height / 2 + Math.sin(gradientAngle + Math.PI) * height

      const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
      const isDarkMode = document.documentElement.classList.contains("dark")

      if (color === "blue") {
        if (isDarkMode) {
          gradient.addColorStop(0, "rgba(96, 165, 250, 0.2)")
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.1)")
        } else {
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
          gradient.addColorStop(1, "rgba(37, 99, 235, 0.1)")
        }
      } else if (color === "purple") {
        if (isDarkMode) {
          gradient.addColorStop(0, "rgba(167, 139, 250, 0.2)")
          gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)")
        } else {
          gradient.addColorStop(0, "rgba(124, 58, 237, 0.2)")
          gradient.addColorStop(1, "rgba(109, 40, 217, 0.1)")
        }
      } else {
        // Multi-color
        if (isDarkMode) {
          gradient.addColorStop(0, "rgba(96, 165, 250, 0.2)")
          gradient.addColorStop(0.5, "rgba(167, 139, 250, 0.15)")
          gradient.addColorStop(1, "rgba(129, 140, 248, 0.1)")
        } else {
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
          gradient.addColorStop(0.5, "rgba(124, 58, 237, 0.15)")
          gradient.addColorStop(1, "rgba(79, 70, 229, 0.1)")
        }
      }

      return gradient
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      gradientAngle += gradientSpeed
      ctx.fillStyle = createGradient()
      ctx.fillRect(0, 0, width, height)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleThemeChange = () => {
      // Force redraw when theme changes
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
        animate()
      }
    }

    window.addEventListener("themeChange", handleThemeChange)

    return () => {
      window.removeEventListener("resize", updateDimensions)
      window.removeEventListener("themeChange", handleThemeChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "none" }}
    />
  )
}
