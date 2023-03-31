function fnv1a(text: string) {
  const FNV_PRIME = 0x01000193;
  const FNV_OFFSET_BASIS = 0x811c9dc5;
  let hash = FNV_OFFSET_BASIS;

  for (const char of text) {
    hash ^= char.charCodeAt(0);
    hash *= FNV_PRIME;
  }

  return hash >>> 0;
}

export const generateColor = (text: string) => {
  const hash = fnv1a(text);

  const hue = Math.floor((hash / 0xffffffff) * 360);

  const color = `hsl(${hue}, 50%, 50%)`;
  const darkerColor = `hsl(${hue}, 60%, 20%)`;

  return { backgroundColor: color, color: darkerColor };
};
