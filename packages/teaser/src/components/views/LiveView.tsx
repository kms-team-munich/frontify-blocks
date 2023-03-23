import { useBlockSettings } from '@frontify/app-bridge'
import { TeaserItem } from '../TeaserItem'
import { serialize } from '../../helpers'
import parseHtml from 'html-react-parser'

import { BlockProps } from '@frontify/guideline-blocks-settings'
import { Item, RichText, Settings, TeaserBackground } from '../../types'
import { FC } from 'react'

export const LiveView: FC<BlockProps> = ({ appBridge }) => {
  const [blockSettings] = useBlockSettings<Settings>(appBridge)
  const { items, title, copy, footer, background, backgroundGlobal } =
    blockSettings

  // Styling
  const containerClassesArray = ['tw-flex tw-flex-col tw-gap-8']
  const headerClassesArray = ['tw-flex tw-flex-col tw-gap-6']
  const teaserClassesArray = ['tw-grid tw-grid-cols-2']
  const copyClassesArray = ['tw-max-w-full tw-whitespace-pre-line']

  let teaser = ''
  let container = ''
  let header = ''
  let copyStyling = ''

  if (backgroundGlobal) {
    if (background === TeaserBackground.Light) {
      container = 'tw-bg-zeiss-gray-2 tw-text-zeiss-gray-19'
      teaser = 'tw-border-t tw-border-white tw-bg-white tw-gap-px'
      copyStyling = 'tw-text-zeiss-gray-19'
    } else if (background === TeaserBackground.Dark) {
      container = 'tw-bg-zeiss-gray-21 tw-text-zeiss-gray-4'
      teaser =
        'tw-border-t tw-border-zeiss-gray-19 tw-bg-zeiss-gray-19 tw-gap-px'
      copyStyling = 'tw-text-zeiss-gray-7'
    } else if (background === TeaserBackground.Azure) {
      container = 'tw-bg-zeiss-azure-90 tw-text-white'
      teaser = 'tw-border-t tw-border-white tw-bg-white tw-gap-px'
      copyStyling = 'tw-text-white'
    }

    header = 'tw-pt-3 tw-px-4'
  } else {
    teaser = 'tw-gap-2'
    container = 'tw-text-zeiss-gray-19'
    copyStyling = 'tw-text-zeiss-gray-16'
  }

  containerClassesArray.push(container)
  teaserClassesArray.push(teaser)
  headerClassesArray.push(header)
  copyClassesArray.push(copyStyling)

  const containerClasses = containerClassesArray.join(' ')
  const headerClasses = headerClassesArray.join(' ')
  const teaserClasses = teaserClassesArray.join(' ')
  const copyClasses = copyClassesArray.join(' ')

  const parsedCopy = parseHtml(
    serialize(
      { children: JSON.parse(copy) } as RichText,
      background === TeaserBackground.Azure && backgroundGlobal
        ? 'tw-text-white tw-font-medium'
        : 'tw-text-zeiss-azure-90 tw-font-medium'
    )
  )
  return (
    <div className="tw-flex tw-flex-col tw-gap-6">
      <div className={containerClasses}>
        <div className={headerClasses}>
          <div className="tw-type-headline">{title}</div>
          {copy && <div className={copyClasses}>{parsedCopy}</div>}
        </div>
        <div className={teaserClasses}>
          {items?.map((item: Item) => {
            return (
              <TeaserItem key={item.id} item={item} appBridge={appBridge} />
            )
          })}
        </div>
      </div>
      {footer && (
        <div className="tw-max-w-[600px] tw-whitespace-pre tw-text-zeiss-gray-16">
          {parseHtml(serialize({ children: JSON.parse(footer) } as RichText))}
        </div>
      )}
    </div>
  )
}
