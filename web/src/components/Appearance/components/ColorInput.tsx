import { useCallback } from 'react';
import styled from 'styled-components';
import { vp } from '../../../styles/scale';

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
  gap: ${vp(8)};
`;

const Label = styled.span`
  font-size: ${vp(11)};
  color: #909296;
  font-weight: 500;
`;

const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${vp(5)};
  padding: ${vp(10)};
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: ${vp(6)};
`;

const ColorButton = styled.button<ButtonProps>`
  width: ${vp(22)};
  height: ${vp(22)};
  border-radius: ${vp(4)};
  border: 2px solid ${({ selected }) => selected ? '#4dabf7' : '#373A40'};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ selected }) => selected ? '0 0 8px rgba(34, 139, 230, 0.4)' : 'none'};

  &:hover {
    border-color: #4dabf7;
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
