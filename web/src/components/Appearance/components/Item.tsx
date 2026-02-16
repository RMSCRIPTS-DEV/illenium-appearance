import styled from 'styled-components';
import { useState, ReactNode } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
}

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(194, 244, 249, 0.1);
`;

interface HeaderProps {
  expanded: boolean;
}

const Header = styled.button<HeaderProps>`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: 'Bai Jamjuree', sans-serif;
  
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

const Content = styled.div`
  padding: 0 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
