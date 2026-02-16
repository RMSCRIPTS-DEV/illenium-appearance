import React from 'react';
import styled from 'styled-components';
import {
  IconUser,
  IconMoodSmile,
  IconEye,
  IconDroplet,
  IconScissors,
  IconBrush,
  IconWriting,
  IconShirt,
  IconDeviceWatch,
} from '@tabler/icons-react';
import { FaHatCowboy, FaTshirt } from 'react-icons/fa';
import { GiTrousers } from 'react-icons/gi';
import { ClothesState } from '../interfaces';

interface SidebarConfig {
  ped?: boolean;
  headBlend?: boolean;
  faceFeatures?: boolean;
  headOverlays?: boolean;
  components?: boolean;
  props?: boolean;
  tattoos?: boolean;
}

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  config?: SidebarConfig;
  clothes?: ClothesState;
  onSetClothes?: (key: keyof ClothesState) => void;
}

/* Mantine light blue accent - same as styles.ts */
const ACCENT_BLUE = '#4dabf7';
const ACCENT_BLUE_HOVER = '#74c0fc';
const ACCENT_BLUE_LIGHT = 'rgba(77, 171, 247, 0.2)';

const SidebarContainer = styled.div`
  width: 72px;
  height: calc(100% - 20px);
  background: #1A1B1E;
  border: 1px solid #2C2E33;
  border-radius: 12px;
  margin: 10px 10px 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 4px;
  overflow-y: auto;
  justify-content: flex-start;
  box-shadow: 10px 0 40px rgba(0, 0, 0, 0.5);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    border-radius: 12px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
    opacity: 0.08;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  &::-webkit-scrollbar {
    width: 0;
  }
`;

interface SidebarItemProps {
  active: boolean;
}

/* Same light blue style as Hat/Torso/Pants buttons - light tint + blue border when active */
const SidebarItem = styled.button<SidebarItemProps>`
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.05)'};
  border: ${({ active }) => active ? `1px solid ${ACCENT_BLUE}` : '1px solid rgba(255, 255, 255, 0.1)'};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ active }) => active ? ACCENT_BLUE : '#909296'};
    transition: color 0.2s ease;
  }
  
  span {
    font-size: 9px;
    font-weight: 500;
    color: ${({ active }) => active ? ACCENT_BLUE : '#909296'};
    transition: color 0.2s ease;
    font-family: 'Nexa-Book', sans-serif;
  }
  
  &:hover {
    background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ active }) => active ? ACCENT_BLUE : 'rgba(255, 255, 255, 0.2)'};
    
    svg, span {
      color: ${({ active }) => active ? ACCENT_BLUE : '#C1C2C5'};
    }
  }
`;

const ClothesSection = styled.div`
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #2C2E33;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

interface ClothesButtonProps {
  active: boolean;
}

const ClothesButton = styled.button<ClothesButtonProps>`
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.05)'};
  border: ${({ active }) => active ? `1px solid ${ACCENT_BLUE}` : '1px solid rgba(255, 255, 255, 0.1)'};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ active }) => active ? ACCENT_BLUE : '#909296'};
  }
  
  span {
    font-size: 9px;
    font-weight: 500;
    color: ${({ active }) => active ? ACCENT_BLUE : '#909296'};
    font-family: 'Nexa-Book', sans-serif;
  }
  
  &:hover {
    background: ${({ active }) => active ? ACCENT_BLUE_LIGHT : 'rgba(255, 255, 255, 0.1)'};
    
    svg, span {
      color: ${({ active }) => active ? ACCENT_BLUE : '#C1C2C5'};
    }
  }
`;

const allCategories = [
  { id: 'ped', label: 'Characters', icon: IconUser, configKey: 'ped' },
  { id: 'headBlend', label: 'Face', icon: IconMoodSmile, configKey: 'headBlend' },
  { id: 'faceFeatures', label: 'Features', icon: IconEye, configKey: 'faceFeatures' },
  { id: 'headOverlays', label: 'Skin', icon: IconDroplet, configKey: 'headOverlays' },
  { id: 'hair', label: 'Hair', icon: IconScissors, configKey: 'headOverlays' },
  { id: 'makeup', label: 'Makeup', icon: IconBrush, configKey: 'headOverlays' },
  { id: 'tattoos', label: 'Tattoos', icon: IconWriting, configKey: 'tattoos' },
  { id: 'components', label: 'Clothing', icon: IconShirt, configKey: 'components' },
  { id: 'props', label: 'Accessories', icon: IconDeviceWatch, configKey: 'props' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, config, clothes, onSetClothes }) => {
  // Filter categories based on config
  const categories = allCategories.filter(category => {
    if (!config) return true; // Show all if no config
    const configValue = config[category.configKey as keyof SidebarConfig];
    return configValue !== false; // Show if true or undefined
  });

  return (
    <SidebarContainer>
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <SidebarItem
            key={category.id}
            active={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            <Icon stroke={1.5} />
            <span>{category.label}</span>
          </SidebarItem>
        );
      })}
      {clothes && onSetClothes && (
        <ClothesSection>
          <ClothesButton active={!!clothes.head} onClick={() => onSetClothes('head')} title="Toggle hat">
            <FaHatCowboy size={18} />
            <span>Hat</span>
          </ClothesButton>
          <ClothesButton active={!!clothes.body} onClick={() => onSetClothes('body')} title="Toggle torso">
            <FaTshirt size={18} />
            <span>Torso</span>
          </ClothesButton>
          <ClothesButton active={!!clothes.bottom} onClick={() => onSetClothes('bottom')} title="Toggle pants">
            <GiTrousers size={18} />
            <span>Pants</span>
          </ClothesButton>
        </ClothesSection>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
