import { SKILLS, type Skill } from "../data/skills"

export interface SkillNode {
  skill: Skill
  /** base position on the flat honeycomb plane (world units, z = 0) */
  bx: number
  by: number
  /** radius derived from proficiency */
  radius: number
  index: number
}

/**
 * Dense hexagonal (honeycomb) packing using axial ring coordinates.
 * Ring 0 is the center; each subsequent ring wraps tightly around it,
 * producing the Apple Watch springboard look. The whole cluster is
 * recentered on its centroid so it sits in the middle of the screen.
 */
export function buildHoneycomb(spacing = 1.6): SkillNode[] {
  // Generate axial hex coordinates ring by ring (cube/axial spiral).
  const coords: Array<[number, number]> = [[0, 0]]
  const directions: Array<[number, number]> = [
    [1, 0],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [0, -1],
    [1, -1],
  ]

  let ring = 1
  while (coords.length < SKILLS.length) {
    // Start at the ring corner, then walk the 6 edges.
    let q = directions[4][0] * ring
    let r = directions[4][1] * ring
    for (let side = 0; side < 6; side++) {
      for (let step = 0; step < ring; step++) {
        coords.push([q, r])
        q += directions[side][0]
        r += directions[side][1]
      }
    }
    ring++
  }

  // Convert axial -> pixel (pointy-top hex).
  const size = spacing
  const positions = SKILLS.map((_, i) => {
    const [hq, hr] = coords[i]
    const x = size * Math.sqrt(3) * (hq + hr / 2)
    const y = -size * 1.5 * hr
    return { x, y }
  })

  // Recenter on the centroid so the universe opens dead-center.
  const cx = positions.reduce((s, p) => s + p.x, 0) / positions.length
  const cy = positions.reduce((s, p) => s + p.y, 0) / positions.length

  return SKILLS.map((skill, i) => {
    const radius = 0.62 + (skill.proficiency / 10) * 0.55
    return {
      skill,
      bx: positions[i].x - cx,
      by: positions[i].y - cy,
      radius,
      index: i,
    }
  })
}
