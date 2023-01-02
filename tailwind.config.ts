import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import fondue from '@frontify/fondue/tailwind'

const config = <Partial<Config>>{
  presets: [fondue],
  content: ['./{packages,examples}/*/src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        zeiss: {
          gray: {
            4: 'rgb(242 245 248)',
            5: 'rgb(236 240 244)',
            6: 'rgb(230 235 240)',
            7: 'rgb(220 227 233)',
            16: 'rgb(96 106 118)',
            11: 'rgb(164 176 188)',
            21: 'rgb(32 35 39)',
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.type-headline': { fontSize: '2rem', lineHeight: '120%' },
        '.type-copy': { fontSize: '1rem', lineHeight: '150%' },
        '.type-description': { fontSize: '1.25rem', lineHeight: '120%' },
      })
    }),
  ],
}

export default config
