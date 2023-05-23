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
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          primary: '#148d85',
          secondary: '#8dcfb0',
          accent: '#f9f7fb',
          transparent: 'transparent',
        },
      },
    ],
  },
}
