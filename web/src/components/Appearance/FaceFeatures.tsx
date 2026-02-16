import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import RangeInput from './components/RangeInput';

import { PedFaceFeatures, FaceFeaturesSettings } from './interfaces';

interface FaceFeaturesProps {
  settings: FaceFeaturesSettings;
  storedData: PedFaceFeatures;
  data: PedFaceFeatures;
  handleFaceFeatureChange: (key: keyof PedFaceFeatures, value: number) => void;
}

const FaceFeatures = ({ settings, storedData, data, handleFaceFeatureChange }: FaceFeaturesProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <>
      <Item title="Nose (Base)">
        <RangeInput
          title="Width"
          min={settings.noseWidth.min}
          max={settings.noseWidth.max}
          factor={settings.noseWidth.factor}
          defaultValue={data.noseWidth}
          onChange={value => handleFaceFeatureChange('noseWidth', value)}
        />
        <RangeInput
          title="Height"
          min={settings.nosePeakHigh.min}
          max={settings.nosePeakHigh.max}
          factor={settings.nosePeakHigh.factor}
          defaultValue={data.nosePeakHigh}
          onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
        />
        <RangeInput
          title="Size"
          min={settings.nosePeakSize.min}
          max={settings.nosePeakSize.max}
          factor={settings.nosePeakSize.factor}
          defaultValue={data.nosePeakSize}
          onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
        />
        <RangeInput
          title="Bone Height"
          min={settings.noseBoneHigh.min}
          max={settings.noseBoneHigh.max}
          factor={settings.noseBoneHigh.factor}
          defaultValue={data.noseBoneHigh}
          onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
        />
        <RangeInput
          title="Peak Height"
          min={settings.nosePeakLowering.min}
          max={settings.nosePeakLowering.max}
          factor={settings.nosePeakLowering.factor}
          defaultValue={data.nosePeakLowering}
          onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
        />
        <RangeInput
          title="Bone Twist"
          min={settings.noseBoneTwist.min}
          max={settings.noseBoneTwist.max}
          factor={settings.noseBoneTwist.factor}
          defaultValue={data.noseBoneTwist}
          onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
        />
      </Item>
      <Item title="Eyebrows (Base)">
        <RangeInput
          title="Height"
          min={settings.eyeBrownHigh.min}
          max={settings.eyeBrownHigh.max}
          factor={settings.eyeBrownHigh.factor}
          defaultValue={data.eyeBrownHigh}
          onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
        />
        <RangeInput
          title="Depth"
          min={settings.eyeBrownForward.min}
          max={settings.eyeBrownForward.max}
          factor={settings.eyeBrownForward.factor}
          defaultValue={data.eyeBrownForward}
          onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
        />
      </Item>
      <Item title="Cheeks (Base)">
        <RangeInput
          title="Bone Height"
          min={settings.cheeksBoneHigh.min}
          max={settings.cheeksBoneHigh.max}
          factor={settings.cheeksBoneHigh.factor}
          defaultValue={data.cheeksBoneHigh}
          onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
        />
        <RangeInput
          title="Bone Width"
          min={settings.cheeksBoneWidth.min}
          max={settings.cheeksBoneWidth.max}
          factor={settings.cheeksBoneWidth.factor}
          defaultValue={data.cheeksBoneWidth}
          onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
        />
        <RangeInput
          title="Width"
          min={settings.cheeksWidth.min}
          max={settings.cheeksWidth.max}
          factor={settings.cheeksWidth.factor}
          defaultValue={data.cheeksWidth}
          onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
        />
      </Item>
      <Item title="Eyes & Mouth (Base)">
        <RangeInput
          title="Eyes Opening"
          min={settings.eyesOpening.min}
          max={settings.eyesOpening.max}
          factor={settings.eyesOpening.factor}
          defaultValue={data.eyesOpening}
          onChange={value => handleFaceFeatureChange('eyesOpening', value)}
        />
        <RangeInput
          title="Lips Thickness"
          min={settings.lipsThickness.min}
          max={settings.lipsThickness.max}
          factor={settings.lipsThickness.factor}
          defaultValue={data.lipsThickness}
          onChange={value => handleFaceFeatureChange('lipsThickness', value)}
        />
      </Item>
      <Item title="Jaw (Base)">
        <RangeInput
          title="Width"
          min={settings.jawBoneWidth.min}
          max={settings.jawBoneWidth.max}
          factor={settings.jawBoneWidth.factor}
          defaultValue={data.jawBoneWidth}
          onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
        />
        <RangeInput
          title="Size"
          min={settings.jawBoneBackSize.min}
          max={settings.jawBoneBackSize.max}
          factor={settings.jawBoneBackSize.factor}
          defaultValue={data.jawBoneBackSize}
          onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
        />
      </Item>
      <Item title="Chin (Base)">
        <RangeInput
          title="Lowering"
          min={settings.chinBoneLowering.min}
          max={settings.chinBoneLowering.max}
          factor={settings.chinBoneLowering.factor}
          defaultValue={data.chinBoneLowering}
          onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
        />
        <RangeInput
          title="Length"
          min={settings.chinBoneLenght.min}
          max={settings.chinBoneLenght.max}
          factor={settings.chinBoneLenght.factor}
          defaultValue={data.chinBoneLenght}
          onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
        />
        <RangeInput
          title="Size"
          min={settings.chinBoneSize.min}
          max={settings.chinBoneSize.max}
          factor={settings.chinBoneSize.factor}
          defaultValue={data.chinBoneSize}
          onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
        />
        <RangeInput
          title="Hole"
          min={settings.chinHole.min}
          max={settings.chinHole.max}
          factor={settings.chinHole.factor}
          defaultValue={data.chinHole}
          onChange={value => handleFaceFeatureChange('chinHole', value)}
        />
      </Item>
      <Item title="Neck (Base)">
        <RangeInput
          title="Thickness"
          min={settings.neckThickness.min}
          max={settings.neckThickness.max}
          factor={settings.neckThickness.factor}
          defaultValue={data.neckThickness}
          onChange={value => handleFaceFeatureChange('neckThickness', value)}
        />
      </Item>
    </>
  );
};

export default FaceFeatures;
