type RGBAArray = [R: number, G: number, B: number, A?: number];
const Transparent = [0, 0, 0, 0] as RGBAArray;

// convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
const toRGGBAstr = (RGBAcolor: string): string =>
  `#${RGBAcolor[1]}${RGBAcolor[1]}${RGBAcolor[2]}${RGBAcolor[2]}${
    RGBAcolor[3]
  }${RGBAcolor[3]}${RGBAcolor.length > 4 ? RGBAcolor[4] + RGBAcolor[4] : ''}`;

const getColorArryFromRGGBA = (RGGBAcolorString: string): RGBAArray => [
  parseInt(RGGBAcolorString.substr(1, 2), 16), // R
  parseInt(RGGBAcolorString.substr(3, 2), 16), // G
  parseInt(RGGBAcolorString.substr(5, 2), 16), // B
  RGGBAcolorString.length > 7
    ? parseInt(RGGBAcolorString.substr(7, 2), 16) / 255
    : 255, // [ A ]
];

export const colorToArray = (color: string): RGBAArray | null => {
  if (!color) return null;
  if (color.indexOf('rgb') === 0) {
    if (color.indexOf('rgba') === -1) {
      color += ',255'; // convert 'rgb(R,G,B)' to 'rgb(R,G,B)A' which looks awful but will pass the regxep below https://gist.github.com/oriadam/396a4beaaad465ca921618f2f2444d49
      return color.match(/[\.\d]+/g)?.map((a) => +a) as RGBAArray | null;
    }
    const parsed = color.match(/[\.\d]+/g)?.map((a) => +a);
    if (!parsed) return null;
    
    const res = [...parsed, 255];
    return res as RGBAArray | null;
  }
  if (color.toLowerCase() === 'transparent') return Transparent;
  // if not rgba color string -> convert to it
  if (color.length < 7) return getColorArryFromRGGBA(toRGGBAstr(color));
  return getColorArryFromRGGBA(color);
};
