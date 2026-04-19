import styled from 'styled-components';
import { vp } from '../../styles/scale';

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
  background: ${({ theme }) => `rgba(${theme.secondaryBackground || '16, 17, 19'}, 0.85)`};
  z-index: 1000;
  font-family: 'Nexa-Book', sans-serif;

  p {
    font-size: ${vp(18)};
    font-weight: 600;
    color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
    margin-bottom: ${vp(8)};
    font-family: 'Nexa-Book', sans-serif;
  }

  span {
    font-size: ${vp(13)};
    color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
    margin-bottom: ${vp(28)};
    font-family: 'Nexa-Book', sans-serif;
  }
`;

/* Same light blue style as Hat/Torso/Pants - light tint + blue border */
export const Buttons = styled.div`
  display: flex;
  gap: ${vp(12)};

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
      color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
        color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
      }
    }

    &:first-child {
      background-color: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)`};
      border: 1px solid ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
      color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};

      &:hover {
        background-color: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.25)`};
      }
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;
