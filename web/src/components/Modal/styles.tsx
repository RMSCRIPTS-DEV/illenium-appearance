import styled from 'styled-components';

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
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  font-family: 'Bai Jamjuree', sans-serif;

  p {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 8px;
    font-family: 'Bai Jamjuree', sans-serif;
  }

  span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 28px;
    font-family: 'Bai Jamjuree', sans-serif;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;

  button {
    min-width: 120px;
    padding: 12px 24px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: 'Bai Jamjuree', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background-color: rgba(56, 79, 82, 0.31);
    border: 1px solid rgba(194, 244, 249, 0.15);
    color: #C2F4F9;

    &:hover {
      background-color: rgba(194, 244, 249, 0.15);
      border-color: rgba(194, 244, 249, 0.4);
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`;
