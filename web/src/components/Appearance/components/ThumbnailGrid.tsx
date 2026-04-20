import { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { vp } from '../../../styles/scale';
import { buildThumbUrl, ThumbGender, ThumbKind } from '../../../utils/thumbnails';

interface ThumbnailGridProps {
  kind: ThumbKind;
  id: number;
  gender: ThumbGender;
  min: number;
  max: number;
  selected: number;
  blacklisted?: number[];
  onSelect: (value: number) => void;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${vp(8)};
  width: 100%;
  max-height: ${vp(360)};
  overflow-y: auto;
  padding-right: ${vp(4)};

  &::-webkit-scrollbar { width: ${vp(6)}; }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `rgb(${theme.borderColorSoft || '55, 58, 64'})`};
    border-radius: ${vp(3)};
  }
`;

interface TileProps {
  selected: boolean;
}

const Tile = styled.button<TileProps>`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  padding: 0;
  border-radius: ${vp(6)};
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => `rgb(${theme.surfaceBackgroundAlt || '20, 21, 23'})`};
  border: ${vp(2)} solid transparent;
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => `rgba(${theme.accentColor || '77, 171, 247'}, 0.5)`};
  }

  ${({ selected, theme }) => selected && css`
    border-color: rgb(${theme.accentColor || '77, 171, 247'});
    box-shadow: 0 0 0 ${vp(1)} rgba(${theme.accentColor || '77, 171, 247'}, 0.35);
  `}
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
`;

const Badge = styled.span`
  position: absolute;
  left: ${vp(6)};
  bottom: ${vp(6)};
  padding: ${vp(2)} ${vp(6)};
  font-size: ${vp(10)};
  font-weight: 600;
  font-family: 'Nexa-Book', sans-serif;
  color: ${({ theme }) => `rgb(${theme.fontColor || '193, 194, 197'})`};
  background: rgba(0, 0, 0, 0.65);
  border-radius: ${vp(4)};
  pointer-events: none;
`;

const Empty = styled.div`
  grid-column: 1 / -1;
  padding: ${vp(12)};
  text-align: center;
  font-size: ${vp(11)};
  color: ${({ theme }) => `rgb(${theme.mutedTextColor || '144, 146, 150'})`};
`;

interface TileItemProps {
  url: string;
  value: number;
  selected: boolean;
  onClick: () => void;
}

const TileItem = ({ url, value, selected, onClick }: TileItemProps) => {
  const [failed, setFailed] = useState(false);
  return (
    <Tile type="button" selected={selected} onClick={onClick} title={`#${value}`}>
      {!failed && (
        <Thumb
          src={url}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
      <Badge>{`#${value}`}</Badge>
    </Tile>
  );
};

const ThumbnailGrid = ({
  kind,
  id,
  gender,
  min,
  max,
  selected,
  blacklisted = [],
  onSelect,
}: ThumbnailGridProps) => {
  const blacklistSet = useMemo(() => {
    const s = new Set<number>();
    for (const v of blacklisted) {
      const n = Number(v);
      if (!isNaN(n)) s.add(n);
    }
    return s;
  }, [blacklisted]);

  const values = useMemo(() => {
    const out: number[] = [];
    if (max < min) return out;
    for (let v = min; v <= max; v++) {
      if (!blacklistSet.has(v)) out.push(v);
    }
    return out;
  }, [min, max, blacklistSet]);

  if (values.length === 0) {
    return <Grid><Empty>No variations available.</Empty></Grid>;
  }

  return (
    <Grid>
      {values.map(value => (
        <TileItem
          key={value}
          url={buildThumbUrl(gender, kind, id, value)}
          value={value}
          selected={value === selected}
          onClick={() => onSelect(value)}
        />
      ))}
    </Grid>
  );
};

export default ThumbnailGrid;
