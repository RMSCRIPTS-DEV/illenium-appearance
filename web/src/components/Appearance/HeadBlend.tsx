import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import Input from './components/Input';
import RangeInput from './components/RangeInput';

import { PedHeadBlend, HeadBlendSettings } from './interfaces';

interface HeadBlendProps {
  settings: HeadBlendSettings;
  storedData: PedHeadBlend;
  data: PedHeadBlend;
  handleHeadBlendChange: (key: keyof PedHeadBlend, value: number) => void;
}

const HeadBlend = ({ settings, storedData, data, handleHeadBlendChange }: HeadBlendProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  const hb = locales.headBlend;
  return (
    <>
      <Item title={hb.shape.title}>
        <Input
          title={hb.shape.firstOption}
          min={settings.shapeFirst.min}
          max={settings.shapeFirst.max}
          defaultValue={data.shapeFirst}
          clientValue={storedData.shapeFirst}
          onChange={value => handleHeadBlendChange('shapeFirst', value)}
        />
        <Input
          title={hb.shape.secondOption}
          min={settings.shapeSecond.min}
          max={settings.shapeSecond.max}
          defaultValue={data.shapeSecond}
          clientValue={storedData.shapeSecond}
          onChange={value => handleHeadBlendChange('shapeSecond', value)}
        />
        <RangeInput
          title={hb.shape.mix}
          min={settings.shapeMix.min}
          max={settings.shapeMix.max}
          factor={settings.shapeMix.factor}
          defaultValue={data.shapeMix}
          onChange={value => handleHeadBlendChange('shapeMix', value)}
        />
      </Item>
      <Item title={hb.skin.title}>
        <Input
          title={hb.skin.firstOption}
          min={settings.skinFirst.min}
          max={settings.skinFirst.max}
          defaultValue={data.skinFirst}
          clientValue={storedData.skinFirst}
          onChange={value => handleHeadBlendChange('skinFirst', value)}
        />
        <Input
          title={hb.skin.secondOption}
          min={settings.skinSecond.min}
          max={settings.skinSecond.max}
          defaultValue={data.skinSecond}
          clientValue={storedData.skinSecond}
          onChange={value => handleHeadBlendChange('skinSecond', value)}
        />
        <RangeInput
          title={hb.skin.mix}
          min={settings.skinMix.min}
          max={settings.skinMix.max}
          factor={settings.skinMix.factor}
          defaultValue={data.skinMix}
          onChange={value => handleHeadBlendChange('skinMix', value)}
        />
      </Item>
      <Item title={hb.race.title}>
        <Input
          title={hb.race.shape}
          min={settings.shapeThird.min}
          max={settings.shapeThird.max}
          defaultValue={data.shapeThird}
          clientValue={storedData.shapeThird}
          onChange={value => handleHeadBlendChange('shapeThird', value)}
        />
        <Input
          title={hb.race.skin}
          min={settings.skinThird.min}
          max={settings.skinThird.max}
          defaultValue={data.skinThird}
          clientValue={storedData.skinThird}
          onChange={value => handleHeadBlendChange('skinThird', value)}
        />
        <RangeInput
          title={hb.race.mix}
          min={settings.thirdMix.min}
          max={settings.thirdMix.max}
          factor={settings.thirdMix.factor}
          defaultValue={data.thirdMix}
          onChange={value => handleHeadBlendChange('thirdMix', value)}
        />
      </Item>
    </>
  );
};

export default HeadBlend;
