import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { ThemeContext, createGlobalStyle } from 'styled-components';
import Select from 'react-select';
import { useNuiState } from '../../../hooks/nuiState';
import { Tattoo } from '../interfaces';
import RangeInput from './RangeInput';
import { TattoosSettings } from '../interfaces';
import { ActionButton } from '../styles';
import { vp } from '../../../styles/scale';

/* Force tattoo dropdown options to dark theme (no light blue) */
const TattooSelectGlobalStyles = createGlobalStyle<{ theme: any }>`
  [class*="TattooDropdown"][class*="__option"] {
    background-color: transparent !important;
    color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`} !important;
  }
  [class*="TattooDropdown"][class*="__option--is-focused"] {
    background-color: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`} !important;
    color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`} !important;
  }
  [class*="TattooDropdown"][class*="__option--is-selected"] {
    background-color: ${({ theme }) => `rgb(${theme.borderColor || '44, 46, 51'})`} !important;
    color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`} !important;
  }
`;

interface SelectTattooProps {
  items: Tattoo[];
  tattoosApplied: Tattoo[] | null;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  settings: TattoosSettings;
}

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: ${vp(16)};
`;

const ActionRow = styled.div`
  display: flex;
  gap: ${vp(8)};
  width: 100%;
`;

const buildCustomStyles = (theme: any): any => {
  const font = theme?.fontColor ? `rgb(${theme.fontColor})` : '#C1C2C5';
  const muted = theme?.mutedTextColorSoft ? `rgb(${theme.mutedTextColorSoft})` : '#5c5f66';
  const bg = theme?.secondaryBackground ? `rgb(${theme.secondaryBackground})` : '#1A1B1E';
  const surface = theme?.surfaceBackground ? `rgb(${theme.surfaceBackground})` : '#25262b';
  const border = theme?.borderColor ? `rgb(${theme.borderColor})` : '#2C2E33';
  const borderSoft = theme?.borderColorSoft ? `rgb(${theme.borderColorSoft})` : '#373A40';
  const accent = theme?.accentColor ? `rgb(${theme.accentColor})` : '#4dabf7';
  const scrollbarTrack = theme?.secondaryBackground ? `rgb(${theme.secondaryBackground})` : '#101113';

  return {
    control: (styles: any) => ({
      ...styles,
      marginTop: 0,
      width: '100%',
      minWidth: 0,
      background: bg,
      backgroundColor: bg,
      fontSize: '13px',
      color: font,
      border: `1px solid ${border}`,
      borderRadius: '8px',
      outline: 'none',
      boxShadow: 'none',
      minHeight: '40px',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      fontSize: '14px',
      color: muted,
    }),
    input: (styles: any) => ({
      ...styles,
      fontSize: '14px',
      color: font,
    }),
    singleValue: (styles: any) => ({
      ...styles,
      fontSize: '14px',
      color: font,
      border: 'none',
      outline: 'none',
    }),
    indicatorContainer: (styles: any) => ({
      ...styles,
      borderColor: borderSoft,
      color: accent,
    }),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      borderColor: borderSoft,
      color: accent,
    }),
    menuPortal: (styles: any) => ({
      ...styles,
      color: font,
      zIndex: 10050,
    }),
    menu: (styles: any) => ({
      ...styles,
      background: bg,
      backgroundColor: bg,
      position: 'absolute',
      marginBottom: '10px',
      borderRadius: '8px',
      border: `1px solid ${border}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    }),
    menuList: (styles: any) => ({
      ...styles,
      background: bg,
      backgroundColor: bg,
      borderRadius: '4px',
      '&::-webkit-scrollbar': {
        width: '4px',
      },
      '&::-webkit-scrollbar-track': {
        background: scrollbarTrack,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '4px',
        background: borderSoft,
      },
    }),
    option: (styles: any, { isFocused, isSelected }: any) => ({
      ...styles,
      borderRadius: '6px',
      width: '97%',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: isSelected ? border : isFocused ? surface : 'transparent',
      color: font,
      cursor: 'pointer',
      fontFamily: 'Nexa-Book, sans-serif',
    }),
  };
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
  const customStyles = buildCustomStyles(themeContext);

  return (
    <Container>
      <TattooSelectGlobalStyles />
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
        onChange={value => handleChangeOpacity(value)}
      />
      <ActionRow>
        {isTattooApplied ? (
          <ActionButton variant="secondary" onClick={() => handleDeleteTattoo(currentTattoo)}>
            {locales.tattoos.delete}
          </ActionButton>
        ) : (
          <ActionButton variant="primary" onClick={() => handleApplyTattoo(currentTattoo, opacity)}>
            {locales.tattoos.apply}
          </ActionButton>
        )}
      </ActionRow>
    </Container>
  );
};

export default SelectTattoo;
