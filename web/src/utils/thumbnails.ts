export type ThumbGender = 'male' | 'female';
export type ThumbKind = 'component' | 'prop' | 'overlay';

export interface ThumbnailTarget {
  kind: ThumbKind;
  id: number;
  gender: ThumbGender;
}

export function buildThumbUrl(
  gender: ThumbGender,
  kind: ThumbKind,
  id: number,
  drawable: number,
): string {
  const seg =
    kind === 'prop' ? `prop_${id}` :
    kind === 'overlay' ? `overlay_${id}` :
    `${id}`;
  return `https://cfx-nui-uz_AutoShot/shots/${gender}/${seg}/${drawable}.png`;
}
