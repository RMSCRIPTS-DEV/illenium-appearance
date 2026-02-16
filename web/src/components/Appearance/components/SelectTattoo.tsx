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
    background: 'rgba(23, 23, 23, 0.8)',
    fontSize: '14px',
    color: '#fff',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }),
  placeholder: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
  }),
  input: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
  }),
  singleValue: (styles: any) => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
    border: 'none',
    outline: 'none',
  }),
  indicatorContainer: (styles: any) => ({
    ...styles,
    borderColor: '#fff',
    color: '#fff',
  }),
  dropdownIndicator: (styles: any) => ({
    ...styles,
    borderColor: '#fff',
    color: '#fff',
  }),
  menuPortal: (styles: any) => ({
    ...styles,
    color: '#fff',
    zIndex: 9999,
  }),
  menu: (styles: any) => ({
    ...styles,
    background: 'rgba(23, 23, 23, 0.8)',
    position: 'absolute',
    marginBottom: '10px',
    borderRadius: '4px',
  }),
  menuList: (styles: any) => ({
    ...styles,
    background: 'rgba(23, 23, 23, 0.8)',
    borderRadius: '4px',
    '&::-webkit-scrollbar': {
      width: '10px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '4px',
      background: '#fff',
    },
  }),
  option: (styles: any, { isFocused, isSelected }: any) => ({
    ...styles,
    borderRadius: '6px',
    width: '97%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: isSelected ? 'rgba(194, 244, 249, 0.2)' : isFocused ? 'rgba(194, 244, 249, 0.12)' : 'transparent',
    color: isSelected ? '#C2F4F9' : '#ffffff',
    fontFamily: 'Bai Jamjuree, sans-serif',
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
  // Override with theme colors but keep ox_lib styling
  customStyles.control.backgroundColor = `rgba(${themeContext.secondaryBackground || '18, 26, 28'}, 0.95)`;
  customStyles.menu.backgroundColor = `rgba(${themeContext.secondaryBackground || '18, 26, 28'}, 0.95)`;
  customStyles.menuList.backgroundColor = `rgba(${themeContext.secondaryBackground || '18, 26, 28'}, 0.95)`;

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
