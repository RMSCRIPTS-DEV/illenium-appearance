import { useNuiState } from '../../hooks/nuiState';
import Section from './components/Section';
import Item from './components/Item';
import { Container, FlexWrapper } from './styles';
import SelectTattoo from './components/SelectTattoo';

import { TattoosSettings, TattooList, Tattoo } from './interfaces';
import Button from './components/Button';

interface TattoosProps {
  settings: TattoosSettings;
  data: TattooList;
  storedData: TattooList;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  handleClearTattoos: () => void;
}

const Tattoos = ({ settings, data, storedData, handleApplyTattoo, handlePreviewTattoo, handleDeleteTattoo, handleClearTattoos }: TattoosProps) => {
  const { locales } = useNuiState();

  const { items } = settings;
  const keys = Object.keys(items);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.tattoos.title}>
      {keys.map(key => (
        key !== 'ZONE_HAIR' 
        && 
        <Item key={key} title={locales.tattoos.items[key]}>
          <FlexWrapper>
            <SelectTattoo
              handlePreviewTattoo={handlePreviewTattoo}
              handleApplyTattoo={handleApplyTattoo}
              handleDeleteTattoo={handleDeleteTattoo}
              items={items[key]}
              tattoosApplied={data[key] ?? null}
              settings={settings}
            />
          </FlexWrapper>
        </Item>
      ))}
      <Item>
      <FlexWrapper>
          <Button onClick={() => handleClearTattoos()} width="100%">{locales.tattoos.deleteAll}</Button>
      </FlexWrapper>
      </Item>
    </Section>
  );
};

export default Tattoos;
