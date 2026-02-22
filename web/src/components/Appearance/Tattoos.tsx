import { useNuiState } from '../../hooks/nuiState';
import { ActionButton, TattoosLayout, TattoosScrollArea, TattoosBottomBar, TattoosTitle, TattoosZoneBlock, TattoosZoneLabel } from './styles';
import SelectTattoo from './components/SelectTattoo';

import { TattoosSettings, TattooList, Tattoo } from './interfaces';

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
  const keys = Object.keys(items).filter(key => key !== 'ZONE_HAIR');

  if (!locales) {
    return null;
  }

  return (
    <TattoosLayout>
      <TattoosScrollArea>
        <TattoosTitle>{locales.tattoos.title}</TattoosTitle>
        {keys.map(key => (
          <TattoosZoneBlock key={key}>
            <TattoosZoneLabel>{locales.tattoos.items[key]}</TattoosZoneLabel>
            <SelectTattoo
              handlePreviewTattoo={handlePreviewTattoo}
              handleApplyTattoo={handleApplyTattoo}
              handleDeleteTattoo={handleDeleteTattoo}
              items={items[key]}
              tattoosApplied={data[key] ?? null}
              settings={settings}
            />
          </TattoosZoneBlock>
        ))}
      </TattoosScrollArea>
      <TattoosBottomBar>
        <ActionButton variant="primary" onClick={() => handleClearTattoos()} style={{ width: '100%' }}>
          {locales.tattoos.deleteAll}
        </ActionButton>
      </TattoosBottomBar>
    </TattoosLayout>
  );
};

export default Tattoos;
