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
}

const SidebarContainer = styled.div`
  width: 72px;
  height: calc(100% - 20px);
  background: rgba(18, 26, 28, 0.87);
  border: 1px solid rgba(194, 244, 249, 0.4);
  border-radius: 12px;
  margin: 10px 10px 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  gap: 4px;
  overflow-y: auto;
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

const SidebarItem = styled.button<SidebarItemProps>`
  width: 56px;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ active }) => active ? 'rgba(194, 244, 249, 0.15)' : 'rgba(56, 79, 82, 0.31)'};
  border: 1px solid ${({ active }) => active ? 'rgba(194, 244, 249, 0.5)' : 'rgba(194, 244, 249, 0.2)'};
  box-shadow: ${({ active }) => active ? 'inset 0 1px 0 rgba(255, 255, 255, 0.05)' : 'none'};
  
  svg {
    width: 18px;
    height: 18px;
    color: ${({ active }) => active ? '#C2F4F9' : 'rgba(255, 255, 255, 0.5)'};
    transition: color 0.2s ease;
  }
  
  span {
    font-size: 9px;
    font-weight: 500;
    color: ${({ active }) => active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
    transition: color 0.2s ease;
  }
  
  &:hover {
    background: rgba(194, 244, 249, 0.12);
    border-color: rgba(194, 244, 249, 0.4);
    
    svg {
      color: #C2F4F9;
    }
    
    span {
      color: #ffffff;
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

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, onCategoryChange, config }) => {
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
    </SidebarContainer>
  );
};

export default Sidebar;
