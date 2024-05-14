import { ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'

interface EyeInterface {
  visible: boolean
}

export function EyeIcon({
  visible,
  ...svgProps
}: EyeInterface & ComponentPropsWithoutRef<'svg'>) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: () => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: 'spring', duration: 0.5, bounce: 0 },
          opacity: { duration: 0.01 },
        },
      }
    },
  }

  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <g opacity="0.5">
        <path
          d="M6.85979 3.94965C7.56377 3.72648 8.29811 3.61388 9.03661 3.61587C12.0711 3.61587 14.1362 5.4299 15.3676 7.02914C15.9843 7.83166 16.2927 8.23147 16.2927 9.42075C16.2927 10.6107 15.9843 11.0106 15.3676 11.8124C14.1362 13.4116 12.0711 15.2256 9.03661 15.2256C6.00211 15.2256 3.93703 13.4116 2.70567 11.8124C2.0889 11.0113 1.78052 10.61 1.78052 9.42075C1.78052 8.23075 2.0889 7.83094 2.70567 7.02914C3.0818 6.53769 3.50066 6.08046 3.95735 5.66282"
          stroke="white"
          strokeWidth="1.08841"
          strokeLinecap="round"
        />
        <path
          d="M11.2134 9.42073C11.2134 9.99806 10.9841 10.5517 10.5758 10.96C10.1676 11.3682 9.6139 11.5976 9.03657 11.5976C8.45924 11.5976 7.90555 11.3682 7.49732 10.96C7.08908 10.5517 6.85974 9.99806 6.85974 9.42073C6.85974 8.84339 7.08908 8.28971 7.49732 7.88147C7.90555 7.47324 8.45924 7.2439 9.03657 7.2439C9.6139 7.2439 10.1676 7.47324 10.5758 7.88147C10.9841 8.28971 11.2134 8.84339 11.2134 9.42073Z"
          stroke="white"
          strokeWidth="1.08841"
        />
        <motion.line
          x1="2.5"
          y1="3.5"
          x2="15.5"
          y2="16.5"
          stroke="white"
          strokeWidth="1.08841"
          variants={draw}
          initial={!visible ? 'hidden' : 'visible'}
          animate={!visible ? 'visible' : 'hidden'}
        />
      </g>
    </svg>
  )
}
