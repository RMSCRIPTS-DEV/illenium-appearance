import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { vp, vpClamp } from '../../../styles/scale';
import { buildThumbUrl, ThumbnailTarget } from '../../../utils/thumbnails';

interface ThumbnailGridProps {
  target: ThumbnailTarget;
  min: number;
  max: number;
  selected: number;
  blacklisted?: number[];
  onSelect: (value: number) => void;
}

const GridWrapper = styled.div`
  width: 100%;
  max-height: ${vpClamp(440, 320, 640)};
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: min-content;
  align-items: start;
  gap: ${vp(8)};
  padding: ${vp(4)} ${vp(2)};

  &::-webkit-scrollbar {
    width: ${vp(6)};
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgba(${theme.borderColorSoft || '55, 58, 64'}, 0.8)`};
    border-radius: ${vp(3)};
  }
`;

const Tile = styled.button<{ $selected: boolean }>`
  position: relative;
  width: 100%;
  padding: 0;
  padding-top: 100%;
  height: 0;
  cursor: pointer;
  background: ${({ theme }) => `rgb(${theme.surfaceBackground || '37, 38, 43'})`};
  border: ${vp(2)} solid
    ${({ theme, $selected }) =>
      $selected
        ? `rgb(${theme.accentColor || '77, 171, 247'})`
        : `rgba(${theme.borderColorSoft || '55, 58, 64'}, 1)`};
  border-radius: ${vp(8)};
  overflow: hidden;
  transition: all 0.15s ease;
  box-shadow: ${({ theme, $selected }) =>
    $selected ? `0 0 ${vp(12)} rgba(${theme.accentColor || '77, 171, 247'}, 0.4)` : 'none'};

  &:hover {
    border-color: ${({ theme }) => `rgb(${theme.accentColor || '77, 171, 247'})`};
  }
`;

const TileInner = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: transparent;
  }
`;

const Badge = styled.span`
  position: absolute;
  left: ${vp(6)};
  bottom: ${vp(6)};
  padding: ${vp(2)} ${vp(6)};
  border-radius: ${vp(4)};
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: ${vp(10)};
  font-weight: 600;
  font-family: 'Nexa-Book', sans-serif;
  pointer-events: none;
  z-index: 2;
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => `rgba(${theme.fontColor || '193, 194, 197'}, 0.65)`};
  font-size: ${vp(16)};
  font-weight: 600;
  font-family: 'Nexa-Book', sans-serif;
  pointer-events: none;
  letter-spacing: 0.02em;
`;

const ThumbnailTile = ({
  target,
  value,
  selected,
  onSelect,
}: {
  target: ThumbnailTarget;
  value: number;
  selected: boolean;
  onSelect: (value: number) => void;
}) => {
  const [broken, setBroken] = useState(false);
  const url = buildThumbUrl(target.gender, target.kind, target.id, value);

  return (
    <Tile type="button" $selected={selected} onClick={() => onSelect(value)}>
      {broken ? (
        <Placeholder>#{value}</Placeholder>
      ) : (
        <>
          <TileInner>
            <img
              src={url}
              loading="lazy"
              alt={`#${value}`}
              onError={() => setBroken(true)}
            />
          </TileInner>
          <Badge>#{value}</Badge>
        </>
      )}
    </Tile>
  );
};

const ThumbnailGrid: React.FC<ThumbnailGridProps> = ({
  target,
  min,
  max,
  selected,
  blacklisted = [],
  onSelect,
}) => {
  const values = useMemo(() => {
    const out: number[] = [];
    const blocked = new Set(blacklisted.map(n => Number(n)));
    for (let i = min; i <= max; i++) {
      if (!blocked.has(i)) out.push(i);
    }
    return out;
  }, [min, max, blacklisted]);

  return (
    <GridWrapper>
      {values.map(value => (
        <ThumbnailTile
          key={value}
          target={target}
          value={value}
          selected={value === selected}
          onSelect={onSelect}
        />
      ))}
    </GridWrapper>
  );
};

export default ThumbnailGrid;
