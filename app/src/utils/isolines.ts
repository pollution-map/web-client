import polygonSmooth from '@turf/polygon-smooth';
import { ContourFN, geoContour } from 'd3-geo-voronoi';
import { GeoPoint, GeoPointW, PointWeight } from 'geo-points';
import { FeatureCollection, MultiPolygon, Position } from 'geojson';

export const isolines = (
  borders: Array<GeoPoint>,
  data: Array<GeoPointW>,
  smooth: number = 4,
  configure: (contour: ContourFN) => ContourFN = (c) => c.tresholds(11)
): FeatureCollection<MultiPolygon, { value: PointWeight }> => {
  const input = [...borders, ...data];
  const c = configure(geoContour());
  const contours = c(input);
  const smoothen = contours.map((crv: MultiPolygon) =>
    polygonSmooth(crv, { iterations: smooth })
  );

  const result = {
    type: 'FeatureCollection' as const,
    features: smoothen
      .map((f, i) => ({
        ...f.features[0],
        properties: {
          // save value data when smoothing
          value: contours[i].value,
        },
      }))
      // filter out corrupted polygons after smoothing
      .filter((f) =>
        f.geometry.coordinates
          .flat(2)
          .every((crv: Position) => typeof crv !== 'undefined')
      ),
  };

  return result;
};
