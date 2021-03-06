import { Isolines } from 'src/models/isoline';

// adds 3rd (z) coordinate to isolines points based on isoline value
export const isolinesZ = (isolines: Isolines): Isolines => ({
  ...isolines,
  features: isolines.features.map((f, i) => ({
    ...f,
    properties: f.properties,
    geometry: {
      type: 'MultiPolygon',
      coordinates: f.geometry.coordinates.map((contour) =>
        contour.map((coord) =>
          coord.map((crd) => [
            ...crd,
            ((f.properties.value ** 1.0) ** 1.1) ** 1.2,
          ])
        )
      ),
    },
  })),
});
