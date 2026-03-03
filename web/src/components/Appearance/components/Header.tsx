import React from 'react';
import styled from 'styled-components';
import { IconGridDots } from '@tabler/icons-react';
import { vp } from '../../../styles/scale';

const HeaderWrapper = styled.div`
  padding: ${vp(16)};
  display: flex;
  align-items: center;
  gap: ${vp(12)};
  border-bottom: 1px solid #2C2E33;
`;

const HeaderIcon = styled.div`
  width: ${vp(40)};
  height: ${vp(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: ${vp(8)};
  
  svg {
    color: #4dabf7;
    width: ${vp(20)};
    height: ${vp(20)};
  }
`;

const HeaderText = styled.div`
  flex: 1;
  font-family: 'Nexa-Book', sans-serif;
  
  h1 {
    font-size: ${vp(14)};
    font-weight: 600;
    color: #C1C2C5;
    margin: 0 0 2px 0;
    font-family: 'Nexa-Book', sans-serif;
  }
  
  p {
    font-size: ${vp(11)};
    color: #909296;
    margin: 0;
    font-family: 'Nexa-Book', sans-serif;
  }
`;

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Appearance Editor', 
  subtitle = 'Customize your character' 
}) => {
  return (
    <HeaderWrapper>
      <HeaderIcon>
        <IconGridDots stroke={1.5} />
      </HeaderIcon>
      <HeaderText>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </HeaderText>
    </HeaderWrapper>
  );
};

export default Header;
