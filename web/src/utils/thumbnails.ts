export type ThumbKind = 'component' | 'prop' | 'overlay';

export type ThumbGender = 'male' | 'female';

export interface ThumbnailRef {
  kind: ThumbKind;
  id: number;
  gender: ThumbGender;
}

// URL scheme is defined by uz_AutoShot's capture pipeline:
//   components: /shots/<gender>/<id>/<drawable>.png
//   props:      /shots/<gender>/prop_<id>/<drawable>.png
//   overlays:   /shots/<gender>/overlay_<id>/<drawable>.png
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
