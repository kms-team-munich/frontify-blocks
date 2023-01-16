import { TeaserBackground, TeaserItemProps } from '../types'
import { SettingsContext } from '../SettingsContext'
import { useBlockAssets } from '@frontify/app-bridge'
import { FC, MouseEvent, useContext } from 'react'
import { TeaserIcon } from './TeaserIcon'

export const TeaserItem: FC<TeaserItemProps> = ({ item, appBridge }) => {
  const { background } = useContext(SettingsContext)
  const { blockAssets } = useBlockAssets(appBridge)

  const image = blockAssets[`${item?.id}-img`]?.[0]
  const icon = blockAssets[`${item?.id}-icon`]?.[0]
  const file = blockAssets[`${item?.id}-download`]?.[0]

  const containerClasses = [
    'tw-h-[200px] tw-text-xl hover:tw-cursor-pointer tw-relative tw-transitions-color tw-duration-200',
    background === TeaserBackground.Light &&
      'tw-bg-zeiss-gray-2 tw-text-zeiss-gray-19 hover:tw-bg-zeiss-gray-5',
    background === TeaserBackground.Dark &&
      'tw-bg-zeiss-gray-21 tw-text-zeiss-gray-4 hover:tw-bg-zeiss-black',
  ].join(' ')

  const downloadFile = (data: File, fileName: string, type = 'text/plain') => {
    const a = document.createElement('a')
    a.style.display = 'none'
    document.body.appendChild(a)

    a.href = window.URL.createObjectURL(new Blob([data], { type }))
    a.setAttribute('download', fileName)

    a.click()

    // Cleanup
    window.URL.revokeObjectURL(a.href)
    document.body.removeChild(a)
  }

  const handleClick = (e: MouseEvent) => {
    if (item?.blockType === 'download') {
      e.preventDefault()
      // eslint-disable-next-line
      //@ts-ignore
      downloadFile(file.originUrl, file.fileName, file.type)
    }
  }

  return (
    <div className={containerClasses}>
      <a className="tw-block tw-py-3 tw-px-4" href="" onClick={handleClick}>
        <div
          className="tw-absolute tw-h-full tw-w-3/4 tw-right-0 tw-bottom-0 tw-bg-no-repeat tw-bg-contain tw-bg-right-bottom tw-z-0"
          style={{
            backgroundImage: image?.previewUrl
              ? `url(${image.previewUrl})`
              : '',
          }}
        />
        <span className="tw-relative tw-z-10">{item?.title}</span>
        <TeaserIcon icon={icon} item={item} />
      </a>
    </div>
  )
}
