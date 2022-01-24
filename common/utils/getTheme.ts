import { merge, get } from 'lodash'
import theme from '../../styles/theme'

type ColorsType = typeof theme.colors.modes.light

const getTheme = (mode: string) =>
  merge({}, theme, {
    colors: get(theme.colors.modes, mode, theme.colors) as ColorsType,
  })

export default getTheme
