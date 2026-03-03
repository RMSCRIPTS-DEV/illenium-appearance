import { useCallback } from 'react';
import styled from 'styled-components';
import { vp } from '../../../styles/scale';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${vp(6)};
`;

const Label = styled.label`
  font-size: ${vp(11)};
  color: #909296;
  font-weight: 500;
`;

const InputWrapper = styled.div`
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

const Button = styled.button`
  width: ${vp(32)};
  height: ${vp(32)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: ${vp(12)};
    height: ${vp(12)};
    color: #5c5f66;
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: rgba(34, 139, 230, 0.15);
    
    svg {
      color: #4dabf7;
    }
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
      
      svg {
        color: #5c5f66;
      }
    }
  }
`;

const Value = styled.span`
  flex: 1;
  text-align: center;
  font-size: ${vp(12)};
  color: #C1C2C5;
  font-weight: 500;
  min-width: ${vp(50)};
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  factor = 1,
  title,
  defaultValue = 0,
  onChange,
}) => {
  const handleDecrement = useCallback(() => {
    const newValue = Math.max(min, defaultValue - factor);
    onChange(Math.round(newValue * 100) / 100);
  }, [defaultValue, min, factor, onChange]);

  const handleIncrement = useCallback(() => {
    const newValue = Math.min(max, defaultValue + factor);
    onChange(Math.round(newValue * 100) / 100);
  }, [defaultValue, max, factor, onChange]);

  const displayValue = factor < 1 
    ? defaultValue.toFixed(1) 
    : defaultValue.toString();

  const labelText = title ? `${title} (${max})` : undefined;

  return (
    <Container>
      {labelText && <Label>{labelText}</Label>}
      <InputWrapper>
        <Button onClick={handleDecrement} disabled={defaultValue <= min}>
          <IconChevronLeft stroke={2} />
        </Button>
        <Value>{displayValue}</Value>
        <Button onClick={handleIncrement} disabled={defaultValue >= max}>
          <IconChevronRight stroke={2} />
        </Button>
      </InputWrapper>
    </Container>
  );
};

export default RangeInput;
