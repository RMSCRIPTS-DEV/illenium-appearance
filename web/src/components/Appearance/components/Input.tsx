import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.span`
  font-size: 11px;
  color: #909296;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: 6px;
  overflow: hidden;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: #2C2E33;
    border-color: #5c5f66;
  }
`;

const Button = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  svg {
    width: 12px;
    height: 12px;
    color: #5c5f66;
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: rgba(34, 139, 230, 0.15);
    border-color: #373A40;
    
    svg {
      color: #228be6;
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

const ValueInput = styled.input`
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #C1C2C5;
  font-weight: 500;
  min-width: 50px;
  background: transparent;
  border: none;
  outline: none;
  height: 32px;
  font-family: 'Nexa-Book', sans-serif;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  -moz-appearance: textfield;
`;

const Input: React.FC<InputProps> = ({ title, min = 0, max = 255, blacklisted = [], defaultValue, clientValue, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const isBlacklisted = function (_value: number, blacklisted: number[]) {
    if (!blacklisted || blacklisted.length === 0) {
      return false;
    }
    for (var i = 0; i < blacklisted.length; i++) {
      // Use strict comparison and handle type coercion
      const blacklistValue = Number(blacklisted[i]);
      if (!isNaN(blacklistValue) && blacklistValue === _value) {
        return true;
      }
    }
    return false;
  }

  const normalize = function (_value: number) {
    if (_value < min) {
      _value = max;
    } else if (_value > max) {
      _value = min;
    }

    return _value;
  }

  const checkBlacklisted = function (_value: number, blacklisted: number[], factor: number, currentValue: number, minVal: number, maxVal: number) {
    // Normalize the input value first
    let targetValue = normalize(_value);
    
    // If no blacklist, just return the normalized value
    if (!blacklisted || blacklisted.length === 0) {
      return targetValue;
    }
    
    if(factor === 0) {
      // Direct input - check if value is blacklisted
      if(!isBlacklisted(targetValue, blacklisted)) {
        return targetValue;
      }
      // If blacklisted, find nearest non-blacklisted value
      factor = targetValue > currentValue ? 1 : -1;
    }

    // When factor is set (button click), check if target value is blacklisted
    // If not blacklisted, return it. If blacklisted, find next non-blacklisted value.
    if (!isBlacklisted(targetValue, blacklisted)) {
      return targetValue;
    }

    // Target value is blacklisted, find next non-blacklisted value
    let nextValue = targetValue;
    let attempts = 0;
    const maxAttempts = maxVal - minVal + 1; // Prevent infinite loops
    
    // Skip blacklisted values in the direction we're moving
    do {
      nextValue = normalize(nextValue + factor);
      attempts++;
      // Safety check to prevent infinite loops
      if (attempts >= maxAttempts) {
        // If we've tried everything, just return the target value (even if blacklisted)
        return targetValue;
      }
    } while (isBlacklisted(nextValue, blacklisted));
    
    return nextValue;
  };

  const getSafeValue = useCallback(
    (_value: number, factor: number, currentValue: number) => {
      let safeValue = _value;
      return checkBlacklisted(safeValue, blacklisted, factor, currentValue, min, max);
    },
    [min, max, blacklisted],
  );

  const handleChange = useCallback(
    (_value: any, factor: number) => {
      let parsedValue;

      if (_value === null || _value === undefined) return;
      if (Number.isNaN(_value)) return;

      if (typeof _value === 'string') {
        parsedValue = parseInt(_value, 10);
        if (isNaN(parsedValue)) return;
      } else {
        parsedValue = _value;
      }

      // Use the current displayed value as the base for comparison
      const baseValue = defaultValue !== undefined ? defaultValue : clientValue;
      const safeValue = getSafeValue(parsedValue, factor, baseValue);
      onChange(safeValue);
    },
    [getSafeValue, onChange, defaultValue, clientValue],
  );

  const labelText = title ? `${title} (${max})` : undefined;

  // Use the most current value for button clicks to avoid stale state issues
  const currentValue = defaultValue !== undefined ? defaultValue : clientValue;

  return (
    <Container>
      {labelText && <Label>{labelText}</Label>}
      <InputWrapper>
        <Button type="button" onClick={() => handleChange(currentValue - 1, -1)}>
          <IconChevronLeft stroke={2} />
        </Button>
        <ValueInput 
          type="number" 
          ref={inputRef} 
          value={defaultValue} 
          onChange={e => handleChange(e.target.value, 0)} 
        />
        <Button type="button" onClick={() => handleChange(currentValue + 1, 1)}>
          <IconChevronRight stroke={2} />
        </Button>
      </InputWrapper>
    </Container>
  );
};

export default Input;
