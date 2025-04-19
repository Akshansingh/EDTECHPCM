"use client"

import { useEffect, useRef } from "react"

interface MathAnimationProps {
  className?: string
}

export function MathAnimation({ className = "" }: MathAnimationProps) {
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

    // Math shapes
    interface Shape {
      type: "circle" | "square" | "triangle" | "sine" | "fibonacci" | "grid"
      x: number
      y: number
      size: number
      color: string
      rotation: number
      rotationSpeed: number
      opacity: number
      vx: number
      vy: number
    }

    const shapes: Shape[] = []
    const shapeCount = Math.floor((width * height) / 40000) + 5

    // Create shapes
    for (let i = 0; i < shapeCount; i++) {
      createShape()
    }

    function createShape() {
      const isDarkMode = document.documentElement.classList.contains("dark")
      const shapeTypes = ["circle", "square", "triangle", "sine", "fibonacci", "grid"] as const
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)]

      // Generate a color from a math-themed palette
      const colors = isDarkMode
        ? [
            "rgba(96, 165, 250, 0.7)", // blue
            "rgba(129, 140, 248, 0.7)", // indigo
            "rgba(167, 139, 250, 0.7)", // purple
            "rgba(236, 72, 153, 0.7)", // pink
            "rgba(52, 211, 153, 0.7)", // emerald
          ]
        : [
            "rgba(59, 130, 246, 0.7)", // blue
            "rgba(79, 70, 229, 0.7)", // indigo
            "rgba(124, 58, 237, 0.7)", // purple
            "rgba(219, 39, 119, 0.7)", // pink
            "rgba(16, 185, 129, 0.7)", // emerald
          ]

      const shape: Shape = {
        type: shapeType,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 30 + 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        opacity: Math.random() * 0.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }

      shapes.push(shape)
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw background gradient
      const isDarkMode = document.documentElement.classList.contains("dark")
      const gradient = ctx.createLinearGradient(0, 0, width, height)

      if (isDarkMode) {
        gradient.addColorStop(0, "rgba(79, 70, 229, 0.5)")
        gradient.addColorStop(0.5, "rgba(67, 56, 202, 0.3)")
        gradient.addColorStop(1, "rgba(99, 102, 241, 0.4)")
      } else {
        gradient.addColorStop(0, "rgba(224, 231, 255, 0.8)")
        gradient.addColorStop(0.5, "rgba(199, 210, 254, 0.5)")
        gradient.addColorStop(1, "rgba(165, 180, 252, 0.6)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw grid lines
      ctx.strokeStyle = isDarkMode ? "rgba(147, 197, 253, 0.1)" : "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      // Vertical grid lines
      for (let x = 0; x < width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let y = 0; y < height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Update and draw shapes
      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        // Boundary check
        if (shape.x < -shape.size) shape.x = width + shape.size
        if (shape.x > width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = height + shape.size
        if (shape.y > height + shape.size) shape.y = -shape.size

        // Save context
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.globalAlpha = shape.opacity

        // Draw shape based on type
        ctx.fillStyle = shape.color
        ctx.strokeStyle = shape.color
        ctx.lineWidth = 2

        switch (shape.type) {
          case "circle":
            ctx.beginPath()
            ctx.arc(0, 0, shape.size, 0, Math.PI * 2)
            ctx.fill()

            // Draw diameter lines
            ctx.beginPath()
            ctx.moveTo(-shape.size, 0)
            ctx.lineTo(shape.size, 0)
            ctx.moveTo(0, -shape.size)
            ctx.lineTo(0, shape.size)
            ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            ctx.stroke()
            break

          case "square":
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)

            // Draw diagonal lines
            ctx.beginPath()
            ctx.moveTo(-shape.size / 2, -shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.moveTo(shape.size / 2, -shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            ctx.stroke()
            break

          case "triangle":
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.fill()

            // Draw height line
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(0, shape.size / 2)
            ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            ctx.stroke()
            break

          case "sine":
            // Draw sine wave
            ctx.beginPath()
            for (let i = -shape.size; i <= shape.size; i++) {
              const x = i
              const y = (Math.sin(i * 0.2) * shape.size) / 3
              if (i === -shape.size) {
                ctx.moveTo(x, y)
              } else {
                ctx.lineTo(x, y)
              }
            }
            ctx.stroke()

            // Draw x-axis
            ctx.beginPath()
            ctx.moveTo(-shape.size, 0)
            ctx.lineTo(shape.size, 0)
            ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            ctx.stroke()
            break

          case "fibonacci":
            // Draw fibonacci spiral
            let a = 0
            let b = 1
            let temp
            const scale = shape.size / 20

            ctx.beginPath()
            ctx.moveTo(0, 0)

            for (let i = 0; i < 10; i++) {
              temp = a
              a = b
              b = temp + b

              // Draw arc for fibonacci spiral
              ctx.arc(0, 0, Math.sqrt(b) * scale, 0, Math.PI / 2)
              ctx.translate(Math.sqrt(b) * scale, 0)
              ctx.rotate(Math.PI / 2)
            }
            ctx.stroke()
            break

          case "grid":
            // Draw coordinate grid
            const gridSize = shape.size / 2

            // Draw grid lines
            ctx.beginPath()
            for (let i = -gridSize; i <= gridSize; i += gridSize / 2) {
              ctx.moveTo(-gridSize, i)
              ctx.lineTo(gridSize, i)
              ctx.moveTo(i, -gridSize)
              ctx.lineTo(i, gridSize)
            }
            ctx.stroke()

            // Draw axes
            ctx.beginPath()
            ctx.moveTo(-gridSize, 0)
            ctx.lineTo(gridSize, 0)
            ctx.moveTo(0, -gridSize)
            ctx.lineTo(0, gridSize)
            ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"
            ctx.lineWidth = 2
            ctx.stroke()

            // Draw point at origin
            ctx.beginPath()
            ctx.arc(0, 0, 3, 0, Math.PI * 2)
            ctx.fill()
            break
        }

        // Restore context
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleThemeChange = () => {
      // Update shape colors when theme changes
      const isDarkMode = document.documentElement.classList.contains("dark")

      shapes.forEach((shape) => {
        // Convert existing color to dark/light equivalent
        if (shape.color.includes("96, 165, 250") || shape.color.includes("59, 130, 246")) {
          shape.color = isDarkMode ? "rgba(96, 165, 250, 0.7)" : "rgba(59, 130, 246, 0.7)"
        } else if (shape.color.includes("129, 140, 248") || shape.color.includes("79, 70, 229")) {
          shape.color = isDarkMode ? "rgba(129, 140, 248, 0.7)" : "rgba(79, 70, 229, 0.7)"
        } else if (shape.color.includes("167, 139, 250") || shape.color.includes("124, 58, 237")) {
          shape.color = isDarkMode ? "rgba(167, 139, 250, 0.7)" : "rgba(124, 58, 237, 0.7)"
        } else if (shape.color.includes("236, 72, 153") || shape.color.includes("219, 39, 119")) {
          shape.color = isDarkMode ? "rgba(236, 72, 153, 0.7)" : "rgba(219, 39, 119, 0.7)"
        } else if (shape.color.includes("52, 211, 153") || shape.color.includes("16, 185, 129")) {
          shape.color = isDarkMode ? "rgba(52, 211, 153, 0.7)" : "rgba(16, 185, 129, 0.7)"
        }
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
