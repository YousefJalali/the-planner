const { createGlobPatternsForDependencies } = require('@nx/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      // colors: {
      //   PROPOSED: '#935aea',
      //   INPROGRESS: '#ae9900',
      //   COMPLETED: '#008f20',
      // },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        winter: {
          ...require('daisyui/src/colors/themes')['[data-theme=winter]'],
          primary: '#4E63F2',
          secondary: '#C7D9FF',
          // "secondary-content": "#333333",
          // secondary: "#9BC4E2",
          accent: '#FF7F50',
          transparent: 'transparent',
          '.status-INPROGRESS': {
            'background-color': '#935aea',
          },
          // PROPOSED: '#935aea',
          // INPROGRESS: '#ae9900',
          // COMPLETED: '#008f20',
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
