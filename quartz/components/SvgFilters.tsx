import { QuartzComponent, QuartzComponentConstructor } from "./types"

// Renders once per page (0x0, invisible). This is what makes the
// grain/roughen/misregistration effects in custom.scss actually work —
// those effects reference url(#roughen) etc., and CSS/SCSS cannot define
// SVG filters on its own. This component supplies the <defs> those
// references point to. Without it, every filter: url(#...) in custom.scss
// silently does nothing.

export default (() => {
  const SvgFilters: QuartzComponent = () => {
    return (
      <svg width="0" height="0" style="position:absolute">
        <defs>
          <filter id="roughen" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves={3} seed={7} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={26} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="roughen-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.045" numOctaves={3} seed={7} result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={34}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation={1.1} />
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={4} result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"
            />
          </filter>
        </defs>
      </svg>
    )
  }
  return SvgFilters
}) satisfies QuartzComponentConstructor
