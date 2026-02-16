import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import Input from './components/Input';
import ColorInput from './components/ColorInput';
import RangeInput from './components/RangeInput';

import {
  HairSettings,
  HeadOverlaysSettings,
  EyeColorSettings,
  PedHair,
  PedHeadOverlays,
  PedHeadOverlayValue,
  Tattoo
} from './interfaces';
import { useCallback } from 'react';

interface HeadOverlaysProps {
  settings: {
    hair: HairSettings;
    headOverlays: HeadOverlaysSettings;
    eyeColor: EyeColorSettings;
    fade: Tattoo[];
  };
  storedData: {
    hair: PedHair;
    headOverlays: PedHeadOverlays;
    eyeColor: number;
    fade: Tattoo | null;
  };
  data: {
    hair: PedHair;
    headOverlays: PedHeadOverlays;
    eyeColor: number;
    fade: Tattoo | null;
  };
  isPedFreemodeModel: boolean | undefined;
  handleHairChange: (key: keyof PedHair, value: number) => void;
  handleHeadOverlayChange: (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => void;
  handleEyeColorChange: (value: number) => void;
  handleChangeFade: (value: number) => void;
  automaticFade: boolean;
}

const HeadOverlays = ({
  settings,
  storedData,
  data,
  isPedFreemodeModel,
  handleHairChange,
  handleHeadOverlayChange,
  handleEyeColorChange, 
  handleChangeFade,
  automaticFade
}: HeadOverlaysProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  const fadeValue = useCallback(() => {
    const indexFade = settings?.fade?.findIndex(tattoo => tattoo.name === data.fade?.name)
    return indexFade >= 0 ? indexFade : 0
  }, [data.fade?.name])()

  const storedFadeValue = useCallback(() => {
    const indexFade = settings?.fade?.findIndex(tattoo => tattoo.name === storedData.fade?.name)
    return indexFade >= 0 ? indexFade : 0
  }, [storedData.fade?.name])()

  const ho = locales.headOverlays;
  return (
    <>
      <Item title={ho.hair.title} defaultOpen>
        <Input
          title={ho.hair.style}
          min={settings.hair.style.min}
          max={settings.hair.style.max}
          blacklisted={settings.hair.blacklist.drawables}
          defaultValue={data.hair.style}
          clientValue={storedData.hair.style}
          onChange={value => handleHairChange('style', value)}
        />
        <Input
          title={ho.hair.texture}
          min={settings.hair.texture.min}
          max={settings.hair.texture.max}
          blacklisted={settings.hair.blacklist.textures}
          defaultValue={data.hair.texture}
          clientValue={storedData.hair.texture}
          onChange={value => handleHairChange('texture', value)}
        />
        {isPedFreemodeModel && (
          <>
            {!automaticFade && (
              <Input
                title={ho.hair.fade}
                min={0}
                max={settings?.fade?.length - 1 ?? 0}
                defaultValue={fadeValue}
                clientValue={storedFadeValue}
                onChange={value => handleChangeFade(value)}
              />
            )}
            <ColorInput
              title={ho.color}
              colors={settings.hair.color.items}
              defaultValue={data.hair.color}
              clientValue={storedData.hair.color}
              onChange={value => handleHairChange('color', value)}
            />
            <ColorInput
              title={ho.hair.highlight}
              colors={settings.hair.highlight.items}
              defaultValue={data.hair.highlight}
              onChange={value => handleHairChange('highlight', value)}
            />
          </>
        )}
      </Item>
      {isPedFreemodeModel && (
        <>
          <Item title={ho.eyebrows}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.eyebrows.opacity.min}
              max={settings.headOverlays.eyebrows.opacity.max}
              factor={settings.headOverlays.eyebrows.opacity.factor}
              defaultValue={data.headOverlays.eyebrows.opacity}
              onChange={value => handleHeadOverlayChange('eyebrows', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.eyebrows.style.min}
              max={settings.headOverlays.eyebrows.style.max}
              defaultValue={data.headOverlays.eyebrows.style}
              clientValue={storedData.headOverlays.eyebrows.style}
              onChange={value => handleHeadOverlayChange('eyebrows', 'style', value)}
            />
            <ColorInput
              title={ho.color}
              colors={settings.headOverlays.eyebrows.color?.items}
              defaultValue={data.headOverlays.eyebrows.color}
              clientValue={storedData.headOverlays.eyebrows.color}
              onChange={value => handleHeadOverlayChange('eyebrows', 'color', value)}
            />
          </Item>
          <Item title={ho.eyeColor}>
            <Input
              title={ho.style}
              min={settings.eyeColor.min}
              max={settings.eyeColor.max}
              defaultValue={data.eyeColor}
              clientValue={storedData.eyeColor}
              onChange={value => handleEyeColorChange(value)}
            />
          </Item>
          <Item title={ho.makeUp}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.makeUp.opacity.min}
              max={settings.headOverlays.makeUp.opacity.max}
              factor={settings.headOverlays.makeUp.opacity.factor}
              defaultValue={data.headOverlays.makeUp.opacity}
              onChange={value => handleHeadOverlayChange('makeUp', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.makeUp.style.min}
              max={settings.headOverlays.makeUp.style.max}
              defaultValue={data.headOverlays.makeUp.style}
              clientValue={storedData.headOverlays.makeUp.style}
              onChange={value => handleHeadOverlayChange('makeUp', 'style', value)}
            />
            <ColorInput
              title={ho.color}
              colors={settings.headOverlays.makeUp.color?.items}
              defaultValue={data.headOverlays.makeUp.color}
              clientValue={storedData.headOverlays.makeUp.color}
              onChange={value => handleHeadOverlayChange('makeUp', 'color', value)}
            />
            <ColorInput
              title={ho.secondColor}
              colors={settings.headOverlays.makeUp.color?.items}
              defaultValue={data.headOverlays.makeUp.secondColor}
              clientValue={storedData.headOverlays.makeUp.secondColor}
              onChange={value => handleHeadOverlayChange('makeUp', 'secondColor', value)}
            />
          </Item>
          <Item title={ho.blush}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.blush.opacity.min}
              max={settings.headOverlays.blush.opacity.max}
              factor={settings.headOverlays.blush.opacity.factor}
              defaultValue={data.headOverlays.blush.opacity}
              onChange={value => handleHeadOverlayChange('blush', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.blush.style.min}
              max={settings.headOverlays.blush.style.max}
              defaultValue={data.headOverlays.blush.style}
              clientValue={storedData.headOverlays.blush.style}
              onChange={value => handleHeadOverlayChange('blush', 'style', value)}
            />
            <ColorInput
              title={ho.color}
              colors={settings.headOverlays.blush.color?.items}
              defaultValue={data.headOverlays.blush.color}
              clientValue={storedData.headOverlays.blush.color}
              onChange={value => handleHeadOverlayChange('blush', 'color', value)}
            />
          </Item>
          <Item title={ho.lipstick}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.lipstick.opacity.min}
              max={settings.headOverlays.lipstick.opacity.max}
              factor={settings.headOverlays.lipstick.opacity.factor}
              defaultValue={data.headOverlays.lipstick.opacity}
              onChange={value => handleHeadOverlayChange('lipstick', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.lipstick.style.min}
              max={settings.headOverlays.lipstick.style.max}
              defaultValue={data.headOverlays.lipstick.style}
              clientValue={storedData.headOverlays.lipstick.style}
              onChange={value => handleHeadOverlayChange('lipstick', 'style', value)}
            />
            <ColorInput
              title={ho.color}
              colors={settings.headOverlays.lipstick.color?.items}
              defaultValue={data.headOverlays.lipstick.color}
              clientValue={storedData.headOverlays.lipstick.color}
              onChange={value => handleHeadOverlayChange('lipstick', 'color', value)}
            />
          </Item>
          <Item title={ho.beard}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.beard.opacity.min}
              max={settings.headOverlays.beard.opacity.max}
              factor={settings.headOverlays.beard.opacity.factor}
              defaultValue={data.headOverlays.beard.opacity}
              onChange={value => handleHeadOverlayChange('beard', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.beard.style.min}
              max={settings.headOverlays.beard.style.max}
              defaultValue={data.headOverlays.beard.style}
              clientValue={storedData.headOverlays.beard.style}
              onChange={value => handleHeadOverlayChange('beard', 'style', value)}
            />
            <ColorInput
              title={ho.color}
              colors={settings.headOverlays.beard.color?.items}
              defaultValue={data.headOverlays.beard.color}
              clientValue={storedData.headOverlays.beard.color}
              onChange={value => handleHeadOverlayChange('beard', 'color', value)}
            />
          </Item>
          <Item title={ho.blemishes}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.blemishes.opacity.min}
              max={settings.headOverlays.blemishes.opacity.max}
              factor={settings.headOverlays.blemishes.opacity.factor}
              defaultValue={data.headOverlays.blemishes.opacity}
              onChange={value => handleHeadOverlayChange('blemishes', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.blemishes.style.min}
              max={settings.headOverlays.blemishes.style.max}
              defaultValue={data.headOverlays.blemishes.style}
              clientValue={storedData.headOverlays.blemishes.style}
              onChange={value => handleHeadOverlayChange('blemishes', 'style', value)}
            />
          </Item>
          <Item title={ho.ageing}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.ageing.opacity.min}
              max={settings.headOverlays.ageing.opacity.max}
              factor={settings.headOverlays.ageing.opacity.factor}
              defaultValue={data.headOverlays.ageing.opacity}
              onChange={value => handleHeadOverlayChange('ageing', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.ageing.style.min}
              max={settings.headOverlays.ageing.style.max}
              defaultValue={data.headOverlays.ageing.style}
              clientValue={storedData.headOverlays.ageing.style}
              onChange={value => handleHeadOverlayChange('ageing', 'style', value)}
            />
          </Item>
          <Item title={ho.complexion}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.complexion.opacity.min}
              max={settings.headOverlays.complexion.opacity.max}
              factor={settings.headOverlays.complexion.opacity.factor}
              defaultValue={data.headOverlays.complexion.opacity}
              onChange={value => handleHeadOverlayChange('complexion', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.complexion.style.min}
              max={settings.headOverlays.complexion.style.max}
              defaultValue={data.headOverlays.complexion.style}
              clientValue={storedData.headOverlays.complexion.style}
              onChange={value => handleHeadOverlayChange('complexion', 'style', value)}
            />
          </Item>
          <Item title={ho.sunDamage}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.sunDamage.opacity.min}
              max={settings.headOverlays.sunDamage.opacity.max}
              factor={settings.headOverlays.sunDamage.opacity.factor}
              defaultValue={data.headOverlays.sunDamage.opacity}
              onChange={value => handleHeadOverlayChange('sunDamage', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.sunDamage.style.min}
              max={settings.headOverlays.sunDamage.style.max}
              defaultValue={data.headOverlays.sunDamage.style}
              clientValue={storedData.headOverlays.sunDamage.style}
              onChange={value => handleHeadOverlayChange('sunDamage', 'style', value)}
            />
          </Item>
          <Item title={ho.moleAndFreckles}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.moleAndFreckles.opacity.min}
              max={settings.headOverlays.moleAndFreckles.opacity.max}
              factor={settings.headOverlays.moleAndFreckles.opacity.factor}
              defaultValue={data.headOverlays.moleAndFreckles.opacity}
              onChange={value => handleHeadOverlayChange('moleAndFreckles', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.moleAndFreckles.style.min}
              max={settings.headOverlays.moleAndFreckles.style.max}
              defaultValue={data.headOverlays.moleAndFreckles.style}
              clientValue={storedData.headOverlays.moleAndFreckles.style}
              onChange={value => handleHeadOverlayChange('moleAndFreckles', 'style', value)}
            />
          </Item>
          <Item title={ho.chestHair}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.chestHair.opacity.min}
              max={settings.headOverlays.chestHair.opacity.max}
              factor={settings.headOverlays.chestHair.opacity.factor}
              defaultValue={data.headOverlays.chestHair.opacity}
              onChange={value => handleHeadOverlayChange('chestHair', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.chestHair.style.min}
              max={settings.headOverlays.chestHair.style.max}
              defaultValue={data.headOverlays.chestHair.style}
              clientValue={storedData.headOverlays.chestHair.style}
              onChange={value => handleHeadOverlayChange('chestHair', 'style', value)}
            />
            <ColorInput
              title={ho.color}
              colors={settings.headOverlays.chestHair.color?.items}
              defaultValue={data.headOverlays.chestHair.color}
              clientValue={storedData.headOverlays.chestHair.color}
              onChange={value => handleHeadOverlayChange('chestHair', 'color', value)}
            />
          </Item>
          <Item title={ho.bodyBlemishes}>
            <RangeInput
              title={ho.opacity}
              min={settings.headOverlays.bodyBlemishes.opacity.min}
              max={settings.headOverlays.bodyBlemishes.opacity.max}
              factor={settings.headOverlays.bodyBlemishes.opacity.factor}
              defaultValue={data.headOverlays.bodyBlemishes.opacity}
              onChange={value => handleHeadOverlayChange('bodyBlemishes', 'opacity', value)}
            />
            <Input
              title={ho.style}
              min={settings.headOverlays.bodyBlemishes.style.min}
              max={settings.headOverlays.bodyBlemishes.style.max}
              defaultValue={data.headOverlays.bodyBlemishes.style}
              clientValue={storedData.headOverlays.bodyBlemishes.style}
              onChange={value => handleHeadOverlayChange('bodyBlemishes', 'style', value)}
            />
          </Item>
        </>
      )}
    </>
  );
};

export default HeadOverlays;
