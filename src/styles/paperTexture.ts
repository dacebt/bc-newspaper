/**
 * Paper texture utilities
 * Generates SVG-based noise textures for paper grain effect
 */

// Centralized texture constants
export const TEXTURE_CONSTANTS = {
  // Opacities - tuned for visible but subtle grain
  FIBER_OPACITY: 0.01, // Minimal fiber (reference shows no distinct fiber patterns)
  FINE_GRAIN_OPACITY: 0.15, // Main grain texture - more visible
  COARSE_GRAIN_OPACITY: 0.08, // Secondary grain for depth
  VIGNETTE_OPACITY: 0.01, // Minimal vignette (reference shows no noticeable vignette)
  // Background sizes - fine grain should be more prominent
  FINE_GRAIN_SIZE: '200px 200px', // Slightly smaller for finer detail
  COARSE_GRAIN_SIZE: '400px 400px', // Larger blotches
  FIBER_SIZE: '2px 2px',
  // Blend mode - multiply works better for visible grain
  BLEND_MODE: 'multiply' as const,
  BLEND_MODE_FALLBACK: 'normal' as const,
} as const;

/**
 * Generates SVG texture with adjustable opacity
 */
function getPaperGrainTextureWithOpacity(variant: 'fine' | 'coarse' = 'fine', opacity: number = 0.5): string {
  // Fine grain: higher frequency for uniform fine texture (visible grain)
  // Coarse grain: lower frequency for subtle variation
  const baseFrequency = variant === 'fine' ? '1.0' : '0.35';
  const numOctaves = variant === 'fine' ? '4' : '2';
  const width = variant === 'fine' ? '128' : '256';
  const height = variant === 'fine' ? '128' : '256';

  // Simplified filter - remove complex transfer for cleaner grain
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><defs><filter id="grain-${variant}" x="0%" y="0%" width="100%" height="100%"><feTurbulence baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" stitchTiles="stitch" type="fractalNoise"/><feColorMatrix type="saturate" values="0"/></filter></defs><rect width="100%" height="100%" filter="url(#grain-${variant})" opacity="${opacity}"/></svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Builds complete background image array for texture layers
 */
export function getTextureLayers(): {
  backgroundImage: string[];
  backgroundSize: string[];
  backgroundRepeat: string[];
  opacity: number;
  mixBlendMode: string;
} {
  // Build layers in order: fiber, fine grain, coarse grain, vignette
  const fiberOpacity = TEXTURE_CONSTANTS.FIBER_OPACITY;
  const fineGrainOpacity = TEXTURE_CONSTANTS.FINE_GRAIN_OPACITY;
  const coarseGrainOpacity = TEXTURE_CONSTANTS.COARSE_GRAIN_OPACITY;
  const vignetteOpacity = TEXTURE_CONSTANTS.VIGNETTE_OPACITY;

  // Create opacity-adjusted gradients
  const fiberLayer = `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, ${fiberOpacity}) 1px, rgba(0, 0, 0, ${fiberOpacity}) 2px)`;
  const vignetteLayer = `radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, ${vignetteOpacity}) 100%)`;

  // Overall layer opacity - visible grain texture (reference shows clearly visible uniform grain)
  const overallOpacity = 0.28;

  // Reference shows uniform granular texture with no distinct fiber patterns or vignette
  // Focus on grain layers, minimize fiber/vignette
  return {
    backgroundImage: [
      // Fine grain is the main visible texture
      getPaperGrainTextureWithOpacity('fine', fineGrainOpacity),
      // Coarse grain adds subtle depth
      getPaperGrainTextureWithOpacity('coarse', coarseGrainOpacity),
      // Minimal fiber (barely visible)
      fiberLayer,
      // Minimal vignette (barely visible)
      vignetteLayer,
    ],
    backgroundSize: [
      TEXTURE_CONSTANTS.FINE_GRAIN_SIZE,
      TEXTURE_CONSTANTS.COARSE_GRAIN_SIZE,
      TEXTURE_CONSTANTS.FIBER_SIZE,
      '100% 100%',
    ],
    backgroundRepeat: ['repeat', 'repeat', 'repeat', 'no-repeat'],
    opacity: overallOpacity,
    mixBlendMode: TEXTURE_CONSTANTS.BLEND_MODE,
  };
}
