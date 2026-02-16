import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: string | ReactNode;
  margin?: string;
  width?: string;
  onClick: () => void;
}

/* rm-billing Pay button style: small, colored, radius sm */
const CustomButton = styled.span<ButtonProps>`
  padding: 6px 12px;
  margin: ${props => props?.margin || "0px"};
  width: ${props => props?.width || "auto"};
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  background-color: #4dabf7;
  border: none;
  text-align: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-family: 'Nexa-Book', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #74c0fc;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const Button = ({ children, onClick, margin, width }: ButtonProps) => {
  return <CustomButton onClick={onClick} margin={margin} width={width}>{children}</CustomButton>;
};

export default Button;
