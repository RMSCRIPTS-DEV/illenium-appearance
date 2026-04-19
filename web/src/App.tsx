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

  // Accent color (monochrome black & white theme)
  accentColor: '255, 255, 255',        // #FFFFFF
  accentColorHover: '230, 230, 230',   // #E6E6E6
  
  // mantine blue theme if want just uncomment this and comment the above
  // accentColor: '77, 171, 247',         // #4dabf7
  // accentColorHover: '116, 192, 252',   // #74c0fc

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

    // Let the server theme fill in anything it cares about (e.g. id, fontFamily,
    // borderRadius, smoothBackgroundTransition), but always let the local
    // defaultTheme win for colors so any change made here applies in-game too.
    const nextTheme = serverTheme
      ? { ...serverTheme, ...defaultTheme }
      : defaultTheme;

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
