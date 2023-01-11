import { FC } from 'react'
import { IconProps } from '../../types'

export const ArrowRight: FC<IconProps> = ({ style, className }) => (
  <svg
    style={style}
    className={className}
    viewBox="0 0 25 25"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.7383 13.0928L17.1992 8.37753L17.8394 7.59277L24.3003 13.0928L17.8394 18.5928L17.1992 17.808L22.7383 13.0928Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.699219 12.5928H23.1992V13.5928H0.699219V12.5928Z"
    />
  </svg>
)
