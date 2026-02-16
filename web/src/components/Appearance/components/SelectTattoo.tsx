import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';
import { useNuiState } from '../../../hooks/nuiState';
import Button from './Button';
import { Tattoo } from '../interfaces';
import RangeInput from './RangeInput';
import { TattoosSettings } from '../interfaces';

interface SelectTattooProps {
  items: Tattoo[];
  tattoosApplied: Tattoo[] | null;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  settings: TattoosSettings;
}

const Container = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 10px;

  > section {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const customStyles: any = {
  control: (styles: any) => ({
    ...styles,
    marginTop: '10px',
    background: '#1A1B1E',
    fontSize: '14px',
    color: '#C1C2C5',
    border: '1px solid #2C2E33',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#5c5f66',
  }),
  input: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#C1C2C5',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#C1C2C5',
    border: 'none',
    outline: 'none',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    borderColor: '#373A40',
    color: '#4dabf7',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    borderColor: '#373A40',
    color: '#4dabf7',
  }),
  menuPortal: (styles: any) => ({
    ...styles,
    color: '#C1C2C5',
    zIndex: 9999,
  }),
  menu: (styles: any) => ({
    ...styles,
    background: '#1A1B1E',
    position: 'absolute',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #2C2E33',
  }),
  menuList: (styles: any) => ({
    ...styles,
    background: '#1A1B1E',
    borderRadius: '4px',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#101113',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '4px',
      background: '#373A40',
    },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    borderRadius: '6px',
    width: '97%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: isSelected ? 'rgba(34, 139, 230, 0.15)' : isFocused ? 'rgba(34, 139, 230, 0.08)' : 'transparent',
    color: isSelected ? '#4dabf7' : isFocused ? '#4dabf7' : '#A6A7AB',
    fontFamily: 'Nexa-Book, sans-serif',
  }),
};

const SelectTattoo = ({
  items,
  tattoosApplied,
  handleApplyTattoo,
  handlePreviewTattoo,
  handleDeleteTattoo,
  settings
}: SelectTattooProps) => {
  const defaultOpacity = 0.1;
  const selectRef = useRef<any>(null);
  const [currentTattoo, setCurrentTattoo] = useState<Tattoo>(items[0]);
  const [opacity, setOpacity] = useState<number>(defaultOpacity);
  const { label } = currentTattoo;
  const { locales } = useNuiState();

  const clientOpacity = useCallback(() => {
    if (!tattoosApplied) return defaultOpacity;
    const { name } = currentTattoo;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) { 
        return tattoosApplied[i].opacity ?? defaultOpacity;
      }
    }

    return defaultOpacity;
  }, [currentTattoo, tattoosApplied])();

  useEffect(() => {
    setOpacity(clientOpacity);
  }, [clientOpacity]);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      handlePreviewTattoo(event.value, opacity);
      setCurrentTattoo(event.value);
    }
  };

  const handleChangeOpacity = useCallback((value : number) => {    
    setOpacity(value);
    handlePreviewTattoo(currentTattoo, value);
  }, [currentTattoo]);

  const onMenuOpen = () => {
    setTimeout(() => {
      const selectedEl = document.getElementsByClassName("TattooDropdown" + items[0].zone + "__option--is-selected")[0];
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
      }
    }, 100);
  };

  const isTattooApplied = useCallback(() => {
    if (!tattoosApplied) return false;
    const { name } = currentTattoo;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tattoosApplied.length; i++) {
      const { name: nameApplied } = tattoosApplied[i];
      if (nameApplied === name) return true;
    }

    return false;
  }, [tattoosApplied, currentTattoo])();

  if (!locales) {
    return null;
  }

  const themeContext = useContext(ThemeContext);
  // Override with theme colors - Thomas boilerplate dark
  customStyles.control.backgroundColor = themeContext?.secondaryBackground ? `rgb(${themeContext.secondaryBackground})` : '#1A1B1E';
  customStyles.menu.backgroundColor = themeContext?.secondaryBackground ? `rgb(${themeContext.secondaryBackground})` : '#1A1B1E';
  customStyles.menuList.backgroundColor = themeContext?.secondaryBackground ? `rgb(${themeContext.secondaryBackground})` : '#1A1B1E';

  return (
    <Container>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item.label }))}
        value={{ value: currentTattoo, label }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={"TattooDropdown" + items[0].zone}
        classNamePrefix={"TattooDropdown" + items[0].zone}
        menuPortalTarget={document.body}
        menuShouldScrollIntoView={true}
      />
      <RangeInput
              title={locales.tattoos.opacity}
              min={settings.opacity.min}
              max={settings.opacity.max}
              factor={settings.opacity.factor}
              defaultValue={opacity}
              clientValue={clientOpacity}
              onChange={value => handleChangeOpacity(value)} />
      <section>
        {isTattooApplied ? (
          <Button onClick={() => handleDeleteTattoo(currentTattoo)}>{locales.tattoos.delete}</Button>
        ) : (
          <Button onClick={() => handleApplyTattoo(currentTattoo, opacity)}>{locales.tattoos.apply}</Button>
        )}
      </section>
    </Container>
  );
};

export default SelectTattoo;
