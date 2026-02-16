import { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { IconChevronDown } from '@tabler/icons-react';
import { useSpring, animated } from 'react-spring';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
  defaultOpen?: boolean;
}

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #2C2E33;
  user-select: none;
`;

interface HeaderProps {
  expanded: boolean;
}

const Header = styled.button<HeaderProps>`
  width: 100%;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  &:hover {
    background: #25262b;
    
    span { color: #4dabf7; }
    svg { color: #74c0fc; }
  }
  
  span {
    font-size: 13px;
    font-weight: 500;
    color: #C1C2C5;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #4dabf7;
    transition: transform 0.25s ease;
    transform: ${({ expanded }) => expanded ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const Content = styled.div`
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Section: React.FC<SectionProps> = ({ children, title, deps = [], defaultOpen = false }) => {
  const [expanded, setExpanded] = useState(defaultOpen);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const animProps = useSpring({
    height: expanded ? height : 0,
    opacity: expanded ? 1 : 0,
    config: { tension: 300, friction: 30 }
  });

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref, deps]);

  return (
    <Container>
      <Header expanded={expanded} onClick={() => setExpanded(state => !state)}>
        <span>{title}</span>
        <IconChevronDown stroke={1.5} />
      </Header>

      <animated.div style={{ ...animProps, overflow: 'hidden' }}>
        <Content ref={ref}>{children}</Content>
      </animated.div>
    </Container>
  );
};

export default Section;
