import React, { createContext, useState, useCallback, useContext, ReactNode, useEffect } from 'react';
import Locales from '../shared/interfaces/locales';

interface Display {
  appearance: boolean;
  asynchronous: boolean;
}

interface NuiState {
  display: Display;
  locales?: Locales;
}

interface NuiContextData {
  display: Display;
  setDisplay(value: Display): void;
  locales?: Locales;
  setLocales(value: Locales): void;
}

// In dev mode, show UI by default
const isDev = !import.meta.env.PROD;

const INITIAL_STATE: NuiState = {
  display: {
    appearance: isDev, // Auto-show in dev mode
    asynchronous: false,
  },
};

const NuiContext = createContext<NuiContextData>({} as NuiContextData);

const NuiStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<NuiState>(INITIAL_STATE);

  const setDisplay = useCallback(
    (value: Display) => {
      setData(state => ({
        ...state,
        display: {
          ...value,
        },
      }));
    },
    [setData],
  );

  const setLocales = useCallback(
    (value: Locales) => {
      setData(state => ({
        ...state,
        locales: value,
      }));
    },
    [setData],
  );

  // Set default locales in dev mode
  useEffect(() => {
    if (isDev && !data.locales) {
      setLocales({
        header: { title: 'Appearance Editor', subtitle: 'Customize your character' },
        sidebar: {
          ped: 'Characters', headBlend: 'Face', faceFeatures: 'Features', headOverlays: 'Skin',
          hair: 'Hair', makeup: 'Makeup', tattoos: 'Tattoos', components: 'Clothing', props: 'Accessories',
          clothes: { hat: 'Hat', torso: 'Torso', pants: 'Pants' },
        },
        camera: { head: 'Head', torso: 'Torso', legs: 'Legs' },
        footer: { cancel: 'Cancel', save: 'Save' },
        controls: { rotateLeft: 'Rotate Left', rotateRight: 'Rotate Right' },
        ped: { title: 'Ped', model: 'Model' },
        headBlend: {
          title: 'Head Blend',
          shape: { title: 'Shape', firstOption: 'Mother', secondOption: 'Father', mix: 'Mix' },
          skin: { title: 'Skin', firstOption: 'Mother', secondOption: 'Father', mix: 'Mix' },
          race: { title: 'Race', shape: 'Shape', skin: 'Skin', mix: 'Mix' },
        },
        faceFeatures: {
          title: 'Face Features',
          nose: { title: 'Nose', width: 'Width', height: 'Height', size: 'Size', boneHeight: 'Bone Height', peakHeight: 'Peak Height', boneTwist: 'Bone Twist' },
          eyebrows: { title: 'Eyebrows', height: 'Height', depth: 'Depth' },
          cheeks: { title: 'Cheeks', boneHeight: 'Bone Height', boneWidth: 'Bone Width', width: 'Width' },
          eyesAndMouth: { title: 'Eyes & Mouth', eyesOpening: 'Eyes Opening', lipsThickness: 'Lips Thickness' },
          jaw: { title: 'Jaw', width: 'Width', size: 'Size' },
          chin: { title: 'Chin', lowering: 'Lowering', length: 'Length', size: 'Size', hole: 'Hole' },
          neck: { title: 'Neck', thickness: 'Thickness' },
        },
        headOverlays: {
          title: 'Head Overlays',
          hair: { title: 'Hair', style: 'Style', texture: 'Texture', color: 'Color', highlight: 'Highlight', fade: 'Fade' },
          opacity: 'Opacity',
          style: 'Style',
          color: 'Color',
          secondColor: 'Second Color',
          eyebrows: 'Eyebrows',
          eyeColor: 'Eye Color',
          makeUp: 'Makeup',
          blush: 'Blush',
          lipstick: 'Lipstick',
          beard: 'Beard',
          blemishes: 'Blemishes',
          ageing: 'Ageing',
          complexion: 'Complexion',
          sunDamage: 'Sun Damage',
          moleAndFreckles: 'Moles & Freckles',
          chestHair: 'Chest Hair',
          bodyBlemishes: 'Body Blemishes',
        },
        components: {
          title: 'Clothing',
          drawable: 'Component',
          texture: 'Variant',
          head: 'Head',
          mask: 'Mask',
          upperBody: 'Upper Body',
          lowerBody: 'Lower Body',
          bags: 'Bags',
          shoes: 'Shoes',
          scarfAndChains: 'Scarf & Chains',
          shirt: 'Shirt',
          bodyArmor: 'Body Armor',
          decals: 'Decals',
          jackets: 'Jackets',
        },
        props: {
          title: 'Accessories',
          drawable: 'Component',
          texture: 'Variant',
          hats: 'Hats',
          glasses: 'Glasses',
          ear: 'Earpieces',
          watches: 'Watches',
          bracelets: 'Bracelets',
        },
        tattoos: {
          title: 'Tattoos',
          items: {
            ZONE_HEAD: 'Head',
            ZONE_TORSO: 'Torso',
            ZONE_LEFT_ARM: 'Left Arm',
            ZONE_RIGHT_ARM: 'Right Arm',
            ZONE_LEFT_LEG: 'Left Leg',
            ZONE_RIGHT_LEG: 'Right Leg',
          },
          apply: 'Apply',
          delete: 'Delete',
          deleteAll: 'Delete All',
          opacity: 'Opacity',
        },
        modal: {
          save: { title: 'Save Changes?', description: 'Do you want to save your appearance?' },
          exit: { title: 'Exit?', description: 'Are you sure you want to exit?' },
          accept: 'Accept',
          decline: 'Decline',
        },
      } as Locales);
    }
  }, [isDev, data.locales, setLocales]);

  const contextValue = {
    display: data.display,
    setDisplay,
    locales: data.locales,
    setLocales,
  };

  return <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>;
};

function useNuiState(): NuiContextData {
  const context = useContext(NuiContext);

  return context;
}

export { NuiStateProvider, useNuiState };
