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

  const ff = locales.faceFeatures;
  return (
    <>
      <Item title={ff.nose.title}>
        <RangeInput
          title={ff.nose.width}
          min={settings.noseWidth.min}
          max={settings.noseWidth.max}
          factor={settings.noseWidth.factor}
          defaultValue={data.noseWidth}
          onChange={value => handleFaceFeatureChange('noseWidth', value)}
        />
        <RangeInput
          title={ff.nose.height}
          min={settings.nosePeakHigh.min}
          max={settings.nosePeakHigh.max}
          factor={settings.nosePeakHigh.factor}
          defaultValue={data.nosePeakHigh}
          onChange={value => handleFaceFeatureChange('nosePeakHigh', value)}
        />
        <RangeInput
          title={ff.nose.size}
          min={settings.nosePeakSize.min}
          max={settings.nosePeakSize.max}
          factor={settings.nosePeakSize.factor}
          defaultValue={data.nosePeakSize}
          onChange={value => handleFaceFeatureChange('nosePeakSize', value)}
        />
        <RangeInput
          title={ff.nose.boneHeight}
          min={settings.noseBoneHigh.min}
          max={settings.noseBoneHigh.max}
          factor={settings.noseBoneHigh.factor}
          defaultValue={data.noseBoneHigh}
          onChange={value => handleFaceFeatureChange('noseBoneHigh', value)}
        />
        <RangeInput
          title={ff.nose.peakHeight}
          min={settings.nosePeakLowering.min}
          max={settings.nosePeakLowering.max}
          factor={settings.nosePeakLowering.factor}
          defaultValue={data.nosePeakLowering}
          onChange={value => handleFaceFeatureChange('nosePeakLowering', value)}
        />
        <RangeInput
          title={ff.nose.boneTwist}
          min={settings.noseBoneTwist.min}
          max={settings.noseBoneTwist.max}
          factor={settings.noseBoneTwist.factor}
          defaultValue={data.noseBoneTwist}
          onChange={value => handleFaceFeatureChange('noseBoneTwist', value)}
        />
      </Item>
      <Item title={ff.eyebrows.title}>
        <RangeInput
          title={ff.eyebrows.height}
          min={settings.eyeBrownHigh.min}
          max={settings.eyeBrownHigh.max}
          factor={settings.eyeBrownHigh.factor}
          defaultValue={data.eyeBrownHigh}
          onChange={value => handleFaceFeatureChange('eyeBrownHigh', value)}
        />
        <RangeInput
          title={ff.eyebrows.depth}
          min={settings.eyeBrownForward.min}
          max={settings.eyeBrownForward.max}
          factor={settings.eyeBrownForward.factor}
          defaultValue={data.eyeBrownForward}
          onChange={value => handleFaceFeatureChange('eyeBrownForward', value)}
        />
      </Item>
      <Item title={ff.cheeks.title}>
        <RangeInput
          title={ff.cheeks.boneHeight}
          min={settings.cheeksBoneHigh.min}
          max={settings.cheeksBoneHigh.max}
          factor={settings.cheeksBoneHigh.factor}
          defaultValue={data.cheeksBoneHigh}
          onChange={value => handleFaceFeatureChange('cheeksBoneHigh', value)}
        />
        <RangeInput
          title={ff.cheeks.boneWidth}
          min={settings.cheeksBoneWidth.min}
          max={settings.cheeksBoneWidth.max}
          factor={settings.cheeksBoneWidth.factor}
          defaultValue={data.cheeksBoneWidth}
          onChange={value => handleFaceFeatureChange('cheeksBoneWidth', value)}
        />
        <RangeInput
          title={ff.cheeks.width}
          min={settings.cheeksWidth.min}
          max={settings.cheeksWidth.max}
          factor={settings.cheeksWidth.factor}
          defaultValue={data.cheeksWidth}
          onChange={value => handleFaceFeatureChange('cheeksWidth', value)}
        />
      </Item>
      <Item title={ff.eyesAndMouth.title}>
        <RangeInput
          title={ff.eyesAndMouth.eyesOpening}
          min={settings.eyesOpening.min}
          max={settings.eyesOpening.max}
          factor={settings.eyesOpening.factor}
          defaultValue={data.eyesOpening}
          onChange={value => handleFaceFeatureChange('eyesOpening', value)}
        />
        <RangeInput
          title={ff.eyesAndMouth.lipsThickness}
          min={settings.lipsThickness.min}
          max={settings.lipsThickness.max}
          factor={settings.lipsThickness.factor}
          defaultValue={data.lipsThickness}
          onChange={value => handleFaceFeatureChange('lipsThickness', value)}
        />
      </Item>
      <Item title={ff.jaw.title}>
        <RangeInput
          title={ff.jaw.width}
          min={settings.jawBoneWidth.min}
          max={settings.jawBoneWidth.max}
          factor={settings.jawBoneWidth.factor}
          defaultValue={data.jawBoneWidth}
          onChange={value => handleFaceFeatureChange('jawBoneWidth', value)}
        />
        <RangeInput
          title={ff.jaw.size}
          min={settings.jawBoneBackSize.min}
          max={settings.jawBoneBackSize.max}
          factor={settings.jawBoneBackSize.factor}
          defaultValue={data.jawBoneBackSize}
          onChange={value => handleFaceFeatureChange('jawBoneBackSize', value)}
        />
      </Item>
      <Item title={ff.chin.title}>
        <RangeInput
          title={ff.chin.lowering}
          min={settings.chinBoneLowering.min}
          max={settings.chinBoneLowering.max}
          factor={settings.chinBoneLowering.factor}
          defaultValue={data.chinBoneLowering}
          onChange={value => handleFaceFeatureChange('chinBoneLowering', value)}
        />
        <RangeInput
          title={ff.chin.length}
          min={settings.chinBoneLenght.min}
          max={settings.chinBoneLenght.max}
          factor={settings.chinBoneLenght.factor}
          defaultValue={data.chinBoneLenght}
          onChange={value => handleFaceFeatureChange('chinBoneLenght', value)}
        />
        <RangeInput
          title={ff.chin.size}
          min={settings.chinBoneSize.min}
          max={settings.chinBoneSize.max}
          factor={settings.chinBoneSize.factor}
          defaultValue={data.chinBoneSize}
          onChange={value => handleFaceFeatureChange('chinBoneSize', value)}
        />
        <RangeInput
          title={ff.chin.hole}
          min={settings.chinHole.min}
          max={settings.chinHole.max}
          factor={settings.chinHole.factor}
          defaultValue={data.chinHole}
          onChange={value => handleFaceFeatureChange('chinHole', value)}
        />
      </Item>
      <Item title={ff.neck.title}>
        <RangeInput
          title={ff.neck.thickness}
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
