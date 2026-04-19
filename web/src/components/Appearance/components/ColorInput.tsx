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
  color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
  font-weight: 500;
`;

const ColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${vp(5)};
  padding: ${vp(10)};
  background-color: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: ${vp(6)};
`;

const ColorButton = styled.button<ButtonProps>`
  width: ${vp(22)};
  height: ${vp(22)};
  border-radius: ${vp(4)};
  border: 2px solid
    ${({ selected, theme }) =>
      selected
        ? `rgb(${theme.accentColor || '77, 171, 247'})`
        : `rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ selected, theme }) =>
    selected ? `0 0 8px rgba(${theme.accentColor || '77, 171, 247'}, 0.4)` : 'none'};

  &:hover {
    border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
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
