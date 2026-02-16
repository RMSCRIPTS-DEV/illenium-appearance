import styled from 'styled-components';

const ACCENT_BLUE = '#4dabf7';
const ACCENT_BLUE_LIGHT = 'rgba(77, 171, 247, 0.2)';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: rgba(16, 17, 19, 0.85);
  z-index: 1000;
  font-family: 'Nexa-Book', sans-serif;

  p {
    font-size: 18px;
    font-weight: 600;
    color: #C1C2C5;
    margin-bottom: 8px;
    font-family: 'Nexa-Book', sans-serif;
  }

  span {
    font-size: 13px;
    color: #909296;
    margin-bottom: 28px;
    font-family: 'Nexa-Book', sans-serif;
  }
`;

/* Same light blue style as Hat/Torso/Pants - light tint + blue border */
export const Buttons = styled.div`
  display: flex;
  gap: 12px;

  button {
    min-width: 100px;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: 'Nexa-Book', sans-serif;

    &:last-child {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #C1C2C5;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: ${ACCENT_BLUE};
        color: ${ACCENT_BLUE};
      }
    }
    
    &:first-child {
      background-color: ${ACCENT_BLUE_LIGHT};
      border: 1px solid ${ACCENT_BLUE};
      color: ${ACCENT_BLUE};
      
      &:hover {
        background-color: rgba(77, 171, 247, 0.25);
      }
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`;
