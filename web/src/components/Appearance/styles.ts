import styled from 'styled-components';

/* Thomas boilerplate theme - dark grayscale + Mantine blue accent
 * dark[0]: #C1C2C5, dark[1]: #A6A7AB, dark[2]: #909296, dark[3]: #5c5f66
 * dark[4]: #373A40, dark[5]: #2C2E33, dark[6]: #25262b, dark[7]: #1A1B1E
 * dark[8]: #141517, dark[9]: #101113
 * Mantine blue: #228be6 (primary), #339af0 (hover), #74c0fc (light)
 */
const ACCENT_BLUE = '#228be6';
const ACCENT_BLUE_HOVER = '#339af0';
const ACCENT_BLUE_LIGHT = 'rgba(34, 139, 230, 0.15)';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
  overflow: hidden;
  font-family: 'Nexa-Book', sans-serif;
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
  background: #1A1B1E;
  border: 1px solid #2C2E33;
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
  border-bottom: 1px solid #2C2E33;
`;

export const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25262b;
  border: 1px solid #373A40;
  border-radius: 8px;
  
  svg {
    color: ${ACCENT_BLUE};
    width: 20px;
    height: 20px;
  }
`;

export const HeaderText = styled.div`
  flex: 1;
  
  h1 {
    font-size: 14px;
    font-weight: 600;
    color: #C1C2C5;
    margin: 0 0 2px 0;
  }
  
  p {
    font-size: 11px;
    color: #909296;
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
    background: #101113;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #373A40;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${ACCENT_BLUE};
  }
`;

export const FooterButtons = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: #141517;
  border-top: 1px solid #2C2E33;
`;

interface ActionButtonProps {
  variant?: 'primary' | 'secondary';
}

/* rm-billing style: filled=active/primary, light=inactive, radius sm, normal case */
export const ActionButton = styled.button<ActionButtonProps>`
  flex: 1;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-family: 'Nexa-Book', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) => variant === 'primary' ? `
    background-color: ${ACCENT_BLUE};
    border: none;
    color: #ffffff;
    
    &:hover {
      background-color: ${ACCENT_BLUE_HOVER};
    }
    
    &:active {
      transform: scale(0.98);
    }
  ` : `
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #C1C2C5;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    &:active {
      transform: scale(0.98);
    }
  `}
`;

export const Sidebar = styled.div`
  width: 72px;
  height: calc(100% - 20px);
  background: #1A1B1E;
  border: 1px solid #2C2E33;
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
  background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'transparent'};
  border: 1px solid ${({ active }) => active ? ACCENT_BLUE : '#2C2E33'};
  box-shadow: ${({ active }) => active ? '0 0 0 1px rgba(34, 139, 230, 0.2)' : 'none'};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ active }) => active ? ACCENT_BLUE : '#5c5f66'};
    transition: color 0.2s ease;
  }
  
  span {
    font-size: 9px;
    font-weight: 500;
    color: ${({ active }) => active ? '#C1C2C5' : '#5c5f66'};
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : '#25262b'};
    border-color: ${({ active }) => active ? ACCENT_BLUE : '#373A40'};
    
    svg {
      color: ${({ active }) => active ? ACCENT_BLUE_HOVER : ACCENT_BLUE};
    }
    
    span {
      color: ${({ active }) => active ? '#C1C2C5' : ACCENT_BLUE};
    }
  }
`;

export const SectionWrapper = styled.div`
  border-bottom: 1px solid #2C2E33;
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
    background: #25262b;
    
    span { color: ${ACCENT_BLUE}; }
    svg { color: ${ACCENT_BLUE}; }
  }
  
  span {
    font-size: 12px;
    font-weight: 500;
    color: #C1C2C5;
    transition: color 0.2s ease;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #909296;
    transition: transform 0.25s ease, color 0.2s ease;
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
  color: #909296;
  font-weight: 500;
  font-family: 'Nexa-Book', sans-serif;
`;

export const NumberInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: #2C2E33;
    border-color: #5c5f66;
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
  font-family: 'Nexa-Book', sans-serif;
  
  svg {
    width: 12px;
    height: 12px;
    color: #5c5f66;
  }
  
  &:hover {
    background: #373A40;
    
    svg {
      color: #A6A7AB;
    }
  }
`;

export const NumberValue = styled.span`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #C1C2C5;
  font-weight: 500;
  font-family: 'Nexa-Book', sans-serif;
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
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

interface CameraButtonProps {
  active?: boolean;
}

/* rm-billing tab style */
export const CameraButton = styled.button<CameraButtonProps>`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${({ active }) => active ? ACCENT_BLUE : 'rgba(255, 255, 255, 0.05)'};
  border: ${({ active }) => active ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  svg {
    width: 20px;
    height: 20px;
    color: ${({ active }) => active ? '#ffffff' : '#909296'};
    transition: color 0.15s ease;
  }
  
  span {
    font-size: 8px;
    font-weight: 600;
    color: ${({ active }) => active ? '#ffffff' : '#909296'};
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-family: 'Nexa-Book', sans-serif;
  }
  
  &:hover {
    background-color: ${({ active }) => active ? ACCENT_BLUE_HOVER : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ active }) => active ? 'transparent' : 'rgba(255, 255, 255, 0.2)'};
    
    svg, span {
      color: ${({ active }) => active ? '#ffffff' : '#C1C2C5'};
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
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: 8px;
  padding: 10px 20px;
  z-index: 100;
  
  span {
    font-size: 11px;
    color: #909296;
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
    background: #25262b;
    border: 1px solid #373A40;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    color: ${ACCENT_BLUE};
    font-family: 'Nexa-Book', sans-serif;
  }
`;

export const ControlsDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(34, 139, 230, 0.4);
`;
