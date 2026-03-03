import styled from 'styled-components';
import { useState, ReactNode } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { vp } from '../../../styles/scale';

interface ItemProps {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #2C2E33;
`;

interface HeaderProps {
  expanded: boolean;
}

const Header = styled.button<HeaderProps>`
  width: 100%;
  padding: ${vp(12)} ${vp(16)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Nexa-Book', sans-serif;
  
  span {
    font-size: ${vp(12)};
    font-weight: 500;
    color: #C1C2C5;
  }
  
  svg {
    width: ${vp(14)};
    height: ${vp(14)};
    color: #4dabf7;
    transition: transform 0.25s ease;
    transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Content = styled.div`
  padding: ${vp(16)} ${vp(16)} ${vp(18)};
  display: flex;
  flex-direction: column;
  gap: ${vp(16)};
`;

const Item: React.FC<ItemProps> = ({ children, title, defaultOpen = false }) => {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <Container>
      <Header expanded={expanded} onClick={() => setExpanded(!expanded)}>
        <span>{title}</span>
        <IconChevronDown stroke={1.5} />
      </Header>
      {expanded && <Content>{children}</Content>}
    </Container>
  );
};

export default Item;
