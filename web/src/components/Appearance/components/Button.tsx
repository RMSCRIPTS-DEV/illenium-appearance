import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: string | ReactNode;
  margin?: string;
  width?: string;
  onClick: () => void;
}

const CustomButton = styled.span<ButtonProps>`
  padding: 5px 12px;
  margin: ${props => props?.margin || "0px"};
  width: ${props => props?.width || "auto"};
  color: #C2F4F9;
  background-color: rgba(56, 79, 82, 0.31);
  border: 1px solid rgba(194, 244, 249, 0.15);
  text-align: center;
  border-radius: ${props => props.theme.borderRadius || "4px"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-weight: 400;
  font-family: 'Bai Jamjuree', sans-serif;
  cursor: pointer;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: rgba(194, 244, 249, 0.15);
    border-color: rgba(194, 244, 249, 0.4);
  }
`;

const Button = ({ children, onClick, margin, width }: ButtonProps) => {
  return <CustomButton onClick={onClick} margin={margin} width={width}>{children}</CustomButton>;
};

export default Button;
