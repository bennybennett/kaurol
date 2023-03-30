export const generateColor = (text: string) => {
  const hash = text
    .split('')
    .reduce((acc, char) => (acc * 56 + char.charCodeAt(0)) % 256, 0);

  const hue = Math.floor((hash / 256) * 360);

  const color = `hsl(${hue}, 50%, 50%)`;
  const darkerColor = `hsl(${hue}, 60%, 20%)`;

  return { backgroundColor: color, color: darkerColor };
};
