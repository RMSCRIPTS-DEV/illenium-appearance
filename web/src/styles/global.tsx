import { createGlobalStyle } from 'styled-components';

const isDev = !import.meta.env.PROD;

export default createGlobalStyle<{theme: any}>`
  @import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    user-select: none;
    scrollbar-width: thin;
    scrollbar-color: rgba(194, 244, 249, 0.3) rgba(194, 244, 249, 0.05);
  }
  
  body {
    font-family: 'Bai Jamjuree', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    color: #ffffff;
    
    /* Dev mode background - matches ox_inventory dark teal theme */
    ${isDev ? `
      background: linear-gradient(145deg, rgba(18, 26, 28, 1) 0%, rgba(12, 18, 20, 1) 100%);
      background-size: cover;
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
    font-family: 'Bai Jamjuree', sans-serif;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(194, 244, 249, 0.05);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(194, 244, 249, 0.3);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(194, 244, 249, 0.5);
  }
`;
