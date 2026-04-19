import React from 'react';
import styled from 'styled-components';
import { IconBuildingStore, IconScissors, IconShirt, IconWriting, IconDatabase, IconRefresh } from '@tabler/icons-react';
import { vp } from '../../../styles/scale';

export type DevStore = 'full' | 'barber' | 'clothing' | 'tattoo';

const Panel = styled.div`
  position: fixed;
  left: ${vp(12)};
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  width: ${vp(140)};
  padding: ${vp(12)};
  background: ${({ theme }) => `rgb(${theme.primaryBackground || '26, 27, 30'})`};
  border: 1px solid ${({ theme }) => `rgb(${theme.borderColor || '44, 46, 51'})`};
  border-radius: ${vp(12)};
  box-shadow: 0 ${vp(4)} ${vp(20)} rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: ${vp(8)};
  font-family: 'Nexa-Book', sans-serif;
`;

const Label = styled.div`
  font-size: ${vp(10)};
  font-weight: 600;
  color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${vp(2)};
`;

const Button = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: ${vp(8)} ${vp(10)};
  display: flex;
  align-items: center;
  gap: ${vp(8)};
  background: ${({ active, theme }) =>
    active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)` : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid
    ${({ active, theme }) =>
      active
        ? `rgb(${theme.accentColor || '77, 171, 247'})`
        : `rgb(${theme.borderColor || '44, 46, 51'})`};
  border-radius: ${vp(6)};
  color: ${({ active, theme }) =>
    active
      ? `rgb(${theme.accentColor || '77, 171, 247'})`
      : `rgb(${theme.fontColor || '193, 194, 197'})`};
  font-size: ${vp(11)};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Nexa-Book', sans-serif;

  svg {
    width: ${vp(14)};
    height: ${vp(14)};
    flex-shrink: 0;
  }

  &:hover {
    background: ${({ active, theme }) =>
      active ? `rgba(${theme.accentColor || '77, 171, 247'}, 0.2)` : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
    color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
  }
`;

const Divider = styled.div`
  height: ${vp(1)};
  background: ${({ theme }) => `rgb(${theme.borderColor || '44, 46, 51'})`};
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
