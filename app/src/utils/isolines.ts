import polygonSmooth from '@turf/polygon-smooth';
import { extent, scaleLinear } from 'd3';
import { ContourFN, geoContour } from 'd3-geo-voronoi';
import { FeatureCollection, MultiPolygon, Position } from 'geojson';
import { GeoPoint, GeoPointO, GeoPointW, PointWeight, WeightObject } from 'src/models/geo-point';
import { Isolines } from 'src/models/isoline';

export const isolines = (
  borders: Array<GeoPoint>,
  data: Array<GeoPointW>,
  smooth: number = 3,
  configure: (contour: ContourFN) => ContourFN = (c) => c.thresholds(11)
): FeatureCollection<MultiPolygon, { value: PointWeight }> => {
  const input = [...borders, ...data];
  const c = configure(geoContour());
  const contours = c(input);
  const smoothedContours = contours.map((crv: MultiPolygon) =>
    polygonSmooth(crv, { iterations: smooth })
  );

  const result = {
    type: 'FeatureCollection' as const,
    features: smoothedContours
      // filter out corrupted polygons after smoothing
      .filter((f) =>
        f.features[0].geometry.coordinates
          .flat(2)
          .every((crv: Position) => typeof crv !== 'undefined')
      )
      .map((f, i) => ({
        ...f.features[0],
        properties: {
          // save value data when smoothing
          value: contours[i].value,
        },
      }))
      
  };

  return result;
};

export interface IActiveParams {
  [name: string]: boolean
}

// BUG: значения value некорректно соотносятся с предметной областью
//      например, если значения предметной области превышают 100, то value достигает 100
//      если же значения предметной области, не достигают 100, то и value не достигает 100
//      ожидаемое поведение: value для любой предметной области должен быть в диапазоне от 0 до 100

export const comboisolines = (
  borders: Array<GeoPoint>,
  data: Array<GeoPointO<WeightObject>>,
  modes: IActiveParams,
  smooth: number = 4,
  configure: (contour: ContourFN) => ContourFN = (c) => c.thresholds(20)
): Isolines => {
  const acitveModes = Object.fromEntries(
    Object.entries(modes).filter(([modeName, isActive]) => isActive)
  );
  const activeModesCount = Object.keys(acitveModes).length;

  const scales = Object.fromEntries(
    Object.entries(modes).map(([paramName, isActive]) => [
      paramName,
      isActive
        ? // create scale of range [0, 100] for each active param
          // example of scale: dataItem.values.polution was [-434, 1000] -> became [0, 100]
          scaleLinear()
            .domain(
              extent(
                data.map(([lat, lon, valueObj]) => valueObj[paramName])
              ) as [minValOfParam: number, maxValOfParam: number]
            )
            .range([0, 100]).nice().clamp(true)
        : scaleLinear().range([0, 0]).clamp(true).unknown(0),
    ])
  );

  // data with (all params of valueObj) merged to a single value
  const mergedData = data.map(([lat, lon, valueObj]) => [
    lat,
    lon,
    // value = sum all values of params and divide by count of params
    // (it merges correctly because all params have been translated to [0, 100] domain)
    Object.entries(valueObj).filter(([paramName]) => {
      return paramName in acitveModes;
    }).reduce(
      ([accumName, accumParamValue], [paramName, paramValue]) => {
        return ['', accumParamValue +  scales[paramName](paramValue)];
      }
    , ['', 0])[1] / activeModesCount,
  ]) as Array<GeoPointW>;

  const input = [...borders, ...mergedData];
  let c = geoContour();
  console.log(JSON.stringify(c));
  c = configure(c);
  const contours = c(input);
  const smoothedContours = contours.map((crv: MultiPolygon) =>
    polygonSmooth(crv, { iterations: smooth })
  );

  const result = {
    type: 'FeatureCollection' as const,
    features: smoothedContours
      // filter out corrupted polygons after smoothing
      .filter((f) =>
        f.features[0].geometry.coordinates
          .flat(2)
          .every((crv: Position) => typeof crv !== 'undefined')
      )
      .map((f, i) => ({
        ...f.features[0],
        properties: {
          ...Object.fromEntries(
            // save value data when smoothing
            // & add data for all active params
            Object.entries(scales)
              // result geoJson contains active modes ...
              .filter(([paramName]) => paramName in acitveModes) 
              .map(([param, paramScale]) => [
                param,
                paramScale.invert(contours[i].value),
              ])
          ),
          // ... and value
          value: contours[i].value,
        }
      })),
  };

  return result;
};