import { createGlobalStyle } from '@xstyled/styled-components'

export const GlobalStyle = createGlobalStyle`
  // html, body {
  //    min-height: 100vh;
  //    background-color: layout-level0;
  // }

  // body {
  //   width: 100%;
  //   color: content-default;
  //   font-family: "DM Sans", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
  //     Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  // }

  // input, fieldset, textarea {
  //   border: none;
  //   background-color: transparent;
  //   padding: 0;
  //   margin: 0;
  //   font-family: "DM Sans";
  //   font-size: sm;
  //   line-height: normal;
  //   -webkit-appearance: none;
  //   caret-color: brand-primary;
  // }

  // input {
  //   &[type="text"],
  //   &[type="button"],
  //   &[type="submit"],
  //   &[type="search"] {
  //     -webkit-appearance: none;
  //     border-radius: 2;
  //   }

  //   &[type='radio'] {
  //     padding: 0;
  //   }

  //   &[type='button'] {
  //     text-align: left;
  //   }

  //   &[type=number] {
  //     -moz-appearance: textfield;
  //   }

  //   &::-webkit-outer-spin-button,
  //   &::-webkit-inner-spin-button {
  //     -webkit-appearance: none;
  //     margin: 0;
  //   }

  //   &::-webkit-search-decoration {
  //     -webkit-appearance: none;
  //   }
  // }

  // input, textarea {
  //   color: content-contrast;
    
  //   &::placeholder {
  //     color: content-nonessential;
  //     font-family: "DM Sans";
  //   }

  //   &:focus, &:active {
  //     outline: none;
  //   }
  // }
  


  #nprogress .bar {
    background-color: brand-primary;
    height: 4px;
  }

  #nprogress .peg {
    box-shadow: 0 0 10px brand-primary 0 0 5px brand-primary;
  }

  #nprogress .spinner-icon {
    border-top-color: brand-primary;
    border-left-color: brand-primary;
  }

  #modal, #notification, #prompt {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 900;
  }

  #prompt {
    z-index: 1000;
  }

  #notification {
    z-index: 2000;
  }

`
