const HIGH_RES_ARTWORK_SUFFIX = "1000x1000bb.jpg";
const STANDARD_ARTWORK_SUFFIX = "100x100bb.jpg";

export const getHighResArtworkUrl = (artworkUrl100: string): string => {
  return artworkUrl100.replace(STANDARD_ARTWORK_SUFFIX, HIGH_RES_ARTWORK_SUFFIX);
};