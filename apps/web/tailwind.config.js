const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

module.exports = {
  presets: [require('../../tailwind-workspace-preset.ts')],
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['var(--font-title)'],
        text: ['var(--font-text)'],
      },
      // keyframes: {
      //   spin: {
      //     '0%': { transform: 'rotate(0deg)' },
      //     '100%': { transform: 'rotate(360deg)' },
      //   },
      // },
    },
  },

  // plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        winter: {
          ...require('daisyui/src/colors/themes')['[data-theme=winter]'],
          primary: '#4E63F2',
          secondary: '#C7D9FF',
          accent: '#FF7F50',
          transparent: 'transparent',
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: '#4E63F2',
          secondary: '#474554',
          accent: '#FF5D67',
        },
      },
    ],
  },
}
