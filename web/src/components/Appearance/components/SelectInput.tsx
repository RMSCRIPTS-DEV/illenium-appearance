import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IconChevronDown, IconSearch } from '@tabler/icons-react';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
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
  text-transform: uppercase;
`;

const SelectButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  font-family: 'Nexa-Book', sans-serif;
  
  span {
    font-size: 12px;
    color: #C1C2C5;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: #228be6;
    transition: transform 0.25s ease;
    transform: ${({ isOpen }) => isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
  
  &:hover {
    background-color: #2C2E33;
    border-color: #228be6;
    
    svg { color: #339af0; }
  }
`;

const Dropdown = styled.div`
  width: 100%;
  background: #1A1B1E;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #2C2E33;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
`;

const SearchWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #2C2E33;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background-color: #25262b;
  border: 1px solid #373A40;
  border-radius: 6px;
  
  svg {
    width: 14px;
    height: 14px;
    color: #5c5f66;
  }
  
  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 12px;
    color: #C1C2C5;
    font-family: 'Nexa-Book', sans-serif;
    
    &::placeholder {
      color: #5c5f66;
    }
    
    &:focus {
      outline: none;
      border-color: #5c5f66;
    }
  }
`;

const OptionsList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 6px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #101113;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #373A40;
    border-radius: 4px;
  }
`;

const Option = styled.button<{ isSelected: boolean }>`
  width: 100%;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ isSelected }) => isSelected ? 'rgba(34, 139, 230, 0.15)' : 'transparent'};
  border: 1px solid ${({ isSelected }) => isSelected ? '#228be6' : 'transparent'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: left;
  font-family: 'Nexa-Book', sans-serif;
  
  &:hover {
    background: rgba(34, 139, 230, 0.12);
    border-color: rgba(34, 139, 230, 0.3);
  }
`;

const OptionIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #25262b;
  border: 1px solid #373A40;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #C1C2C5;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const OptionLabel = styled.span`
  font-size: 12px;
  color: #C1C2C5;
`;

const SelectInput = ({ title, items, defaultValue, clientValue, onChange }: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredItems = items.filter(item => 
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
    setSearchTerm('');
  };

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container ref={containerRef}>
      <Label>{title}</Label>
      <SelectButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{defaultValue || 'Select'}</span>
        <IconChevronDown stroke={1.5} />
      </SelectButton>
      
      {isOpen && (
        <Dropdown>
          <SearchWrapper>
            <SearchInput>
              <IconSearch stroke={1.5} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInput>
          </SearchWrapper>
          <OptionsList>
            {filteredItems.map((item) => (
              <Option
                key={item}
                isSelected={item === defaultValue}
                onClick={() => handleSelect(item)}
              >
                <OptionIcon>
                  {item.substring(0, 2).toUpperCase()}
                </OptionIcon>
                <OptionLabel>{item}</OptionLabel>
              </Option>
            ))}
            {filteredItems.length === 0 && (
              <Option isSelected={false} disabled>
                <OptionLabel>No results found</OptionLabel>
              </Option>
            )}
          </OptionsList>
        </Dropdown>
      )}
    </Container>
  );
};

export default SelectInput;
