const breakpoints = ['40em', '52em', '64em', '80em']

const space = [4, 8, 16, 24, 32, 64, 128, 256, 512]

// interface FontSizeAliases {
//   micro?: number
//   small?: number
//   default?: number
//   large?: number
// }

interface FontSizeAliases {
  micro: number
  small: number
  default: number
  large: number
}

const rawSizes = [12, 14, 16, 18, 22, 30, 40]
const sizeNames: FontSizeAliases = {
  micro: rawSizes[0],
  small: rawSizes[1],
  default: rawSizes[2],
  large: rawSizes[3],
}
const fontSizes = Object.assign([], rawSizes, sizeNames)

// const fontSizes: number[] & FontSizeAliases = [12, 14, 16, 18, 22, 30, 40]
// fontSizes.micro = fontSizes[0]
// fontSizes.small = fontSizes[1]
// fontSizes.default = fontSizes[2]
// fontSizes.large = fontSizes[3]

const lineHeights = [1, 1.25, 1.5, 1.75, 2]

const fontWeights = {
  light: 400,
  default: 500,
  bold: 700,
}

const letterSpacings = {
  normal: 'normal',
  tracked: '0.1em',
  tight: '-0.05em',
  mega: '0.25em',
}

const fonts = {
  serif: 'athelas, georgia, times, serif',
  sansSerif:
    '"DM Sans", "Montserrat", -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  cursive: 'Carter One',
}

const borders = [
  0,
  '1px solid',
  '2px solid',
  '4px solid',
  '8px solid',
  '16px solid',
  '32px solid',
]

const radii = [0, 2, 4, 8, 16, 9999, '100%']

const width = [16, 32, 64, 128, 256]

const heights = [16, 32, 64, 128, 256]

const maxWidths = [16, 32, 64, 128, 256, 512, 768, 1024, 1536]

const shadows = ['0px 8px 16px rgba(39,51,51,.24)']

const colors = {
  brand: {
    // primary: '#da7f8f',
    // primary: '#232931',
    // primary: '#FF4647',
    primary: '#0066ff',
    // primary: '#0ACF83',
    // primary: '#008060',
    secondary: '#a6b1e1',
    tertiary: '#dcd6f7',
    quaternary: '#f4eeff',
  },

  utility: {
    action: 'rgba(0, 156, 227, 1)',
    information: 'rgba(77, 102, 128, 1)',
    confirmation: 'rgba(120, 161, 0, 1)',
    warning: 'rgba(242, 182, 0, 1)',
    critical: 'rgba(232, 28, 0, 1)',
    rating: '#FFC120',
    saved: '#E44753',
  },

  modes: {
    light: {
      content: {
        contrast: 'rgba(19, 41, 63, 1)',
        default: 'rgba(19, 41, 63, 0.8)',
        subtle: 'rgba(19, 41, 63, 0.65)',
        nonessential: 'rgba(19, 41, 63, 0.4)',
      },
      layout: {
        divider: 'rgba(167, 174, 181, 0.6)',
        level0: 'rgba(255, 255, 255, 1)',
        level0accent: 'rgba(237, 240, 242, 1)',
        level1: 'rgba(249, 250, 251, 1)',
        level1accent: 'rgba(228, 231, 235, 1)',
        level2: 'rgba(242, 245, 247, 1)',
        level2accent: 'rgba(220, 225, 230, 1)',
        level3: 'rgba(235, 239, 242, 1)',
        level3accent: 'rgba(211, 216, 222, 1)',
      },
    },
    dark: {
      content: {
        contrast: 'rgba(230, 242, 255, 1)',
        default: 'rgba(230, 242, 255, 0.8)',
        subtle: 'rgba(230, 242, 255, 0.65)',
        nonessential: 'rgba(230, 242, 255, 0.4)',
      },
      layout: {
        divider: 'rgba(122, 138, 153, 0.6)',
        level0: 'rgba(16, 20, 23, 1)',
        level0accent: 'rgba(35, 42, 49, 1)',
        level1: 'rgba(25, 31, 36, 1)',
        level1accent: 'rgba(44, 52, 62, 1)',
        level2: 'rgba(35, 42, 49, 1)',
        level2accent: 'rgba(49, 59, 69, 1)',
        level3: 'rgba(53, 63, 74, 1)',
        level3accent: 'rgba(69, 82, 94, 1)',
      },
    },
  },
}

const theme = {
  breakpoints,
  space,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  fonts,
  borders,
  radii,
  width,
  heights,
  maxWidths,
  colors,
  shadows,
}

export type ThemeType = typeof theme

export default theme
