import { createContext } from 'react'
import { Settings } from './types'

export const SettingsContext = createContext<Settings>({} as Settings)
