import { FC } from 'react'
import { SearchResult } from '@frontify/fondue'
import { useBlockSettings, useEditorState } from '@frontify/app-bridge'

import type { BlockProps } from '@frontify/guideline-blocks-settings'

import 'tailwindcss/tailwind.css'

type Settings = {
  title: string
  target: {
    link: SearchResult | null
    openInNewTab: boolean
  }
}

export const TestBlock: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings] = useBlockSettings<Settings>(appBridge)

  const { title, target } = blockSettings

  if (isEditing) {
    if (title) {
      return <div>{title}</div>
    } else if (target.link) {
      return <div>{target.link.title}</div>
    } else {
      return <div>Set link in Settings</div>
    }
  } else if (target.link && (title || target.link.title)) {
    return (
      <div>
        <a
          href={target.link.link}
          className="tw-group tw-flex tw-gap-2"
          target={target.openInNewTab ? '_blank' : ''}
          rel="noreferrer"
        >
          <span className="tw-type-headline">
            {title ? title : target.link.title}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="tw-h-[2.5rem] tw-w-auto tw-transition-all group-hover:tw-transform group-hover:tw-translate-x-4"
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
