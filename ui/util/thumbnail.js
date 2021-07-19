// @flow
import { THUMBNAIL_CDN_URL } from 'config';

const THUMBNAIL_HEIGHT = 220;
const THUMBNAIL_WIDTH = 390;
const THUMBNAIL_QUALITY = 85;

type Props = {
  thumbnail: ?string,
  height?: number,
  width?: number,
  quality?: number,
};

export function getThumbnailCdnUrl(props: Props) {
  const { thumbnail, height = THUMBNAIL_HEIGHT, width = THUMBNAIL_WIDTH, quality = THUMBNAIL_QUALITY } = props;

  if (!THUMBNAIL_CDN_URL || !thumbnail) {
    return thumbnail;
  }

  if (thumbnail) {
    return `${THUMBNAIL_CDN_URL}s:${width}:${height}/quality:${quality}/plain/${thumbnail}`;
  }
}
