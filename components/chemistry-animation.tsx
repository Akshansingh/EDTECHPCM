"use client"

import { useEffect, useRef } from "react"

interface ChemistryAnimationProps {
  className?: string
}

export function ChemistryAnimation({ className = "" }: ChemistryAnimationProps) {
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

    // Molecule system
    interface Atom {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      type: string
    }

    interface Bond {
      atom1: number
      atom2: number
      strength: number
      length: number
      color: string
    }

    interface Molecule {
      atoms: Atom[]
      bonds: Bond[]
      x: number
      y: number
      rotation: number
      rotationSpeed: number
      vx: number
      vy: number
    }

    const molecules: Molecule[] = []
    const moleculeCount = Math.floor((width * height) / 50000) + 3

    // Create molecules
    for (let i = 0; i < moleculeCount; i++) {
      createMolecule()
    }

    function createMolecule() {
      const isDarkMode = document.documentElement.classList.contains("dark")
      const moleculeType = Math.floor(Math.random() * 3)
      const molecule: Molecule = {
        atoms: [],
        bonds: [],
        x: Math.random() * width,
        y: Math.random() * height,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }

      // Create different molecule structures
      if (moleculeType === 0) {
        // Water-like (H2O)
        const oxygenColor = isDarkMode ? "rgba(147, 51, 234, 0.8)" : "rgba(124, 58, 237, 0.8)"
        const hydrogenColor = isDarkMode ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.8)"

        molecule.atoms.push(
          { x: 0, y: 0, radius: 8, color: oxygenColor, vx: 0, vy: 0, type: "O" },
          { x: -12, y: -8, radius: 5, color: hydrogenColor, vx: 0, vy: 0, type: "H" },
          { x: 12, y: -8, radius: 5, color: hydrogenColor, vx: 0, vy: 0, type: "H" },
        )

        molecule.bonds.push(
          {
            atom1: 0,
            atom2: 1,
            strength: 1,
            length: 15,
            color: isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)",
          },
          {
            atom1: 0,
            atom2: 2,
            strength: 1,
            length: 15,
            color: isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)",
          },
        )
      } else if (moleculeType === 1) {
        // Carbon dioxide-like (CO2)
        const carbonColor = isDarkMode ? "rgba(75, 85, 99, 0.8)" : "rgba(55, 65, 81, 0.8)"
        const oxygenColor = isDarkMode ? "rgba(239, 68, 68, 0.8)" : "rgba(220, 38, 38, 0.8)"

        molecule.atoms.push(
          { x: 0, y: 0, radius: 7, color: carbonColor, vx: 0, vy: 0, type: "C" },
          { x: -18, y: 0, radius: 8, color: oxygenColor, vx: 0, vy: 0, type: "O" },
          { x: 18, y: 0, radius: 8, color: oxygenColor, vx: 0, vy: 0, type: "O" },
        )

        molecule.bonds.push(
          {
            atom1: 0,
            atom2: 1,
            strength: 2,
            length: 18,
            color: isDarkMode ? "rgba(252, 165, 165, 0.6)" : "rgba(239, 68, 68, 0.6)",
          },
          {
            atom1: 0,
            atom2: 2,
            strength: 2,
            length: 18,
            color: isDarkMode ? "rgba(252, 165, 165, 0.6)" : "rgba(239, 68, 68, 0.6)",
          },
        )
      } else {
        // Methane-like (CH4)
        const carbonColor = isDarkMode ? "rgba(75, 85, 99, 0.8)" : "rgba(55, 65, 81, 0.8)"
        const hydrogenColor = isDarkMode ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.8)"

        molecule.atoms.push(
          { x: 0, y: 0, radius: 7, color: carbonColor, vx: 0, vy: 0, type: "C" },
          { x: -12, y: -12, radius: 5, color: hydrogenColor, vx: 0, vy: 0, type: "H" },
          { x: 12, y: -12, radius: 5, color: hydrogenColor, vx: 0, vy: 0, type: "H" },
          { x: -12, y: 12, radius: 5, color: hydrogenColor, vx: 0, vy: 0, type: "H" },
          { x: 12, y: 12, radius: 5, color: hydrogenColor, vx: 0, vy: 0, type: "H" },
        )

        molecule.bonds.push(
          {
            atom1: 0,
            atom2: 1,
            strength: 1,
            length: 17,
            color: isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)",
          },
          {
            atom1: 0,
            atom2: 2,
            strength: 1,
            length: 17,
            color: isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)",
          },
          {
            atom1: 0,
            atom2: 3,
            strength: 1,
            length: 17,
            color: isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)",
          },
          {
            atom1: 0,
            atom2: 4,
            strength: 1,
            length: 17,
            color: isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)",
          },
        )
      }

      molecules.push(molecule)
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw background gradient
      const isDarkMode = document.documentElement.classList.contains("dark")
      const gradient = ctx.createLinearGradient(0, 0, width, height)

      if (isDarkMode) {
        gradient.addColorStop(0, "rgba(124, 58, 237, 0.5)")
        gradient.addColorStop(0.5, "rgba(91, 33, 182, 0.3)")
        gradient.addColorStop(1, "rgba(139, 92, 246, 0.4)")
      } else {
        gradient.addColorStop(0, "rgba(245, 208, 254, 0.7)")
        gradient.addColorStop(0.5, "rgba(216, 180, 254, 0.5)")
        gradient.addColorStop(1, "rgba(192, 132, 252, 0.4)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Update and draw molecules
      molecules.forEach((molecule) => {
        // Update position
        molecule.x += molecule.vx
        molecule.y += molecule.vy
        molecule.rotation += molecule.rotationSpeed

        // Boundary check
        if (molecule.x < 0 || molecule.x > width) molecule.vx *= -1
        if (molecule.y < 0 || molecule.y > height) molecule.vy *= -1

        // Draw bonds
        molecule.bonds.forEach((bond) => {
          const atom1 = molecule.atoms[bond.atom1]
          const atom2 = molecule.atoms[bond.atom2]

          // Calculate rotated positions
          const x1 = atom1.x * Math.cos(molecule.rotation) - atom1.y * Math.sin(molecule.rotation) + molecule.x
          const y1 = atom1.x * Math.sin(molecule.rotation) + atom1.y * Math.cos(molecule.rotation) + molecule.y
          const x2 = atom2.x * Math.cos(molecule.rotation) - atom2.y * Math.sin(molecule.rotation) + molecule.x
          const y2 = atom2.x * Math.sin(molecule.rotation) + atom2.y * Math.cos(molecule.rotation) + molecule.y

          // Draw bond
          ctx.beginPath()
          ctx.moveTo(x1, y1)
          ctx.lineTo(x2, y2)
          ctx.strokeStyle = bond.color
          ctx.lineWidth = bond.strength * 2
          ctx.stroke()

          // Draw double bond if needed
          if (bond.strength === 2) {
            const angle = Math.atan2(y2 - y1, x2 - x1)
            const perpX = Math.cos(angle + Math.PI / 2) * 3
            const perpY = Math.sin(angle + Math.PI / 2) * 3

            ctx.beginPath()
            ctx.moveTo(x1 + perpX, y1 + perpY)
            ctx.lineTo(x2 + perpX, y2 + perpY)
            ctx.moveTo(x1 - perpX, y1 - perpY)
            ctx.lineTo(x2 - perpX, y2 - perpY)
            ctx.strokeStyle = bond.color
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

        // Draw atoms
        molecule.atoms.forEach((atom) => {
          // Calculate rotated position
          const x = atom.x * Math.cos(molecule.rotation) - atom.y * Math.sin(molecule.rotation) + molecule.x
          const y = atom.x * Math.sin(molecule.rotation) + atom.y * Math.cos(molecule.rotation) + molecule.y

          // Draw atom
          ctx.beginPath()
          ctx.arc(x, y, atom.radius, 0, Math.PI * 2)
          ctx.fillStyle = atom.color
          ctx.fill()

          // Draw atom label
          ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)"
          ctx.font = `${atom.radius * 1.2}px Arial`
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(atom.type, x, y)
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleThemeChange = () => {
      // Update molecule colors when theme changes
      const isDarkMode = document.documentElement.classList.contains("dark")

      molecules.forEach((molecule) => {
        molecule.atoms.forEach((atom) => {
          if (atom.type === "O") {
            atom.color = isDarkMode ? "rgba(147, 51, 234, 0.8)" : "rgba(124, 58, 237, 0.8)"
          } else if (atom.type === "H") {
            atom.color = isDarkMode ? "rgba(96, 165, 250, 0.8)" : "rgba(59, 130, 246, 0.8)"
          } else if (atom.type === "C") {
            atom.color = isDarkMode ? "rgba(75, 85, 99, 0.8)" : "rgba(55, 65, 81, 0.8)"
          }
        })

        molecule.bonds.forEach((bond) => {
          if (bond.color.includes("147, 197, 253") || bond.color.includes("59, 130, 246")) {
            bond.color = isDarkMode ? "rgba(147, 197, 253, 0.6)" : "rgba(59, 130, 246, 0.6)"
          } else if (bond.color.includes("252, 165, 165") || bond.color.includes("239, 68, 68")) {
            bond.color = isDarkMode ? "rgba(252, 165, 165, 0.6)" : "rgba(239, 68, 68, 0.6)"
          }
        })
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
