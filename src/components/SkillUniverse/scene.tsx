import { useRef, useMemo, useEffect, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, AdaptiveDpr } from "@react-three/drei"
import * as THREE from "three"
import { buildHoneycomb, type SkillNode } from "../../lib/honeycomb"
import { SkillSphere } from "./skill-sphere"

interface UniverseProps {
  selected: SkillNode | null
  onSelect: (node: SkillNode | null) => void
  onHover: (node: SkillNode | null) => void
}

function Universe({ selected, onSelect, onHover }: UniverseProps) {
  const nodes = useMemo(() => buildHoneycomb(2.4), [])
  const groupRef = useRef<THREE.Group>(null)
  
  // Pan and Zoom state
  const pan = useRef(new THREE.Vector2(0, 0))
  const panTarget = useRef(new THREE.Vector2(0, 0))
  const zoom = useRef(25)
  const zoomTarget = useRef(25)
  
  const { camera, gl } = useThree()
  
  // Custom interaction refs
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const lastDist = useRef(0)
  const moved = useRef(0)

  // Pan/Zoom handlers
  const handleMove = (dx: number, dy: number) => {
    const worldPerPixel = (zoom.current * 0.0016)
    panTarget.current.x = THREE.MathUtils.clamp(panTarget.current.x + dx * worldPerPixel, -25, 25)
    panTarget.current.y = THREE.MathUtils.clamp(panTarget.current.y - dy * worldPerPixel, -25, 25)
  }

  // Unified event handlers
  const onPointerDown = useCallback((e: any) => {
    dragging.current = true
    moved.current = 0
    if (e.touches && e.touches.length === 2) {
      lastDist.current = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
    } else {
      lastPos.current = { x: e.clientX || e.touches?.[0].clientX, y: e.clientY || e.touches?.[0].clientY }
    }
  }, [])

  const onPointerMove = useCallback((e: any) => {
    if (e.touches && e.touches.length === 2) {
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
        if (lastDist.current > 0) {
            const scale = lastDist.current / dist
            zoomTarget.current = THREE.MathUtils.clamp(zoomTarget.current * scale, 9, 38)
        }
        lastDist.current = dist
    } else if (dragging.current) {
        const clientX = e.clientX || e.touches?.[0].clientX
        const clientY = e.clientY || e.touches?.[0].clientY
        const dx = clientX - lastPos.current.x
        const dy = clientY - lastPos.current.y
        moved.current += Math.abs(dx) + Math.abs(dy)
        lastPos.current = { x: clientX, y: clientY }
        handleMove(dx, dy)
    }
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
    lastDist.current = 0
  }, [])

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    zoomTarget.current = THREE.MathUtils.clamp(zoomTarget.current + e.deltaY * 0.05, 9, 38)
  }, [])

  useEffect(() => {
    const el = gl.domElement
    el.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    el.addEventListener("touchstart", onPointerDown, { passive: false })
    el.addEventListener("touchmove", onPointerMove, { passive: false })
    el.addEventListener("touchend", onPointerUp)
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      el.removeEventListener("touchstart", onPointerDown)
      el.removeEventListener("touchmove", onPointerMove)
      el.removeEventListener("touchend", onPointerUp)
      el.removeEventListener("wheel", onWheel)
    }
  }, [gl, onPointerDown, onPointerMove, onPointerUp, onWheel])

  // Centering logic
  useEffect(() => {
    if (selected) {
      panTarget.current.set(-selected.bx, -selected.by)
    } else {
      panTarget.current.set(0, 0)
    }
  }, [selected])

  useFrame(() => {
    pan.current.lerp(panTarget.current, 0.08)
    zoom.current = THREE.MathUtils.lerp(zoom.current, zoomTarget.current, 0.05)

    if (groupRef.current) {
      groupRef.current.position.set(pan.current.x, pan.current.y, 0)
    }
    
    // Smooth camera Z transition: 7 if selected, otherwise current zoom
    const targetZ = selected ? 7 : zoom.current
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    camera.updateProjectionMatrix()
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node) => (
        <SkillSphere
          key={node.index}
          node={node}
          selected={selected?.index === node.index}
          dimmed={selected !== null && selected.index !== node.index}
          onSelect={(n) => { if (moved.current < 8) onSelect(n) }}
          onHover={onHover}
        />
      ))}
    </group>
  )
}

interface SceneProps {
  selected: SkillNode | null
  onSelect: (node: SkillNode | null) => void
  onHover: (node: SkillNode | null) => void
}

export function Scene({ selected, onSelect, onHover }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0, 28], fov: 42, near: 0.1, far: 100 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onPointerMissed={() => onSelect(null)}
      style={{ background: "#05060a", touchAction: 'none' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 9, 8]} intensity={1.3} castShadow />
      <directionalLight position={[-8, -4, 4]} intensity={0.5} />
      <Environment preset="city" environmentIntensity={0.55} />
      <Universe selected={selected} onSelect={onSelect} onHover={onHover} />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
