import { useCallback } from 'react';
import styled from 'styled-components';

interface ColorInputProps {
  title?: string;
  colors?: number[][];
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  selected: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 11px;
  color: #909296;
  font-weight: 500;
`;

const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: 6px;
`;

const ColorButton = styled.button<ButtonProps>`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 2px solid ${({ selected }) => selected ? '#228be6' : '#373A40'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ selected }) => selected ? '0 0 8px rgba(34, 139, 230, 0.4)' : 'none'};

  &:hover {
    border-color: #228be6;
    transform: scale(1.1);
  }
`;

const ColorInput: React.FC<ColorInputProps> = ({ title, colors = [], defaultValue, onChange }) => {
  const selectColor = useCallback(
    (color: number) => {
      onChange(color);
    },
    [onChange],
  );

  return (
    <Container>
      {title && <Label>{title}</Label>}
      <ColorsWrapper>
        {colors.map((color, index) => (
          <ColorButton
            key={index}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            selected={defaultValue === index}
            onClick={() => selectColor(index)}
          />
        ))}
      </ColorsWrapper>
    </Container>
  );
};

export default ColorInput;
