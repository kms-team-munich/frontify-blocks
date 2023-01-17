import { FC } from 'react'
import { useBlockSettings, useEditorState } from '@frontify/app-bridge'

import { SettingsContext } from './SettingsContext'
import { LiveView } from './components/views/LiveView'
import { EditView } from './components/views/EditView'

import { BlockProps } from '@frontify/guideline-blocks-settings'
import { Settings } from './types'

import 'tailwindcss/tailwind.css'

export const TeaserBlock: FC<BlockProps> = ({ appBridge }) => {
  const isEditing = useEditorState(appBridge)
  const [blockSettings] = useBlockSettings<Settings>(appBridge)

  return (
    <SettingsContext.Provider value={blockSettings}>
      {!isEditing && <LiveView appBridge={appBridge} />}

      {isEditing && <EditView appBridge={appBridge} />}
    </SettingsContext.Provider>
  )
}
