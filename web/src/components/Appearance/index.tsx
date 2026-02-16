import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTransition as useTransitionAnimation, animated } from 'react-spring';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';
import mock from '../../mock';

import {
  CustomizationConfig,
  PedAppearance,
  AppearanceSettings,
  PedHeadBlend,
  PedFaceFeatures,
  PedHeadOverlays,
  PedHeadOverlayValue,
  PedHair,
  CameraState,
  ClothesState,
  Tattoo,
  TattoosSettings,
} from './interfaces';

import {
  APPEARANCE_INITIAL_STATE,
  SETTINGS_INITIAL_STATE,
  CAMERA_INITIAL_STATE,
  ROTATE_INITIAL_STATE,
  CLOTHES_INITIAL_STATE,
} from './settings';

import Ped from './Ped';
import HeadBlend from './HeadBlend';
import FaceFeatures from './FaceFeatures';
import HeadOverlays from './HeadOverlays';
import Components from './Components';
import Props from './Props';
import Options from './Options';
import Modal from '../Modal';
import Tattoos from './Tattoos';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import { Wrapper, MainPanel, ContentPanel, Container, FooterButtons, ActionButton, CameraButtons, CameraButton, ControlsInfo, ControlsDivider } from './styles';
import { IconUser, IconShirt, IconShoe } from '@tabler/icons-react';

const isDev = !import.meta.env.PROD;

// Dev mode config
const DEV_CONFIG = {
  ped: true,
  headBlend: true,
  faceFeatures: true,
  headOverlays: true,
  components: true,
  props: true,
  tattoos: true,
  enableExit: true,
  automaticFade: false,
  hasTracker: false,
  componentConfig: {
    masks: true,
    upperBody: true,
    lowerBody: true,
    bags: true,
    shoes: true,
    scarfAndChains: true,
    shirts: true,
    bodyArmor: true,
    decals: true,
    jackets: true,
  },
  propConfig: {
    hats: true,
    glasses: true,
    ear: true,
    watches: true,
    bracelets: true,
  },
};

if (isDev) {
  mock('appearance_get_settings', () => ({
    appearanceSettings: {
      ...SETTINGS_INITIAL_STATE,
      eyeColor: { min: 0, max: 24 },
      hair: {
        ...SETTINGS_INITIAL_STATE.hair,
        color: {
          items: [
            [35, 30, 25], [50, 40, 30], [70, 55, 40], [90, 70, 50],
            [110, 85, 60], [130, 100, 70], [150, 115, 80], [170, 130, 90],
            [190, 145, 100], [210, 160, 110], [230, 175, 120], [250, 190, 130],
          ],
        },
        highlight: {
          items: [
            [255, 220, 180], [255, 200, 150], [255, 180, 120], [255, 160, 90],
            [230, 140, 70], [200, 120, 50], [170, 100, 40], [140, 80, 30],
          ],
        },
      },
    },
  }));

  // This mock returns BOTH config and appearanceData
  mock('appearance_get_data', () => ({
    config: DEV_CONFIG,
    appearanceData: { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' },
  }));

  mock('appearance_change_model', () => SETTINGS_INITIAL_STATE);
  mock('appearance_change_component', () => SETTINGS_INITIAL_STATE.components);
  mock('appearance_change_prop', () => SETTINGS_INITIAL_STATE.props);
  mock('appearance_set_camera', () => 1);
  mock('appearance_rotate_ped', () => 1);
  mock('get_theme_configuration', () => ({
    currentTheme: 'default',
    themes: [{
      id: 'default',
      borderRadius: '6px',
      fontColor: '232, 234, 237',
      fontColorHover: '255, 255, 255',
      fontColorSelected: '20, 25, 32',
      fontFamily: 'Bai Jamjuree',
      primaryBackground: '30, 38, 50',
      primaryBackgroundSelected: '126, 184, 218',
      secondaryBackground: '20, 25, 32',
      scaleOnHover: false,
      sectionFontWeight: '500',
      smoothBackgroundTransition: true,
    }],
  }));
}

const Appearance = () => {
  // In dev mode, initialize with mock data immediately
  const [config, setConfig] = useState<CustomizationConfig | undefined>(
    isDev ? DEV_CONFIG as CustomizationConfig : undefined
  );

  const [data, setData] = useState<PedAppearance | undefined>(
    isDev ? { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' } : undefined
  );
  const [storedData, setStoredData] = useState<PedAppearance | undefined>(
    isDev ? { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' } : undefined
  );
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings | undefined>(
    isDev ? SETTINGS_INITIAL_STATE : undefined
  );

  const [camera, setCamera] = useState(CAMERA_INITIAL_STATE);
  const [rotate, setRotate] = useState(ROTATE_INITIAL_STATE);
  const [clothes, setClothes] = useState(CLOTHES_INITIAL_STATE);

  const [saveModal, setSaveModal] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('components');
  const [activeCamera, setActiveCamera] = useState<string>('default');

  // Mouse drag rotation state
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);

  const { display, setDisplay, locales, setLocales } = useNuiState();

  // Camera button handlers - toggle between position and default
  const handleCameraHead = useCallback(() => {
    if (activeCamera === 'head') {
      setActiveCamera('default');
      Nui.post('appearance_set_camera', 'default');
    } else {
      setActiveCamera('head');
      Nui.post('appearance_set_camera', 'head');
    }
  }, [activeCamera]);

  const handleCameraBody = useCallback(() => {
    if (activeCamera === 'body') {
      setActiveCamera('default');
      Nui.post('appearance_set_camera', 'default');
    } else {
      setActiveCamera('body');
      Nui.post('appearance_set_camera', 'body');
    }
  }, [activeCamera]);

  const handleCameraBottom = useCallback(() => {
    if (activeCamera === 'bottom') {
      setActiveCamera('default');
      Nui.post('appearance_set_camera', 'default');
    } else {
      setActiveCamera('bottom');
      Nui.post('appearance_set_camera', 'bottom');
    }
  }, [activeCamera]);

  // Mouse drag rotation handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Only start drag on left mouse button and on the background area
    if (e.button === 0 && e.target === e.currentTarget) {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;
    
    // Convert pixel movement to rotation (very fast - 3x multiplier)
    const rotationDelta = -deltaX * 3;
    
    if (Math.abs(rotationDelta) > 0.1) {
      Nui.post('appearance_rotate_ped', rotationDelta);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  const wrapperTransition = useTransitionAnimation(display.appearance, null, {
    from: { transform: 'translateX(-50px)', opacity: 0 },
    enter: { transform: 'translateY(0)', opacity: 1 },
    leave: { transform: 'translateX(-50px)', opacity: 0 },
  });

  const saveModalTransition = useTransitionAnimation(saveModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const exitModalTransition = useTransitionAnimation(exitModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const handleTurnAround = useCallback(() => {
    Nui.post('appearance_turn_around');
  }, []);

  const handleSetClothes = useCallback(
    (key: keyof ClothesState) => {
      setClothes({ ...clothes, [key]: !clothes[key] });
      if (!clothes[key]) {
        Nui.post('appearance_remove_clothes', key);
      } else {
        Nui.post('appearance_wear_clothes', { data, key });
      }
    },
    [data, clothes, setClothes],
  );

  const handleSetCamera = useCallback(
    (key: keyof CameraState) => {
      setCamera({ ...CAMERA_INITIAL_STATE, [key]: !camera[key] });
      setRotate(ROTATE_INITIAL_STATE);

      if (!camera[key]) {
        Nui.post('appearance_set_camera', key);
      } else {
        Nui.post('appearance_set_camera', 'default');
      }
    },
    [camera, setCamera, setRotate],
  );

  const handleRotateLeft = useCallback(() => {
    setRotate({ left: !rotate.left, right: false });

    if (!rotate.left) {
      Nui.post('appearance_rotate_camera', 'left');
    } else {
      Nui.post('appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleRotateRight = useCallback(() => {
    setRotate({ left: false, right: !rotate.right });

    if (!rotate.right) {
      Nui.post('appearance_rotate_camera', 'right');
    } else {
      Nui.post('appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleSaveModal = useCallback(() => {
    setSaveModal(true);
  }, [setSaveModal]);

  const handleExitModal = useCallback(() => {
    setExitModal(true);
  }, [setExitModal]);

  const handleSave = useCallback(
    async (accept: boolean) => {
      if (accept) {
        await Nui.post('appearance_save', data);
        setSaveModal(false);
      } else {
        setSaveModal(false);
      }
    },
    [setSaveModal, data],
  );

  const handleExit = useCallback(
    async (accept: boolean) => {
      if (accept) {
        await Nui.post('appearance_exit');
        setExitModal(false);
      } else {
        setExitModal(false);
      }
    },
    [setExitModal],
  );

  const handleModelChange = useCallback(
    async (value: string) => {
      const { appearanceSettings: _appearanceSettings, appearanceData } = await Nui.post(
        'appearance_change_model',
        value,
      );

      setAppearanceSettings(_appearanceSettings);
      setData(appearanceData);
    },
    [setData, setAppearanceSettings],
  );

  const handleHeadBlendChange = useCallback(
    (key: keyof PedHeadBlend, value: number) => {
      if (!data) return;

      const updatedHeadBlend = { ...data.headBlend, [key]: value };

      const updatedData = { ...data, headBlend: updatedHeadBlend };

      setData(updatedData);

      Nui.post('appearance_change_head_blend', updatedHeadBlend);
    },
    [data, setData],
  );

  const handleFaceFeatureChange = useCallback(
    (key: keyof PedFaceFeatures, value: number) => {
      if (!data) return;

      const updatedFaceFeatures = { ...data.faceFeatures, [key]: value };

      const updatedData = { ...data, faceFeatures: updatedFaceFeatures };

      setData(updatedData);

      Nui.post('appearance_change_face_feature', updatedFaceFeatures);
    },
    [data, setData],
  );

  const handleHairChange = useCallback(
    async (key: keyof PedHair, value: number) => {
      if (!data || !appearanceSettings) return;

      const updatedHair = { ...data.hair, [key]: value };

      const updatedData = { ...data, hair: updatedHair };

      setData(updatedData);

      const updatedHairSettings = await Nui.post('appearance_change_hair', updatedHair);

      const updatedSettings = { ...appearanceSettings, hair: updatedHairSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleChangeFade = useCallback(async (value: number) => {
    if (!data || !appearanceSettings) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      const tattoo = appearanceSettings.tattoos.items['ZONE_HAIR'][value]
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone] = [tattoo];
      await Nui.post('appearance_apply_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
  }, [appearanceSettings, data, setData])

  const handleHeadOverlayChange = useCallback(
    (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => {
      if (!data) return;

      const updatedValue = { ...data.headOverlays[key], [option]: value };

      const updatedData = { ...data, headOverlays: { ...data.headOverlays, [key]: updatedValue } };

      setData(updatedData);

      Nui.post('appearance_change_head_overlay', { ...data.headOverlays, [key]: updatedValue });
    },
    [data, setData],
  );

  const handleEyeColorChange = useCallback(
    (value: number) => {
      if (!data) return;

      const updatedData = { ...data, eyeColor: value };

      setData(updatedData);

      Nui.post('appearance_change_eye_color', value);
    },
    [data, setData],
  );

  const handleComponentDrawableChange = useCallback(
    async (component_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, drawable, texture: 0 };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleComponentTextureChange = useCallback(
    async (component_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, texture };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropDrawableChange = useCallback(
    async (prop_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, drawable, texture: 0 };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropTextureChange = useCallback(
    async (prop_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, texture };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const isPedFreemodeModel = useMemo(() => {
    if (!data) return;

    return data.model === 'mp_m_freemode_01' || data.model === 'mp_f_freemode_01';
  }, [data]);

  const isPedMale = useMemo(() => {
    if(!data) return;

    if (data.model === 'mp_m_freemode_01') {
      return true;
    }

    return false
  }, [data]);

  const filterTattoos = (tattooSettings: TattoosSettings) => {
    for(const zone in tattooSettings.items) {
      tattooSettings.items[zone] = tattooSettings.items[zone].filter(tattoo => {
        if(isPedMale && tattoo.hashMale !== "") {
          return tattoo;
        } else if(!isPedMale && tattoo.hashFemale !== "") {
          return tattoo;
        }
      })
    }
    return tattooSettings;
  };

  const handleApplyTattoo = useCallback(
    async (tattoo: Tattoo, opacity: number) => {
      if (!data) return;
      tattoo.opacity = opacity;
      const { tattoos } = data;
      const updatedTattoos = JSON.parse(JSON.stringify({ ...tattoos}));
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone].push(tattoo);
      const applied = await Nui.post('appearance_apply_tattoo', {tattoo, updatedTattoos});
      if(applied) {
        setData({ ...data, tattoos: updatedTattoos });
      }
    },
    [data, setData],
  );

  const handlePreviewTattoo = useCallback(
    (tattoo: Tattoo, opacity: number) => {
      if (!data) return;
      tattoo.opacity = opacity;
      const { tattoos } = data;
      Nui.post('appearance_preview_tattoo', { data: tattoos, tattoo });
    },
    [data],
  );

  const handleDeleteTattoo = useCallback(
    async (tattoo: Tattoo) => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = tattoos;
      // eslint-disable-next-line prettier/prettier
      updatedTattoos[tattoo.zone] = updatedTattoos[tattoo.zone].filter(tattooDelete => tattooDelete.name !== tattoo.name);
      await Nui.post('appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  const handleClearTattoos = useCallback(
    async () => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      for (var zone in updatedTattoos) {
        if (zone !== "ZONE_HAIR") {
          updatedTattoos[zone] = [];
        }
      }
      await Nui.post('appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  useEffect(() => {
    if(!locales) {
      Nui.post('appearance_get_locales').then(result => setLocales(result));
    }

    Nui.onEvent('appearance_display', (data : any) => {
      setDisplay({ appearance: true, asynchronous: data.asynchronous });
    });

    Nui.onEvent('appearance_hide', () => {
      setDisplay({ appearance: false, asynchronous: false });
      setData(APPEARANCE_INITIAL_STATE);
      setStoredData(APPEARANCE_INITIAL_STATE);
      //setAppearanceSettings(SETTINGS_INITIAL_STATE);
      setCamera(CAMERA_INITIAL_STATE);
      setRotate(ROTATE_INITIAL_STATE);
    });
  }, []);

  const fetchData = useCallback(async () => {
    const result = await Nui.post('appearance_get_data');
    setConfig(result.config);
    setStoredData(result.appearanceData);
    setData(result.appearanceData); 
  }, []);

  const fetchSettings = useCallback(async () => {
    if(appearanceSettings === undefined || appearanceSettings === SETTINGS_INITIAL_STATE) {
      const result = await Nui.post('appearance_get_settings');
      setAppearanceSettings(result.appearanceSettings);
    }
  }, []);

  useEffect(() => {
    if (display.appearance) {
      if(display.asynchronous) {
        (async () => {
          await fetchSettings();
          await fetchData();
        })();
      } else {
        fetchSettings().catch(console.error);
        fetchData().catch(console.error);
      }
    }
  }, [display.appearance]);

  // Dev mode fallback locales
  const DEV_LOCALES = {
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
      opacity: 'Opacity', style: 'Style', color: 'Color', secondColor: 'Second Color',
      eyebrows: 'Eyebrows', eyeColor: 'Eye Color', makeUp: 'Makeup', blush: 'Blush',
      lipstick: 'Lipstick', beard: 'Beard', blemishes: 'Blemishes', ageing: 'Ageing',
      complexion: 'Complexion', sunDamage: 'Sun Damage', moleAndFreckles: 'Moles & Freckles',
      chestHair: 'Chest Hair', bodyBlemishes: 'Body Blemishes',
    },
    components: {
      title: 'Clothing', drawable: 'Component', texture: 'Variant',
      head: 'Head', mask: 'Mask', upperBody: 'Upper Body', lowerBody: 'Lower Body',
      bags: 'Bags', shoes: 'Shoes', scarfAndChains: 'Scarf & Chains', shirt: 'Shirt',
      bodyArmor: 'Body Armor', decals: 'Decals', jackets: 'Jackets',
    },
    props: {
      title: 'Accessories', drawable: 'Component', texture: 'Variant',
      hats: 'Hats', glasses: 'Glasses', ear: 'Earpieces', watches: 'Watches', bracelets: 'Bracelets',
    },
    tattoos: {
      title: 'Tattoos',
      items: { ZONE_HEAD: 'Head', ZONE_TORSO: 'Torso', ZONE_LEFT_ARM: 'Left Arm', ZONE_RIGHT_ARM: 'Right Arm', ZONE_LEFT_LEG: 'Left Leg', ZONE_RIGHT_LEG: 'Right Leg' },
      apply: 'Apply', delete: 'Delete', deleteAll: 'Delete All',
    },
    modal: {
      save: { title: 'Save Changes?', description: 'Do you want to save?' },
      exit: { title: 'Exit?', description: 'Are you sure you want to exit?' },
      accept: 'Accept', decline: 'Decline',
    },
  };

  const activeLocales = locales || (isDev ? DEV_LOCALES : null);

  if (!display.appearance || !config || !appearanceSettings || !data || !storedData || !activeLocales) {
    return null;
  }

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'ped':
        return config.ped && (
          <Ped
            settings={appearanceSettings.ped}
            storedData={storedData.model}
            data={data.model}
            handleModelChange={handleModelChange}
          />
        );
      case 'headBlend':
        return isPedFreemodeModel && config.headBlend && (
          <HeadBlend
            settings={appearanceSettings.headBlend}
            storedData={storedData.headBlend}
            data={data.headBlend}
            handleHeadBlendChange={handleHeadBlendChange}
          />
        );
      case 'faceFeatures':
        return isPedFreemodeModel && config.faceFeatures && (
          <FaceFeatures
            settings={appearanceSettings.faceFeatures}
            storedData={storedData.faceFeatures}
            data={data.faceFeatures}
            handleFaceFeatureChange={handleFaceFeatureChange}
          />
        );
      case 'headOverlays':
      case 'hair':
      case 'makeup':
        return config.headOverlays && (
          <HeadOverlays
            settings={{
              hair: appearanceSettings.hair,
              headOverlays: appearanceSettings.headOverlays,
              eyeColor: appearanceSettings.eyeColor,
              fade: appearanceSettings.tattoos.items['ZONE_HAIR']
            }}
            storedData={{
              hair: storedData.hair,
              headOverlays: storedData.headOverlays,
              eyeColor: storedData.eyeColor,
              fade: storedData.tattoos?.ZONE_HAIR?.length > 0 ? storedData.tattoos.ZONE_HAIR[0] : null
            }}
            data={{
              hair: data.hair,
              headOverlays: data.headOverlays,
              eyeColor: data.eyeColor,
              fade: data.tattoos?.ZONE_HAIR?.length > 0 ? data.tattoos.ZONE_HAIR[0] : null
            }}
            isPedFreemodeModel={isPedFreemodeModel}
            handleHairChange={handleHairChange}
            handleHeadOverlayChange={handleHeadOverlayChange}
            handleEyeColorChange={handleEyeColorChange}
            handleChangeFade={handleChangeFade}
            automaticFade={config.automaticFade}
          />
        );
      case 'components':
        return config.components && (
          <Components
            settings={appearanceSettings.components}
            data={data.components}
            storedData={storedData.components}
            handleComponentDrawableChange={handleComponentDrawableChange}
            handleComponentTextureChange={handleComponentTextureChange}
            componentConfig={config.componentConfig}
            hasTracker={config.hasTracker}
            isPedFreemodeModel={isPedFreemodeModel}
          />
        );
      case 'props':
        return config.props && (
          <Props
            settings={appearanceSettings.props}
            data={data.props}
            storedData={storedData.props}
            handlePropDrawableChange={handlePropDrawableChange}
            handlePropTextureChange={handlePropTextureChange}
            propConfig={config.propConfig}
          />
        );
      case 'tattoos':
        return isPedFreemodeModel && config.tattoos && (
          <Tattoos
            settings={filterTattoos(appearanceSettings.tattoos)}
            data={data.tattoos}
            storedData={storedData.tattoos}
            handleApplyTattoo={handleApplyTattoo}
            handlePreviewTattoo={handlePreviewTattoo}
            handleDeleteTattoo={handleDeleteTattoo}
            handleClearTattoos={handleClearTattoos}
          />
        );
      default:
        return null;
    }
  };

  // Main panel content - extracted for reuse
  const mainContent = (
    <Wrapper
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: isDragging.current ? 'grabbing' : 'default' }}
    >
      <CameraButtons>
        <CameraButton onClick={handleCameraHead} active={activeCamera === 'head'}>
          <IconUser stroke={1.5} />
          <span>Head</span>
        </CameraButton>
        <CameraButton onClick={handleCameraBody} active={activeCamera === 'body'}>
          <IconShirt stroke={1.5} />
          <span>Torso</span>
        </CameraButton>
        <CameraButton onClick={handleCameraBottom} active={activeCamera === 'bottom'}>
          <IconShoe stroke={1.5} />
          <span>Legs</span>
        </CameraButton>
      </CameraButtons>
      <ControlsInfo>
        <span><kbd>A</kbd> Rotate Left</span>
        <ControlsDivider />
        <span><kbd>D</kbd> Rotate Right</span>
      </ControlsInfo>
      <MainPanel>
        <ContentPanel>
          <Header 
            title="Appearance Editor" 
            subtitle="Customize your character" 
          />
          <Container>
            {renderCategoryContent()}
          </Container>
          <FooterButtons>
            <ActionButton variant="secondary" onClick={handleExitModal}>
              Cancel
            </ActionButton>
            <ActionButton variant="primary" onClick={handleSaveModal}>
              Save
            </ActionButton>
          </FooterButtons>
        </ContentPanel>
        <Sidebar 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory}
          config={config}
        />
      </MainPanel>
    </Wrapper>
  );

  // In dev mode, render directly without animation
  if (isDev) {
    return (
      <>
        {mainContent}
        {saveModal && (
          <Modal
            title={activeLocales.modal.save.title}
            description={activeLocales.modal.save.description}
            accept={activeLocales.modal.accept}
            decline={activeLocales.modal.decline}
            handleAccept={() => handleSave(true)}
            handleDecline={() => handleSave(false)}
          />
        )}
        {exitModal && (
          <Modal
            title={activeLocales.modal.exit.title}
            description={activeLocales.modal.exit.description}
            accept={activeLocales.modal.accept}
            decline={activeLocales.modal.decline}
            handleAccept={() => handleExit(true)}
            handleDecline={() => handleExit(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {wrapperTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              {mainContent}
            </animated.div>
          ),
      )}
      {saveModalTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Modal
                title={activeLocales.modal.save.title}
                description={activeLocales.modal.save.description}
                accept={activeLocales.modal.accept}
                decline={activeLocales.modal.decline}
                handleAccept={() => handleSave(true)}
                handleDecline={() => handleSave(false)}
              />
            </animated.div>
          ),
      )}
      {exitModalTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Modal
                title={activeLocales.modal.exit.title}
                description={activeLocales.modal.exit.description}
                accept={activeLocales.modal.accept}
                decline={activeLocales.modal.decline}
                handleAccept={() => handleExit(true)}
                handleDecline={() => handleExit(false)}
              />
            </animated.div>
          ),
      )}
    </>
  );
};

export default Appearance;
