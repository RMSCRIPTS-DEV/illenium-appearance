import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';

const defaultTheme: any = {
  id: 'default',
  fontFamily: 'Nexa-Book',

  // Base text colors
  fontColor: '193, 194, 197',          // #C1C2C5
  fontColorHover: '193, 194, 197',
  fontColorSelected: '0, 0, 0',
  mutedTextColor: '144, 146, 150',     // #909296
  mutedTextColorSoft: '92, 95, 102',   // #5c5f66

  // Surfaces / backgrounds
  primaryBackground: '26, 27, 30',         // #1A1B1E
  secondaryBackground: '16, 17, 19',      // #101113
  surfaceBackground: '37, 38, 43',        // #25262b
  surfaceBackgroundAlt: '20, 21, 23',     // #141517
  primaryBackgroundSelected: '55, 58, 64',// #373A40

  // Borders
  borderColor: '44, 46, 51',             // #2C2E33
  borderColorSoft: '55, 58, 64',         // #373A40

  // Accent color (Mantine light blue style)
  accentColor: '202, 55, 25',           //rgb(202, 55, 25)
  accentColorHover: '202, 55, 25',     //rgb(43, 168, 15)

  borderRadius: '4px',
  scaleOnHover: false,
  sectionFontWeight: 'normal',
  smoothBackgroundTransition: false,
};

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const getCurrentTheme = (themeData: any) => {
    for (let index = 0; index < themeData.themes.length; index++) {
      if (themeData.themes[index].id === themeData.currentTheme) {
        return themeData.themes[index];
      }
    }
  };

  const loadTheme = useCallback(async () => {
    // In dev, use the local defaultTheme so edits here apply live
    if (!import.meta.env.PROD) {
      setCurrentTheme(defaultTheme);
      return;
    }

    const themeData = await Nui.post('get_theme_configuration');
    const serverTheme = getCurrentTheme(themeData);
    // Merge server theme over our local defaults so new fields
    // like accentColor still come from App.tsx if not provided by server.
    const nextTheme = serverTheme ? { ...defaultTheme, ...serverTheme } : defaultTheme;
    setCurrentTheme(nextTheme);
  }, []);

  useEffect(() => {
    loadTheme().catch(console.error);
  }, [loadTheme]);

  return (
    <NuiStateProvider>
      <ThemeProvider theme={currentTheme}>
        <Appearance />
        <GlobalStyles />
      </ThemeProvider>
    </NuiStateProvider>
  );
};

export default App;
