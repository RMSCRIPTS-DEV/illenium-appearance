import { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { vp } from '../../../styles/scale';
import { IconChevronLeft, IconChevronRight, IconLayoutGrid } from '@tabler/icons-react';
import ThumbnailGrid from './ThumbnailGrid';
import { ThumbKind, ThumbGender } from '../../../utils/thumbnails';

interface ThumbnailRef {
  kind: ThumbKind;
  id: number;
  gender: ThumbGender;
}

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
  thumbnail?: ThumbnailRef;
}

const GRID_MODE_KEY = 'illenium_grid_mode_v1';

const readGridMode = (): boolean => {
  try {
    return localStorage.getItem(GRID_MODE_KEY) === '1';
  } catch {
    return false;
  }
};

const writeGridMode = (on: boolean) => {
  try {
    localStorage.setItem(GRID_MODE_KEY, on ? '1' : '0');
  } catch {
    /* noop */
  }
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${vp(10)};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${vp(8)};
`;

const Label = styled.span`
  font-size: ${vp(11)};
  color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
  font-weight: 500;
`;

interface GridToggleProps {
  active: boolean;
}

const GridToggle = styled.button<GridToggleProps>`
  width: ${vp(22)};
  height: ${vp(22)};
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: ${vp(1)} solid ${({ theme }) => `rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: ${vp(4)};
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    width: ${vp(12)};
    height: ${vp(12)};
    color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
    transition: color 0.15s ease;
  }

  &:hover {
    border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    svg { color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`}; }
  }

  ${({ active, theme }) => active && css`
    background: rgba(${theme.accentColor || '77, 171, 247'}, 0.15);
    border-color: rgb(${theme.accentColor || '77, 171, 247'});
    svg { color: rgb(${theme.accentColor || '77, 171, 247'}); }
  `}
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: ${vp(6)};
  overflow: hidden;
  transition: all 0.15s ease;
  
  &:hover {
    background-color: ${({ theme }) => `rgb(${theme.primaryBackgroundSelected || '55, 58, 64'})`};
    border-color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
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
    color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.15)`};
    border-color: ${({ theme }) => `1px solid rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
    
    svg {
      color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    }
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
      
      svg {
        color: ${({ theme }) => `rgb(${theme.mutedTextColorSoft || '92, 95, 102'})`};
      }
    }
  }
`;

const ValueInput = styled.input`
  flex: 1;
  text-align: center;
  font-size: ${vp(12)};
  color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
  font-weight: 500;
  min-width: ${vp(50)};
  background: transparent;
  border: none;
  outline: none;
  height: ${vp(32)};
  font-family: 'Nexa-Book', sans-serif;
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  -moz-appearance: textfield;
`;

const Input: React.FC<InputProps> = ({ title, min = 0, max = 255, blacklisted = [], defaultValue, clientValue, onChange, thumbnail }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [gridMode, setGridMode] = useState<boolean>(() => readGridMode());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === GRID_MODE_KEY) setGridMode(e.newValue === '1');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleGridMode = useCallback(() => {
    setGridMode(prev => {
      const next = !prev;
      writeGridMode(next);
      return next;
    });
  }, []);

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

  const showGrid = !!thumbnail && gridMode;

  return (
    <Container>
      {(labelText || thumbnail) && (
        <LabelRow>
          {labelText ? <Label>{labelText}</Label> : <span />}
          {thumbnail && (
            <GridToggle
              type="button"
              active={gridMode}
              onClick={toggleGridMode}
              title={gridMode ? 'Hide thumbnails' : 'Show thumbnails'}
            >
              <IconLayoutGrid stroke={2} />
            </GridToggle>
          )}
        </LabelRow>
      )}
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
      {showGrid && thumbnail && (
        <ThumbnailGrid
          kind={thumbnail.kind}
          id={thumbnail.id}
          gender={thumbnail.gender}
          min={min}
          max={max}
          selected={defaultValue}
          blacklisted={blacklisted}
          onSelect={value => handleChange(value, 0)}
        />
      )}
    </Container>
  );
};

export default Input;
