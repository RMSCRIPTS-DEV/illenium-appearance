import styled from 'styled-components';
import { vp } from '../../styles/scale';

/* Thomas boilerplate theme - dark grayscale + Mantine light blue accent
 * dark[0]: #C1C2C5, dark[1]: #A6A7AB, dark[2]: #909296, dark[3]: #5c5f66
 * dark[4]: #373A40, dark[5]: #2C2E33, dark[6]: #25262b, dark[7]: #1A1B1E
 * Mantine light blue: #4dabf7 (primary), #74c0fc (hover), rgba(77, 171, 247, 0.2) (light)
 */
const ACCENT_BLUE = '#4dabf7';
const ACCENT_BLUE_HOVER = '#74c0fc';
const ACCENT_BLUE_LIGHT = 'rgba(77, 171, 247, 0.2)';

export const Wrapper = styled.div`
  position: relative;
  z-index: 1000;
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

const PANEL_HEIGHT = `calc(100vh - ${vp(24)})`;

export const MainPanel = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${vp(8)};
  height: ${PANEL_HEIGHT};
  max-height: ${PANEL_HEIGHT};
  margin: ${vp(12)} ${vp(12)} ${vp(12)} 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: ${vp(300)};
  min-width: ${vp(300)};
  height: ${PANEL_HEIGHT};
  max-height: ${PANEL_HEIGHT};
  min-height: 0;
  flex-shrink: 0;
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: ${vp(12)};
  box-shadow: ${vp(10)} 0 ${vp(40)} rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 1;
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;

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
  padding: ${vp(16)} ${vp(16)} ${vp(14)};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: ${vp(12)};
  border-bottom: 1px solid #2C2E33;
`;

export const HeaderIcon = styled.div`
  width: ${vp(40)};
  height: ${vp(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25262b;
  border: 1px solid #373A40;
  border-radius: ${vp(8)};
  
  svg {
    color: ${ACCENT_BLUE};
    width: ${vp(20)};
    height: ${vp(20)};
  }
`;

export const HeaderText = styled.div`
  flex: 1;
  
  h1 {
    font-size: ${vp(14)};
    font-weight: 600;
    color: #C1C2C5;
    margin: 0 0 ${vp(2)} 0;
  }
  
  p {
    font-size: ${vp(11)};
    color: #909296;
    margin: 0;
  }
`;

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 0;

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
  gap: ${vp(8)};
  padding: ${vp(16)} ${vp(16)} ${vp(20)};
  flex-shrink: 0;
  background: #141517;
  border-top: 1px solid #2C2E33;
`;

interface ActionButtonProps {
  variant?: 'primary' | 'secondary';
}

/* Same light blue style as Hat/Torso/Pants - light tint + blue border */
export const ActionButton = styled.button<ActionButtonProps>`
  flex: 1;
  padding: ${vp(8)} ${vp(14)};
  border-radius: ${vp(4)};
  font-size: ${vp(12)};
  font-weight: 600;
  font-family: 'Nexa-Book', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ variant }) => variant === 'primary' ? `
    background-color: ${ACCENT_BLUE_LIGHT};
    border: 1px solid ${ACCENT_BLUE};
    color: ${ACCENT_BLUE};
    
    &:hover {
      background-color: rgba(77, 171, 247, 0.25);
      border-color: ${ACCENT_BLUE};
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
      border-color: ${ACCENT_BLUE};
      color: ${ACCENT_BLUE};
    }
    
    &:active {
      transform: scale(0.98);
    }
  `}
`;

export const Sidebar = styled.div`
  width: ${vp(72)};
  flex-shrink: 0;
  height: ${PANEL_HEIGHT};
  max-height: ${PANEL_HEIGHT};
  min-height: 0;
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: ${vp(12)};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${vp(16)} 0 ${vp(16)} 0;
  gap: ${vp(4)};
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.5);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    border-radius: ${vp(12)};
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
  width: ${vp(56)};
  height: ${vp(56)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vp(4)};
  border-radius: ${vp(8)};
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'transparent'};
  border: 1px solid ${({ active }) => active ? ACCENT_BLUE : '#2C2E33'};
  box-shadow: ${({ active }) => active ? '0 0 0 1px rgba(34, 139, 230, 0.2)' : 'none'};
  
  svg {
    width: ${vp(18)};
    height: ${vp(18)};
    color: ${({ active }) => active ? ACCENT_BLUE : '#5c5f66'};
    transition: color 0.2s ease;
  }
  
  span {
    font-size: ${vp(9)};
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
  padding: ${vp(12)} ${vp(16)};
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
    font-size: ${vp(12)};
    font-weight: 500;
    color: #C1C2C5;
    transition: color 0.2s ease;
  }
  
  svg {
    width: ${vp(14)};
    height: ${vp(14)};
    color: #909296;
    transition: transform 0.25s ease, color 0.2s ease;
    transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

export const SectionContent = styled.div`
  padding: ${vp(16)} ${vp(16)} ${vp(18)};
  display: flex;
  flex-direction: column;
  gap: ${vp(16)};
`;

export const ControlRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vp(6)};
`;

export const ControlLabel = styled.label`
  font-size: ${vp(11)};
  color: #909296;
  font-weight: 500;
  font-family: 'Nexa-Book', sans-serif;
`;

export const NumberInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: ${vp(6)};
  overflow: hidden;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: #2C2E33;
    border-color: #5c5f66;
  }
`;

export const NumberButton = styled.button`
  width: ${vp(32)};
  height: ${vp(32)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  svg {
    width: ${vp(12)};
    height: ${vp(12)};
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
  font-size: ${vp(12)};
  color: #C1C2C5;
  font-weight: 500;
  font-family: 'Nexa-Book', sans-serif;
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: ${vp(8)};

  > div {
    flex: 1;
  }
`;

/* Card-style block for tattoo (and similar) content - matches clothing Item content */
export const CardBlock = styled.div`
  width: 100%;
  padding: ${vp(14)} ${vp(16)};
  background-color: #25262b;
  border: 1px solid #2C2E33;
  border-radius: ${vp(8)};
  display: flex;
  flex-direction: column;
  gap: ${vp(14)};
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #2C2E33;
    border-color: #373A40;
  }
`;

export const CardActionRow = styled.div`
  display: flex;
  gap: ${vp(8)};
  width: 100%;
  margin-top: ${vp(4)};
`;

/* Full-height layout for tattoos: scrollable list + Remove all pinned at bottom */
export const TattoosLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

export const TattoosTitle = styled.div`
  padding: ${vp(14)} ${vp(16)};
  border-bottom: 1px solid #2C2E33;
  font-size: ${vp(13)};
  font-weight: 600;
  color: #C1C2C5;
  font-family: 'Nexa-Book', sans-serif;
`;

export const TattoosZoneBlock = styled.div`
  padding: ${vp(12)} ${vp(16)} ${vp(16)};
  border-bottom: 1px solid #2C2E33;

  &:last-of-type {
    border-bottom: none;
  }
`;

export const TattoosZoneLabel = styled.div`
  font-size: ${vp(11)};
  font-weight: 500;
  color: #909296;
  margin-bottom: ${vp(10)};
  font-family: 'Nexa-Book', sans-serif;
`;

export const TattoosScrollArea = styled.div`
  flex: 1;
  min-height: 0;
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
`;

/* Same as FooterButtons - no card, matches main panel footer */
export const TattoosBottomBar = styled.div`
  flex-shrink: 0;
  display: flex;
  gap: ${vp(8)};
  padding: ${vp(16)} ${vp(16)} ${vp(20)};
  background: #141517;
  border-top: 1px solid #2C2E33;
`;

export const CameraButtons = styled.div`
  position: fixed;
  top: ${vp(20)};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: ${vp(10)};
  padding: ${vp(12)};
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: ${vp(12)};
  box-shadow: 0 ${vp(4)} ${vp(20)} rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

interface CameraButtonProps {
  active?: boolean;
}

/* Same light blue style as Hat/Torso/Pants sidebar buttons */
export const CameraButton = styled.button<CameraButtonProps>`
  width: ${vp(50)};
  height: ${vp(50)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${vp(4)};
  background-color: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.05)'};
  border: ${({ active }) => active ? `1px solid ${ACCENT_BLUE}` : '1px solid rgba(255, 255, 255, 0.1)'};
  border-radius: ${vp(4)};
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  svg {
    width: ${vp(20)};
    height: ${vp(20)};
    color: ${({ active }) => active ? ACCENT_BLUE : '#909296'};
    transition: color 0.15s ease;
  }
  
  span {
    font-size: ${vp(8)};
    font-weight: 600;
    color: ${({ active }) => active ? ACCENT_BLUE : '#909296'};
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-family: 'Nexa-Book', sans-serif;
  }
  
  &:hover {
    background-color: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ active }) => active ? ACCENT_BLUE : 'rgba(255, 255, 255, 0.2)'};
    
    svg, span {
      color: ${({ active }) => active ? ACCENT_BLUE : '#C1C2C5'};
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

export const ControlsInfo = styled.div`
  position: fixed;
  left: 50%;
  bottom: ${vp(20)};
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${vp(20)};
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: ${vp(8)};
  padding: ${vp(10)} ${vp(20)};
  z-index: 100;
  
  span {
    font-size: ${vp(11)};
    color: #909296;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: ${vp(22)};
    height: ${vp(22)};
    padding: 0 ${vp(6)};
    background: #25262b;
    border: 1px solid #373A40;
    border-radius: ${vp(4)};
    font-size: ${vp(11)};
    font-weight: 600;
    color: ${ACCENT_BLUE};
    font-family: 'Nexa-Book', sans-serif;
  }
`;

export const ControlsDivider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(77, 171, 247, 0.4);
`;
