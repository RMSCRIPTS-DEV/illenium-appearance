import React from 'react';
import styled from 'styled-components';
import { IconBuildingStore, IconScissors, IconShirt, IconWriting, IconDatabase, IconRefresh } from '@tabler/icons-react';

export type DevStore = 'full' | 'barber' | 'clothing' | 'tattoo';

const ACCENT_BLUE = '#4dabf7';
const ACCENT_BLUE_LIGHT = 'rgba(77, 171, 247, 0.2)';

const Panel = styled.div`
  position: fixed;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  width: 140px;
  padding: 12px;
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Nexa-Book', sans-serif;
`;

const Label = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: #909296;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
`;

const Button = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ active }) => (active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.05)')};
  border: 1px solid ${({ active }) => (active ? ACCENT_BLUE : '#2C2E33')};
  border-radius: 6px;
  color: ${({ active }) => (active ? ACCENT_BLUE : '#C1C2C5')};
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Nexa-Book', sans-serif;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ active }) => (active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.1)')};
    border-color: ${ACCENT_BLUE};
    color: ${ACCENT_BLUE};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #2C2E33;
  margin: 4px 0;
`;

interface DevPanelProps {
  store: DevStore;
  onStoreChange: (store: DevStore) => void;
  onLoadExampleData: () => void;
  onResetData: () => void;
}

const STORE_OPTIONS: { id: DevStore; label: string; icon: React.ElementType }[] = [
  { id: 'full', label: 'Full', icon: IconBuildingStore },
  { id: 'barber', label: 'Barber', icon: IconScissors },
  { id: 'clothing', label: 'Clothing', icon: IconShirt },
  { id: 'tattoo', label: 'Tattoo', icon: IconWriting },
];

const DevPanel: React.FC<DevPanelProps> = ({ store, onStoreChange, onLoadExampleData, onResetData }) => {
  return (
    <Panel>
      <Label>Store</Label>
      {STORE_OPTIONS.map(({ id, label, icon: Icon }) => (
        <Button key={id} active={store === id} onClick={() => onStoreChange(id)}>
          <Icon stroke={1.5} />
          {label}
        </Button>
      ))}
      <Divider />
      <Label>Data</Label>
      <Button onClick={onLoadExampleData}>
        <IconDatabase stroke={1.5} />
        Example data
      </Button>
      <Button onClick={onResetData}>
        <IconRefresh stroke={1.5} />
        Reset data
      </Button>
    </Panel>
  );
};

export default DevPanel;
