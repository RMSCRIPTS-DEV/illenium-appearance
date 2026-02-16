import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';

const defaultTheme: any = {
  id: 'default',
  borderRadius: '4px',
  fontColor: '255, 255, 255',
  fontColorHover: '255, 255, 255',
  fontColorSelected: '0, 0, 0',
  fontFamily: 'Bai Jamjuree',
  primaryBackground: '0, 0, 0',
  primaryBackgroundSelected: '255, 255, 255',
  secondaryBackground: '0, 0, 0',
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
