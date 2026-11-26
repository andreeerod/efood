import { cores } from '../styles'

type Props = { largura?: number }

// Logo do Figma: moldura arredondada, "efood" e garfo e faca, tudo em rosa
export default function LogoEfood({ largura = 125 }: Props) {
  return (
    <svg width={largura} viewBox="0 0 125 57" role="img" aria-label="efood" style={{ display: 'block' }}>
      <rect x="2" y="2" width="121" height="53" rx="6" fill="none" stroke={cores.rosa} strokeWidth="4" />
      <text x="12" y="38" fill={cores.rosa} fontFamily="Roboto, sans-serif" fontWeight="900" fontSize="26" letterSpacing="-0.5">
        efood
      </text>
      <g fill={cores.rosa}>
        {/* garfo */}
        <rect x="93" y="12" width="2.4" height="11" rx="1.2" />
        <rect x="97" y="12" width="2.4" height="11" rx="1.2" />
        <rect x="101" y="12" width="2.4" height="11" rx="1.2" />
        <path d="M93 21h10.4v2.5a5.2 5.2 0 0 1-3.4 4.9V44a1.8 1.8 0 0 1-3.6 0V28.4A5.2 5.2 0 0 1 93 23.5z" />
        {/* faca */}
        <path d="M110.5 12c3.4 1.8 4.6 7 4.6 13.5h-2.6V44a1.8 1.8 0 0 1-3.6 0V13.4c0-1 .8-1.7 1.6-1.4z" />
      </g>
    </svg>
  )
}
