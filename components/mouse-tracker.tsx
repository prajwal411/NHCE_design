"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsMoving(true)

      clearTimeout(timeout)
      timeout = setTimeout(() => setIsMoving(false), 100)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      {/* Main cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isMoving ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Secondary cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-secondary/40 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      />

      {/* Sparkle trail */}
      {isMoving && (
        <motion.div
          className="fixed top-0 left-0 w-1 h-1 bg-accent rounded-full pointer-events-none z-50"
          initial={{
            x: mousePosition.x,
            y: mousePosition.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 0.6,
          }}
        />
      )}
    </>
  )
}
