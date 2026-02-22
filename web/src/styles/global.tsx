import { createGlobalStyle } from 'styled-components';
import nexafont from '../fonts/Nexa-Book.ttf';

const isDev = !import.meta.env.PROD;

export default createGlobalStyle<{theme: any}>`
  @font-face {
    font-family: 'Nexa-Book';
    src: url(${nexafont}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    user-select: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  body {
    font-family: 'Nexa-Book', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    color: #C1C2C5;
    
    /* Dev mode background - Thomas boilerplate FiveM POV image (no dark overlay) */
    ${isDev ? `
      background: url('https://i.imgur.com/kiK65kg.jpeg') center center / cover no-repeat;
      min-height: 100vh;
    ` : `
      background: transparent;
    `}
  }

  button {
    cursor: pointer;
    outline: 0;
    font-family: inherit;
  }

  input, select, textarea {
    font-family: inherit;
  }

  p {
    margin: 0;
    padding: 0;
    font-family: 'Nexa-Book', sans-serif;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    display: none;
  }
`;
