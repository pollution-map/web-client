import { geoPoints } from "./../testdata/testdata";
import IDWInterpolate from "./IDWInterpolate";
import { contours } from 'd3-contour'
import { GeoJSON } from 'react-leaflet'
import Isopleth from "./Isopleth";

// const knownPoints = {
//   points: geoPoints,
//   values: geoPoints.map((_) => Math.floor(Math.random() * 256)),
// };

const knownPoints = geoPoints.map((p) => ({
    position: p,
    value: Math.floor(Math.random() * 256),
}));

const interpolationBounds = {
  xLowerBound: 0, xUpperBound: 90,
  yLowerBound: 0, yUpperBound: 90,
  stepSize: 1
};
const interpolationRadius = 0.3;
const densitySensivity = 20;

const [interpolatedValues, xSize, ySize] = IDWInterpolate(
  knownPoints,
  interpolationBounds,
  interpolationRadius,
  densitySensivity
);

const c = contours()
    .size([xSize, ySize])

const isopleth = c(interpolatedValues);

const isoplethComponent = () => <GeoJSON data={isopleth}/>

export default isoplethComponent;
