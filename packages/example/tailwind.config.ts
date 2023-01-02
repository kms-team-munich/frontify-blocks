import type { Config } from 'tailwindcss'
import preset from '../../tailwind.config'

const config = <Partial<Config>>{
  content: ['/src/**/*.{js,ts,jsx,tsx}'],
  presets: [preset],
}

export default config
