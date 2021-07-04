import { MultiPolygon, Polygon } from 'geojson';
import izhevsk from './izhevsk.json';
import moscow from './moscow.json';
import naberezhnyeChelny from './naberezhnye-chelny.json';
import spb from './spb.json';

export function getFallbackBorders(
  cityName: string
): MultiPolygon | Polygon | undefined {
  switch (cityName) {
    case 'Ижевск':
      return {
        ...izhevsk,
        type: 'Polygon' as const,
      };
    case 'Москва':
      return {
        ...moscow,
        type: 'MultiPolygon' as const,
      };
    case 'Набережные Челны':
      return {
        ...naberezhnyeChelny,
        type: 'Polygon' as const,
      };
    case 'Санкт-Петербург':
      return {
        ...spb,
        type: 'Polygon' as const,
      };
  }
}
