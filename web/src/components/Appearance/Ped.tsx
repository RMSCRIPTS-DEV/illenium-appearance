import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import SelectInput from './components/SelectInput';

import { PedSettings } from './interfaces';

interface PedProps {
  settings: PedSettings;
  storedData: string;
  data: string;
  handleModelChange: (value: string) => void;
}

const Ped = ({ settings, storedData, data, handleModelChange }: PedProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Item title="Ped" defaultOpen>
      <SelectInput
        title="Custom Ped"
        items={settings.model.items}
        defaultValue={data}
        clientValue={storedData}
        onChange={value => handleModelChange(value)}
      />
    </Item>
  );
};

export default Ped;
