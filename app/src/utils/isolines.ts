import booleanWithin from '@turf/boolean-within';
import { polygon } from '@turf/helpers';
import polygonSmooth from '@turf/polygon-smooth';
import { extent, scaleLinear } from 'd3';
import { ContourFN, geoContour, MultiPolygonW } from 'd3-geo-voronoi';
import { FeatureCollection, MultiPolygon, Position } from 'geojson';
import {
  GeoPoint,
  GeoPointO,
  GeoPointW,
  PointWeight,
  WeightObject,
} from 'src/models/geo-point';
import { Isolines, NoIsolines } from 'src/models/isoline';
import { hashCode } from './hashCode';

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
      })),
  };

  return result;
};

export interface IActiveParams {
  [name: string]: boolean;
}

export const comboisolines = (
  borders: Array<GeoPoint> | undefined,
  data: Array<GeoPointO<WeightObject>> | undefined,
  modes: IActiveParams,
  smooth: number = 4,
  configure: (contour: ContourFN) => ContourFN = (c) => c.thresholds(30)
): Isolines => {
  if (!borders || !data) return NoIsolines;
  const acitveModes = Object.fromEntries(
    Object.entries(modes).filter(([modeName, isActive]) => isActive)
  );
  const activeModesCount = Object.keys(acitveModes).length;
  if (!activeModesCount) return NoIsolines;

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
            .range([0, 100])
            .nice()
            .clamp(true)
        : scaleLinear().range([0, 0]).clamp(true).unknown(0),
    ])
  );

  // data with (all params of valueObj) merged to a single value
  const mergedData = data.map(([lat, lon, valueObj]) => [
    lat,
    lon,
    // value = sum all values of params and divide by count of params
    // (it merges correctly because all params have been translated to [0, 100] domain)
    Object.entries(valueObj)
      .filter(([paramName]) => {
        return paramName in acitveModes;
      })
      .reduce(
        ([accumName, accumParamValue], [paramName, paramValue]) => {
          return ['', accumParamValue + scales[paramName](paramValue)];
        },
        ['', 0]
      )[1] / activeModesCount,
  ]) as Array<GeoPointW>;

  const input = [...borders, ...mergedData];
  const contourFn = configure(geoContour());
  const contours = makeNestedHolesSeparatePolygons(contourFn(input));
  const smoothedContours = contours.map((crv: MultiPolygonW) =>
    polygonSmooth(crv, { iterations: smooth })
  );

  const features = smoothedContours
    // filter out corrupted polygons after smoothing
    .filter((f) =>
      f.features[0].geometry.coordinates
        .flat(2)
        .every((crv: Position) => typeof crv !== 'undefined')
    )
    .map((f, i) => {
      return {
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
                paramScale.invert(contours[i].value).toFixed(1),
              ])
          ),
          // ... and value
          value: contours[i].value,
        },
        hashCode: hashCode(JSON.stringify(f)),
      };
    });

  const result = {
    type: 'FeatureCollection' as const,
    features,
  };

  return scaleValueToRange(result, [0, 100]);
};

/*
  ┌─────────────────┐   ┌─────────────────┐
  │xxxxxPolygonxxxxx├──►│xxxxxxPolygon1xxx│
  │x┌─────────────┐x│   │x┌─────────────┐x│
  │x│     Hole    │x│   │x│     Hole    │x│
  │x│  ┌───────┐  │x│   │x│  ┌───────┐  │x│
  │x│  │Nestedx├──┼─┼───┼─┼─►│Polygon│  │x│
  │x│  │holexxx│  │x│   │x│  │xxx2xxx│  │x│
  │x│  └───────┘  │x│   │x│  └───────┘  │x│
  │x│             │x│   │x│             │x│
  │x└─────────────┘x│   │x└─────────────┘x│
  │xxxxxxxxxxxxxxxxx│   │xxxxxxxxxxxxxxxxx│
  └─────────────────┘   └─────────────────┘
*/

const makeNestedHolesSeparatePolygons = (
  multiPolygons: Array<MultiPolygonW>
): Array<MultiPolygonW> => {
  const result: Array<MultiPolygonW> = [];
  for (const multiPoly of multiPolygons.filter(
    // filter out empty polygons
    (p) => p.coordinates[0].length
  )) {
    for (const poly of multiPoly.coordinates) {
      let targetOuterPolygon = polygon([poly[0]]);
      
      // check all rings of a polygon
      for (let ringIndex = 1; ringIndex < poly.length; ringIndex += 1) {
        const targetHole = polygon([poly[ringIndex]]); // make a polygon out of a ring 
        const isAHole = booleanWithin(targetHole, targetOuterPolygon);

        // if target hole is actualy a hole then add this to target polygon to 'apply' the hole to polygon
        if (isAHole) {
          targetOuterPolygon.geometry.coordinates = [
            ...targetOuterPolygon.geometry.coordinates,
            ...targetHole.geometry.coordinates,
          ];
        }
        // target hole is a lie so it's actualy a separate polygon
        else {
          // save to result polygon created before
          result.push({
            ...multiPoly,
            coordinates: [ targetOuterPolygon.geometry.coordinates ],
          });

          // hole is not a hole, so it's new target polygon
          targetOuterPolygon = targetHole;
        }
      }

      // after checking all of the rings save the remaining polygon 
      result.push({
        ...multiPoly,
        coordinates: [targetOuterPolygon.geometry.coordinates],
      });
    }
  }

  return result;
};

const scaleValueToRange = (lines: Isolines, range: Array<number>): Isolines => {
  const valueToRangeScale = scaleLinear()
    .domain(
      extent(lines.features.map((f) => f.properties.value)) as [
        minValue: number,
        maxValue: number
      ]
    )
    .range(range);

  const result = {
    ...lines,
    features: lines.features.map((feature) => ({
      ...feature,
      properties: {
        ...feature.properties,
        value: valueToRangeScale(feature.properties.value),
      },
    })),
  };

  return result;
};
