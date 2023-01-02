import {
  AppBridgeBlock,
  useBlockSettings,
  useEditorState,
} from '@frontify/app-bridge'
import { SearchResult } from '@frontify/fondue'
import { FC } from 'react'
import 'tailwindcss/tailwind.css'

type Settings = {
  titleValue: string
  targetBlank: boolean
  linkValue: { link: SearchResult | null; openInNewTab: boolean }
}

type Props = {
  appBridge: AppBridgeBlock
}

export const TestBlock: FC<Props> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings] = useBlockSettings<Settings>(appBridge)

  const { titleValue, linkValue } = blockSettings

  if (isEditing) {
    if (titleValue) {
      return <div>{titleValue}</div>
    } else if (linkValue.link) {
      return <div>{linkValue.link.title}</div>
    } else {
      return <div>Set link in Settings</div>
    }
  } else if (linkValue.link && (titleValue || linkValue.link.title)) {
    return (
      <div>
        <a
          href={linkValue.link.link}
          className="tw-group tw-flex tw-gap-2"
          target={linkValue.openInNewTab ? '_blank' : ''}
          rel="noreferrer"
        >
          <span className="tw-type-headline">
            {titleValue ? titleValue : linkValue.link.title}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-full w-auto tw-transition-all group-hover:tw-transform group-hover:tw-translate-x-4"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    )
  } else {
    return <div />
  }
}
