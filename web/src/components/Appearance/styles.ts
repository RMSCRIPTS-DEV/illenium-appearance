import styled from 'styled-components';

// Color theme matching ox_inventory cyan/teal style
// Main: rgba(18, 26, 28, 0.87) - dark teal
// Accent: #C2F4F9 - cyan
// Border: rgba(194, 244, 249, 0.4) - cyan border
// Slot: rgba(56, 79, 82, 0.31)

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  overflow: hidden;
  font-family: 'Bai Jamjuree', sans-serif;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }
`;

export const MainPanel = styled.div`
  display: flex;
  height: 100%;
`;

export const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: calc(100% - 20px);
  background: rgba(18, 26, 28, 0.87);
  border: 1px solid rgba(194, 244, 249, 0.4);
  border-radius: 12px;
  margin: 10px 0;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    border-radius: 12px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    opacity: 0.08;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const Header = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(194, 244, 249, 0.15);
`;

export const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(56, 79, 82, 0.31);
  border: 1px solid rgba(194, 244, 249, 0.3);
  border-radius: 8px;
  
  svg {
    color: #C2F4F9;
    width: 20px;
    height: 20px;
  }
`;

export const HeaderText = styled.div`
  flex: 1;
  
  h1 {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 2px 0;
  }
  
  p {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(194, 244, 249, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(194, 244, 249, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(194, 244, 249, 0.5);
  }
`;

export const FooterButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(12, 18, 20, 0.95);
  border-top: 1px solid rgba(194, 244, 249, 0.15);
`;

interface ActionButtonProps {
  variant?: 'primary' | 'secondary';
}

export const ActionButton = styled.button<ActionButtonProps>`
  flex: 1;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Bai Jamjuree', sans-serif;
  cursor: pointer;
  transition: all 0.15s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  ${({ variant }) => variant === 'primary' ? `
    background-color: rgba(56, 79, 82, 0.31);
    border: 1px solid rgba(194, 244, 249, 0.15);
    color: #C2F4F9;
    
    &:hover {
      background-color: rgba(194, 244, 249, 0.08);
      border-color: rgba(194, 244, 249, 0.3);
    }
    
    &:active {
      transform: scale(0.98);
    }
  ` : `
    background-color: rgba(56, 79, 82, 0.31);
    border: 1px solid rgba(194, 244, 249, 0.15);
    color: #C2F4F9;
    
    &:hover {
      background-color: rgba(194, 244, 249, 0.08);
      border-color: rgba(194, 244, 249, 0.3);
    }
    
    &:active {
      transform: scale(0.98);
    }
  `}
`;

export const Sidebar = styled.div`
  width: 72px;
  height: calc(100% - 20px);
  background: rgba(18, 26, 28, 0.87);
  border: 1px solid rgba(194, 244, 249, 0.4);
  border-radius: 12px;
  margin: 10px 10px 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 4px;
  overflow-y: auto;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.5);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    border-radius: 12px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    opacity: 0.08;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`;

interface SidebarItemProps {
  active?: boolean;
}

export const SidebarItem = styled.button<SidebarItemProps>`
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active }) => active ? 'rgba(194, 244, 249, 0.15)' : 'rgba(56, 79, 82, 0.31)'};
  border: 1px solid ${({ active }) => active ? 'rgba(194, 244, 249, 0.5)' : 'rgba(194, 244, 249, 0.2)'};
  box-shadow: ${({ active }) => active ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05)' : 'none'};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ active }) => active ? '#C2F4F9' : 'rgba(255, 255, 255, 0.5)'};
    transition: color 0.2s ease;
  }
  
  span {
    font-size: 9px;
    font-weight: 500;
    color: ${({ active }) => active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: rgba(194, 244, 249, 0.12);
    border-color: rgba(194, 244, 249, 0.4);
    
    svg {
      color: #C2F4F9;
    }
    
    span {
      color: #ffffff;
    }
  }
`;

export const SectionWrapper = styled.div`
  border-bottom: 1px solid rgba(194, 244, 249, 0.1);
`;

interface SectionHeaderProps {
  expanded?: boolean;
}

export const SectionHeader = styled.button<SectionHeaderProps>`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(194, 244, 249, 0.08);
  }
  
  span {
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #C2F4F9;
    transition: transform 0.25s ease;
    transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

export const SectionContent = styled.div`
  padding: 0 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ControlRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ControlLabel = styled.label`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 500;
  font-family: 'Bai Jamjuree', sans-serif;
`;

export const NumberInput = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(56, 79, 82, 0.31);
  border: 1px solid rgba(194, 244, 249, 0.15);
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: rgba(194, 244, 249, 0.15);
    border-color: rgba(194, 244, 249, 0.4);
  }
`;

export const NumberButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Bai Jamjuree', sans-serif;
  
  svg {
    width: 12px;
    height: 12px;
    color: rgba(194, 244, 249, 0.5);
  }
  
  &:hover {
    background: rgba(194, 244, 249, 0.15);
    
    svg {
      color: #C2F4F9;
    }
  }
`;

export const NumberValue = styled.span`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
  font-family: 'Bai Jamjuree', sans-serif;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;

  > div {
    flex: 1;
  }
`;

export const CameraButtons = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 12px;
  background: rgba(18, 26, 28, 0.95);
  border: 1px solid rgba(194, 244, 249, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

interface CameraButtonProps {
  active?: boolean;
}

export const CameraButton = styled.button<CameraButtonProps>`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${({ active }) => active ? 'rgba(194, 244, 249, 0.12)' : 'rgba(56, 79, 82, 0.31)'};
  border: 1px solid ${({ active }) => active ? 'rgba(194, 244, 249, 0.4)' : 'rgba(194, 244, 249, 0.15)'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Bai Jamjuree', sans-serif;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ active }) => active ? '#C2F4F9' : 'rgba(194, 244, 249, 0.6)'};
    transition: color 0.15s ease;
  }
  
  span {
    font-size: 8px;
    font-weight: 600;
    color: ${({ active }) => active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-family: 'Bai Jamjuree', sans-serif;
  }
  
  &:hover {
    background-color: rgba(194, 244, 249, 0.08);
    border-color: rgba(194, 244, 249, 0.3);
    
    svg {
      color: #C2F4F9;
    }
    
    span {
      color: rgba(255, 255, 255, 0.9);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const ControlsInfo = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background: rgba(18, 26, 28, 0.87);
  border: 1px solid rgba(194, 244, 249, 0.3);
  border-radius: 8px;
  padding: 10px 20px;
  z-index: 100;
  
  span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    background: rgba(56, 79, 82, 0.5);
    border: 1px solid rgba(194, 244, 249, 0.4);
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    color: #C2F4F9;
    font-family: 'Bai Jamjuree', sans-serif;
  }
`;

export const ControlsDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(194, 244, 249, 0.3);
`;
