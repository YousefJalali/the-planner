import { createGlobalStyle } from 'styled-components'
import getTheme from '../common/utils/getTheme'

const theme = getTheme('light')
type ThemeType = typeof theme

export default createGlobalStyle<{ theme: ThemeType }>`
  html {
    box-sizing: border-box;
    font-size: 16px;  
  }
  body {
    background-color: ${(props) => props.theme.colors.layout.level2};
    color: ${({ theme }) => theme.colors.content.default};
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: "DM Sans";
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    color: inherit;
  }

  p,
  span {
    color: inherit;
  }

  ol,
  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input, fieldset, textarea {
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    font-family: "DM Sans";
    font-size: ${(props) => props.theme.fontSizes[1]}px;
    line-height: ${(props) => props.theme.lineHeights[0]};
    -webkit-appearance: none;
  }

  input, textarea {
    padding: ${({ theme: { space } }) => `${space[2]}px ${space[1]}px`};
  }

  input, textarea {
    &::placeholder {
      color: ${({ theme: { colors } }) => colors.content.nonessential};
      font-family: "DM Sans";
    }

    &:focus, &:active {
      outline: none;
    }

    &[type='radio'] {
      padding: 0;
    }

    &[type='button'] {
      text-align: left;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &::-webkit-search-decoration {
    -webkit-appearance: none;
    }
  }
  

  textarea {
    resize: none;
  }

  img {
    pointer-events: none
  }

  hr {
    border: 1px solid ${({ theme: { colors } }) => colors.layout.level0accent};
    margin: 0;
  }

  #nprogress .bar {
    background-color: ${({ theme: { colors } }) => colors.brand.primary};
    height: 4px;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px ${({ theme: { colors } }) =>
      colors.brand.primary}, 0 0 5px ${({ theme: { colors } }) =>
  colors.brand.primary};
  }

  #nprogress .spinner-icon {
    border-top-color: ${({ theme: { colors } }) => colors.brand.primary};
    border-left-color: ${({ theme: { colors } }) => colors.brand.primary};
  }

  #modal, #notification {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
  }

  #notification {
    z-index: 2000;
  }

`
