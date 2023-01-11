import { FC } from 'react'
import { TeaserIconProps } from '../types'
import { ArrowRight } from './svg/ArrowRight'
import { Download } from './svg/Download'
import { ReactSVG } from 'react-svg'

export const TeaserIcon: FC<TeaserIconProps> = ({ icon, item }) => {
  const svgBeforeInjection = (svg: SVGSVGElement) => {
    const childElements = Array.from(svg.getElementsByTagName('*'))
    for (const child of childElements) {
      child.removeAttribute('fill')
    }

    svg.setAttribute('fill', 'currentColor')
    return svg
  }

  return (
    <span>
      {!icon && item?.blockType === 'link' && (
        <ArrowRight className="tw-w-6 tw-h-auto tw-absolute tw-left-4 tw-bottom-3" />
      )}
      {!icon && item?.blockType === 'download' && (
        <Download className="tw-w-6 tw-h-auto tw-absolute tw-left-4 tw-bottom-3" />
      )}
      {icon && (
        <ReactSVG
          src={icon.previewUrl}
          className="tw-w-6 tw-h-auto tw-absolute tw-left-4 tw-bottom-3"
          beforeInjection={svgBeforeInjection}
        />
      )}
    </span>
  )
}
