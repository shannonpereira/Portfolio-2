import * as THREE from "three"

/**
 * Brand logos sourced from theSVG.org via the jsDelivr CDN mirror.
 * Trademarks belong to their respective owners — review usage policies before commercial use.
 */
const svgUrl = (slug: string, variant = "default") =>
  `https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/${slug}/${variant}.svg`

const textureCache = new Map<string, Promise<THREE.Texture>>()

function loadSvgImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * Builds an equirectangular (2:1) texture: a smooth brand-tinted gradient
 * field with the official logo composited at the front-facing equator.
 * This maps cleanly onto a UV sphere so each skill reads as a physical,
 * branded marble rather than a flat circle.
 */
async function buildLogoTexture(slug: string, variant: string, color: string): Promise<THREE.Texture> {
  const W = 2048
  const H = 1024
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  // Base brand field with a soft vertical sheen for a glossy enamel look.
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, lighten(color, 0.18))
  grad.addColorStop(0.5, color)
  grad.addColorStop(1, darken(color, 0.4))
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // Very subtle top sheen — kept low so the brand color stays saturated.
  const hi = ctx.createRadialGradient(W * 0.5, H * 0.22, 0, W * 0.5, H * 0.22, W * 0.38)
  hi.addColorStop(0, "rgba(255,255,255,0.16)")
  hi.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = hi
  ctx.fillRect(0, 0, W, H)

  try {
    const url = (slug === 'threejs') ? '/assets/threejs.svg' : svgUrl(slug, variant);
    const img = await loadSvgImage(url)
    console.log(`Successfully loaded logo for ${slug} from ${url}`)

    // Fit the logo inside a centered square region facing forward.
    const target = H * 0.46
    const ratio = img.width && img.height ? img.width / img.height : 1
    let dw = target
    let dh = target
    if (ratio > 1) dh = target / ratio
    else dw = target * ratio

    const cy = H * 0.5

    // Helper to draw the logo lozenge and image at a specific x-coordinate, with wrapping
    const drawLogoAt = (x: number) => {
      const padX = dw * 0.26
      const padY = dh * 0.26
      const lozW = dw + padX * 2
      const lozH = dh + padY * 2

      const drawPart = (tx: number) => {
        roundRect(ctx, tx - lozW / 2, cy - lozH / 2, lozW, lozH, Math.min(lozW, lozH) * 0.5)

        // Use black background for Framer, Vercel, Prisma, and OpenAI (RAG), white background for all others
        const blackBackgroundSlugs = ["framer", "vercel", "prisma", "openai"]; 
        ctx.fillStyle = blackBackgroundSlugs.includes(slug) ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.97)";

        ctx.shadowColor = "rgba(0,0,0,0.2)"
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0

        ctx.drawImage(img, tx - dw / 2, cy - dh / 2, dw, dh)
      }

      drawPart(x)
      // Wrap around the canvas edges
      if (x - lozW / 2 < 0) drawPart(x + W)
      if (x + lozW / 2 > W) drawPart(x - W)
    }

    // Draw on front (center = W*0.5) and back (edge/wrap = 0 or W)
    drawLogoAt(W * 0.5) // Front
    drawLogoAt(W)       // Back (wraps to W)
  } catch (e) {
    console.error(`Failed to load logo for ${slug}:`, e)
    // If the logo fails to load, the brand field alone still looks intentional.
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  // Force update
  texture.updateMatrix()
  return texture
}

export function getLogoTexture(slug: string, variant = "default", color = "#333"): Promise<THREE.Texture> {
  const key = `${slug}:${variant}:${color}`
  if (!textureCache.has(key)) {
    textureCache.set(key, buildLogoTexture(slug, variant, color))
  }
  return textureCache.get(key)!
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

function clamp(v: number) {
  return Math.max(0, Math.min(255, v))
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "")
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function lighten(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${clamp(r + 255 * amt)},${clamp(g + 255 * amt)},${clamp(b + 255 * amt)})`
}

function darken(hex: string, amt: number) {
  const { r, g, b } = hexToRgb(hex)
  return `rgb(${clamp(r - 255 * amt)},${clamp(g - 255 * amt)},${clamp(b - 255 * amt)})`
}
