import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = <Partial<Config>>{
  presets: [require('@frontify/fondue/tailwind')],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        zeiss: {
          gray: {
            2: 'rgb(248 250 252)',
            4: 'rgb(242 245 248)',
            5: 'rgb(236 240 244)',
            6: 'rgb(230 235 240)',
            7: 'rgb(220 227 233)',
            16: 'rgb(96 106 118)',
            11: 'rgb(164 176 188)',
            19: 'rgb(50 55 62)',
            21: 'rgb(32 35 39)',
          },
          azure: {
            90: 'rgb(0 114 239)',
          },
          black: 'rgb(0 0 0)',
          white: 'rgb(255 255 255)',
        },
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.type-headline': {
          fontSize: '2rem',
          lineHeight: '120%',
          fontWeight: '700',
        },
        '.type-copy': { fontSize: '1rem', lineHeight: '150%' },
        '.type-description': { fontSize: '1.25rem', lineHeight: '120%' },
      })
    }),
  ],
}

export default config
