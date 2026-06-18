import { useRef, useEffect, useState, useMemo, memo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { type SkillNode } from "../../lib/honeycomb"
import { getLogoTexture } from "../../lib/logo-texture"

interface SkillSphereProps {
  node: SkillNode
  selected: boolean
  dimmed: boolean
  onSelect: (node: SkillNode) => void
  onHover: (node: SkillNode | null) => void
}

export const SkillSphere = memo(({ node, selected, dimmed, onSelect, onHover }: SkillSphereProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [hovered, setHovered] = useState(false)

  // Idle rotation seed
  const spin = useMemo(() => 0.05 + Math.random() * 0.06, [])
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useEffect(() => {
    let active = true
    getLogoTexture(node.skill.slug, node.skill.variant ?? "default", node.skill.color).then((t) => {
      if (active) setTexture(t)
    })
    return () => {
      active = false
    }
  }, [node.skill.slug, node.skill.variant, node.skill.color])

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    
    // Idle rotation
    mesh.rotation.y += delta * 0.1
    mesh.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + phase) * 0.05
    
    // Scale interaction
    const targetScale = selected ? 1.2 : hovered ? 1.1 : 1
    mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, targetScale, 0.1))
  })

  useEffect(() => {
    if (matRef.current && texture) {
      matRef.current.map = texture
      matRef.current.color.set("#ffffff")
      matRef.current.needsUpdate = true
    }
  }, [texture])

  return (
    <mesh
      ref={meshRef}
      position={[node.bx, node.by, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect(node) }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); onHover(node); document.body.style.cursor = "pointer" }}
      onPointerOut={() => { setHovered(false); onHover(null); document.body.style.cursor = "grab" }}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        ref={matRef}
        color={node.skill.color}
        roughness={0.4}
        metalness={0.1}
        transparent
        opacity={selected ? 1 : dimmed ? 0.2 : 0.6}
        emissive={node.skill.color}
        emissiveIntensity={selected ? 0.2 : 0}
      />
    </mesh>
  )
})
