import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';

const defaultTheme: any = {
  id: 'default',
  borderRadius: '4px',
  fontColor: '193, 194, 197',
  fontColorHover: '193, 194, 197',
  fontColorSelected: '0, 0, 0',
  fontFamily: 'Nexa-Book',
  primaryBackground: '26, 27, 30',
  primaryBackgroundSelected: '55, 58, 64',
  secondaryBackground: '16, 17, 19',
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
    const themeData = await Nui.post('get_theme_configuration');
    setCurrentTheme(getCurrentTheme(themeData));
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
