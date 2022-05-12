import {
  defaultTheme,
  generateHexAlphaVariants,
} from '@xstyled/styled-components'

import { Status } from '../common/types/TaskType'

const colors = {
  ...generateHexAlphaVariants({
    'brand-primary': '#0066ff',

    'utility-action': '#009ce3',
    'utility-information': '#4d6680',
    'utility-confirmation': '#78a100',
    'utility-warning': '#f2b600',
    'utility-critical': '#e81c00',
    'utility-rating': '#FFC120',
    'utility-saved': '#E44753',

    ['tag-' + Status.PROPOSED]: ' #935aea',
    ['tag-' + Status.INPROGRESS]: '#ae9900',
    ['tag-' + Status.COMPLETED]: '#008f20',
  }),

  'content-contrast': 'rgba(19, 41, 63, 1)',
  'content-default': 'rgba(19, 41, 63, 0.8)',
  'content-subtle': 'rgba(19, 41, 63, 0.65)',
  'content-nonessential': 'rgba(19, 41, 63, 0.4)',

  'layout-divider': 'rgba(167, 174, 181, 0.6)',
  'layout-level0': 'rgba(255, 255, 255, 1)',
  'layout-level0accent': 'rgba(237, 240, 242, 1)',
  'layout-level1': 'rgba(249, 250, 251, 1)',
  'layout-level1accent': 'rgba(228, 231, 235, 1)',
  'layout-level2': 'rgba(242, 245, 247, 1)',
  'layout-level2accent': 'rgba(220, 225, 230, 1)',
  'layout-level3': 'rgba(235, 239, 242, 1)',
  'layout-level3accent': 'rgba(211, 216, 222, 1)',

  modes: {
    dark: {
      'content-contrast': 'rgba(230, 242, 255, 1)',
      'content-default': 'rgba(230, 242, 255, 0.8)',
      'content-subtle': 'rgba(230, 242, 255, 0.65)',
      'content-nonessential': 'rgba(230, 242, 255, 0.4)',

      'layout-divider': 'rgba(122, 138, 153, 0.6)',
      'layout-level0': 'rgba(16, 20, 23, 1)',
      'layout-level0accent': 'rgba(35, 42, 49, 1)',
      'layout-level1': 'rgba(25, 31, 36, 1)',
      'layout-level1accent': 'rgba(44, 52, 62, 1)',
      'layout-level2': 'rgba(35, 42, 49, 1)',
      'layout-level2accent': 'rgba(49, 59, 69, 1)',
      'layout-level3': 'rgba(53, 63, 74, 1)',
      'layout-level3accent': 'rgba(69, 82, 94, 1)',
    },
  },
}

const shadows = [
  `${colors['brand-primary']}50 0px 5px 15px`,
  'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
]
// const shadows = ['rgba(0, 0, 0, 0.35) 0px 5px 15px']

const space = {
  0: 0,
  1: '0.25rem', //4px
  2: '0.5rem', //8px
  3: '1rem', //16px
  4: '1.5rem', //24px
  5: '2rem', //32px
  6: '3rem', //48px
  7: '4.5rem', //72px
  full: '100%',
}

const fontSizes = {
  xs: '0.79rem', //12
  sm: '0.889rem', //14
  default: '1rem', //16
  lg: '1.125rem', //18
  xl: '1.266rem', //22
  '2xl': '1.424rem', //30
  '3xl': '1.602rem', //30
  '4xl': '1.802rem', //30
}

const lineHeights = {
  none: 1,
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
}

const fonts = {
  heading:
    '"Montserrat", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  body: '"DM Sans", "Montserrat", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  logo: 'Carter One',
  number: 'roboto',
}

export const theme = {
  ...defaultTheme,
  space,
  fonts,
  fontSizes,
  lineHeights,
  colors,
  shadows,
  radii: { ...space },
  inset: { ...space },
  sizes: { ...fontSizes },
  states: {
    firstLetter: '&::first-letter',
  },
  texts: {
    headline: {
      one: {
        fontFamily: 'heading',
        fontSize: '4xl',
        lineHeight: 'none',
        fontWeight: 'bold',
        letterSpacing: 'normal',
        color: 'content-contrast',
      },
      two: {
        fontFamily: 'heading',
        fontSize: '3xl',
        lineHeight: 'none',
        fontWeight: 'bold',
        letterSpacing: 'normal',
        color: 'content-contrast',
      },
      three: {
        fontFamily: 'heading',
        fontSize: '2xl',
        lineHeight: 'none',
        fontWeight: 'bold',
        letterSpacing: 'normal',
        color: 'content-contrast',
      },
    },
    body: {
      fontSize: 'default',
      lineHeight: 'normal',
      fontWeight: 'normal',

      small: {
        fontSize: 'sm',
        lineHeight: 'relaxed',
        fontWeight: 'normal',
      },
      large: {
        fontSize: 'lg',
        lineHeight: 'tight',
        fontWeight: 'normal',
      },
    },
  },
}

// const breakpoints = ['40em', '52em', '64em', '80em']

// const space = [4, 8, 16, 24, 32, 64, 128, 256, 512]

// interface FontSizeAliases {
//   micro: number
//   small: number
//   default: number
//   large: number
// }

// const rawSizes = [12, 14, 16, 18, 22, 30, 40]
// const sizeNames: FontSizeAliases = {
//   micro: rawSizes[0],
//   small: rawSizes[1],
//   default: rawSizes[2],
//   large: rawSizes[3],
// }
// const fontSizes = Object.assign([], rawSizes, sizeNames)

// const lineHeights = [1, 1.25, 1.5, 1.75, 2]

// const fontWeights = {
//   light: 400,
//   default: 500,
//   bold: 700,
// }

// const letterSpacings = {
//   normal: 'normal',
//   tracked: '0.1em',
//   tight: '-0.05em',
//   mega: '0.25em',
// }

// const fonts = {
//   serif: 'athelas, georgia, times, serif',
//   sansSerif:
//     '"DM Sans", "Montserrat", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
//   cursive: 'Carter One',
// }

// const borders = [
//   0,
//   '1px solid',
//   '2px solid',
//   '4px solid',
//   '8px solid',
//   '16px solid',
//   '32px solid',
// ]

// const radii = [0, 2, 4, 8, 16, 9999, '100%']

// const width = [16, 32, 64, 128, 256]

// const heights = [16, 32, 64, 128, 256]

// const maxWidths = [16, 32, 64, 128, 256, 512, 768, 1024, 1536]

// const shadows = ['0px 8px 16px rgba(39,51,51,.24)']

// const colors = {
//   brand: {
//     // primary: '#da7f8f',
//     // primary: '#232931',
//     // primary: '#FF4647',
//     primary: '#0066ff',
//     // primary: '#0ACF83',
//     // primary: '#008060',
//     secondary: '#a6b1e1',
//     tertiary: '#dcd6f7',
//     quaternary: '#f4eeff',
//   },

//   utility: {
//     action: 'rgba(0, 156, 227, 1)',
//     information: 'rgba(77, 102, 128, 1)',
//     confirmation: 'rgba(120, 161, 0, 1)',
//     warning: 'rgba(242, 182, 0, 1)',
//     critical: 'rgba(232, 28, 0, 1)',
//     rating: '#FFC120',
//     saved: '#E44753',
//   },

//   tag: {
//     proposed: {
//       color: 'rgba(147, 90, 234, 1)',
//       bg: 'rgba(147, 90, 234, 0.2)',
//     },
//     inprogress: {
//       color: 'rgba(174, 153, 0, 1)',
//       bg: 'rgba(174, 153, 0, 0.2)',
//     },
//     completed: {
//       color: 'rgba(0, 143, 32, 1)',
//       bg: 'rgba(0, 143, 32, 0.2)',
//     },
//   },

//   content: {
//     contrast: 'rgba(19, 41, 63, 1)',
//     default: 'rgba(19, 41, 63, 0.8)',
//     subtle: 'rgba(19, 41, 63, 0.65)',
//     nonessential: 'rgba(19, 41, 63, 0.4)',
//   },
//   layout: {
//     divider: 'rgba(167, 174, 181, 0.6)',
//     level0: 'rgba(255, 255, 255, 1)',
//     level0accent: 'rgba(237, 240, 242, 1)',
//     level1: 'rgba(249, 250, 251, 1)',
//     level1accent: 'rgba(228, 231, 235, 1)',
//     level2: 'rgba(242, 245, 247, 1)',
//     level2accent: 'rgba(220, 225, 230, 1)',
//     level3: 'rgba(235, 239, 242, 1)',
//     level3accent: 'rgba(211, 216, 222, 1)',
//   },

//   modes: {
//     // light: {
//     //   content: {
//     //     contrast: 'rgba(19, 41, 63, 1)',
//     //     default: 'rgba(19, 41, 63, 0.8)',
//     //     subtle: 'rgba(19, 41, 63, 0.65)',
//     //     nonessential: 'rgba(19, 41, 63, 0.4)',
//     //   },
//     //   layout: {
//     //     divider: 'rgba(167, 174, 181, 0.6)',
//     //     level0: 'rgba(255, 255, 255, 1)',
//     //     level0accent: 'rgba(237, 240, 242, 1)',
//     //     level1: 'rgba(249, 250, 251, 1)',
//     //     level1accent: 'rgba(228, 231, 235, 1)',
//     //     level2: 'rgba(242, 245, 247, 1)',
//     //     level2accent: 'rgba(220, 225, 230, 1)',
//     //     level3: 'rgba(235, 239, 242, 1)',
//     //     level3accent: 'rgba(211, 216, 222, 1)',
//     //   },
//     // },
//     dark: {
//       content: {
//         contrast: 'rgba(230, 242, 255, 1)',
//         default: 'rgba(230, 242, 255, 0.8)',
//         subtle: 'rgba(230, 242, 255, 0.65)',
//         nonessential: 'rgba(230, 242, 255, 0.4)',
//       },
//       layout: {
//         divider: 'rgba(122, 138, 153, 0.6)',
//         level0: 'rgba(16, 20, 23, 1)',
//         level0accent: 'rgba(35, 42, 49, 1)',
//         level1: 'rgba(25, 31, 36, 1)',
//         level1accent: 'rgba(44, 52, 62, 1)',
//         level2: 'rgba(35, 42, 49, 1)',
//         level2accent: 'rgba(49, 59, 69, 1)',
//         level3: 'rgba(53, 63, 74, 1)',
//         level3accent: 'rgba(69, 82, 94, 1)',
//       },
//     },
//   },
// }

// const theme = {
//   breakpoints,
//   space,
//   fontSizes,
//   fontWeights,
//   lineHeights,
//   letterSpacings,
//   fonts,
//   borders,
//   radii,
//   width,
//   heights,
//   maxWidths,
//   colors,
//   shadows,
// }

// export type ThemeType = typeof theme

export default theme
