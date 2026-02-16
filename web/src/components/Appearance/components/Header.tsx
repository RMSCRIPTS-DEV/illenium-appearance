import React from 'react';
import styled from 'styled-components';
import { IconGridDots } from '@tabler/icons-react';

const HeaderWrapper = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(194, 244, 249, 0.15);
`;

const HeaderIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(56, 79, 82, 0.31);
  border: 1px solid rgba(194, 244, 249, 0.15);
  border-radius: 8px;
  
  svg {
    color: #C2F4F9;
    width: 20px;
    height: 20px;
  }
`;

const HeaderText = styled.div`
  flex: 1;
  font-family: 'Bai Jamjuree', sans-serif;
  
  h1 {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin: 0 0 2px 0;
    font-family: 'Bai Jamjuree', sans-serif;
  }
  
  p {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    font-family: 'Bai Jamjuree', sans-serif;
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
