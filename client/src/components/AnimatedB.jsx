

import { useEffect, useRef } from "react"

export default function AnimatedWaveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // Set canvas dimensions
    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Wave parameters
    const waves = [
      {
        amplitude: 50,
        frequency: 0.005,
        speed: 0.05,
        color: "rgba(138, 43, 226, 0.2)",
        offset: 0,
      },
      {
        amplitude: 70,
        frequency: 0.008,
        speed: 0.07,
        color: "rgba(102, 51, 153, 0.15)",
        offset: 2,
      },
      {
        amplitude: 40,
        frequency: 0.01,
        speed: 0.03,
        color: "rgba(75, 0, 130, 0.1)",
        offset: 4,
      },
    ]

    // Floating objects
    const floatingObjects = []
    const objectCount = 15

    for (let i = 0; i < objectCount; i++) {
      floatingObjects.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
      })
    }

    // Animation loop
    let animationFrame
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, width, height)

      // Create a dark background with radial gradient
      const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width)
      gradient.addColorStop(0, "#13001A")
      gradient.addColorStop(1, "#000000")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw floating geometric shapes
      floatingObjects.forEach((obj) => {
        ctx.save()
        ctx.translate(obj.x, obj.y)
        ctx.rotate(obj.rotation)
        ctx.globalAlpha = obj.opacity

        // Draw a polygon
        const sides = Math.floor(Math.random() * 3) + 3 // 3 to 5 sides
        ctx.beginPath()
        ctx.fillStyle = `rgba(138, 43, 226, ${obj.opacity})`

        for (let i = 0; i < sides; i++) {
          const angle = (Math.PI * 2 * i) / sides
          const x = Math.cos(angle) * obj.size
          const y = Math.sin(angle) * obj.size

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.fill()

        // Update position and rotation
        obj.x += obj.speedX
        obj.y += obj.speedY
        obj.rotation += obj.rotationSpeed

        // Bounce off edges
        if (obj.x < -obj.size) obj.x = width + obj.size
        if (obj.x > width + obj.size) obj.x = -obj.size
        if (obj.y < -obj.size) obj.y = height + obj.size
        if (obj.y > height + obj.size) obj.y = -obj.size

        ctx.restore()
      })

      // Draw waves
      waves.forEach((wave) => {
        wave.offset += wave.speed

        ctx.beginPath()
        ctx.moveTo(0, height / 2)

        for (let x = 0; x < width; x += 5) {
          const y = Math.sin(x * wave.frequency + wave.offset) * wave.amplitude + height / 2
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        ctx.fillStyle = wave.color
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ pointerEvents: "none" }} />
}
