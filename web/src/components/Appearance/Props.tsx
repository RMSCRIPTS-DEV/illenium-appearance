import { useNuiState } from '../../hooks/nuiState';

import Item from './components/Item';
import Input from './components/Input';

import { PropSettings, PedProp, PropConfig } from './interfaces';

interface PropsProps {
  settings: PropSettings[];
  data: PedProp[];
  storedData: PedProp[];
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
  propConfig: PropConfig;
}

interface DataById<T> {
  [key: number]: T;
}

const Props = ({ settings, data, storedData, handlePropDrawableChange, handlePropTextureChange, propConfig }: PropsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { prop_id, drawable, texture, blacklist }) => {
    return { ...object, [prop_id]: { drawable, texture, blacklist } };
  }, {} as DataById<Omit<PropSettings, 'prop_id'>>);

  const propsById: any = data.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  const storedPropsById: any = storedData.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  if (!locales) {
    return null;
  }

  const l = locales.props;
  return (
    <>
      {propConfig.hats && (
        <Item title={l.hats}>
          <Input
            title={l.drawable}
            min={settingsById[0].drawable.min}
            max={settingsById[0].drawable.max}
            defaultValue={propsById[0].drawable}
            clientValue={storedPropsById[0].drawable}
            blacklisted={settingsById[0].blacklist.drawables}
            onChange={value => handlePropDrawableChange(0, value)}
          />
          <Input
            title={l.texture}
            min={settingsById[0].texture.min}
            max={settingsById[0].texture.max}
            defaultValue={propsById[0].texture}
            clientValue={storedPropsById[0].texture}
            blacklisted={settingsById[0].blacklist.textures}
            onChange={value => handlePropTextureChange(0, value)}
          />
        </Item>
      )}
      {propConfig.glasses && (
        <Item title={l.glasses}>
          <Input
            title={l.drawable}
            min={settingsById[1].drawable.min}
            max={settingsById[1].drawable.max}
            defaultValue={propsById[1].drawable}
            clientValue={storedPropsById[1].drawable}
            blacklisted={settingsById[1].blacklist.drawables}
            onChange={value => handlePropDrawableChange(1, value)}
          />
          <Input
            title={l.texture}
            min={settingsById[1].texture.min}
            max={settingsById[1].texture.max}
            defaultValue={propsById[1].texture}
            clientValue={storedPropsById[1].texture}
            blacklisted={settingsById[1].blacklist.textures}
            onChange={value => handlePropTextureChange(1, value)}
          />
        </Item>
      )}
      {propConfig.ear && (
        <Item title={l.ear}>
          <Input
            title={l.drawable}
            min={settingsById[2].drawable.min}
            max={settingsById[2].drawable.max}
            defaultValue={propsById[2].drawable}
            clientValue={storedPropsById[2].drawable}
            blacklisted={settingsById[2].blacklist.drawables}
            onChange={value => handlePropDrawableChange(2, value)}
          />
          <Input
            title={l.texture}
            min={settingsById[2].texture.min}
            max={settingsById[2].texture.max}
            defaultValue={propsById[2].texture}
            clientValue={storedPropsById[2].texture}
            blacklisted={settingsById[2].blacklist.textures}
            onChange={value => handlePropTextureChange(2, value)}
          />
        </Item>
      )}
      {propConfig.watches && (
        <Item title={l.watches}>
          <Input
            title={l.drawable}
            min={settingsById[6].drawable.min}
            max={settingsById[6].drawable.max}
            defaultValue={propsById[6].drawable}
            clientValue={storedPropsById[6].drawable}
            blacklisted={settingsById[6].blacklist.drawables}
            onChange={value => handlePropDrawableChange(6, value)}
          />
          <Input
            title={l.texture}
            min={settingsById[6].texture.min}
            max={settingsById[6].texture.max}
            defaultValue={propsById[6].texture}
            clientValue={storedPropsById[6].texture}
            blacklisted={settingsById[6].blacklist.textures}
            onChange={value => handlePropTextureChange(6, value)}
          />
        </Item>
      )}
      {propConfig.bracelets && (
        <Item title={l.bracelets}>
          <Input
            title={l.drawable}
            min={settingsById[7].drawable.min}
            max={settingsById[7].drawable.max}
            defaultValue={propsById[7].drawable}
            clientValue={storedPropsById[7].drawable}
            blacklisted={settingsById[7].blacklist.drawables}
            onChange={value => handlePropDrawableChange(7, value)}
          />
          <Input
            title={l.texture}
            min={settingsById[7].texture.min}
            max={settingsById[7].texture.max}
            defaultValue={propsById[7].texture}
            clientValue={storedPropsById[7].texture}
            blacklisted={settingsById[7].blacklist.textures}
            onChange={value => handlePropTextureChange(7, value)}
          />
        </Item>
      )}
    </>
  );
};

export default Props;
