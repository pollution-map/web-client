import { geoDistance } from 'd3';
const createKDTree = require("static-kdtree");

// clear explanation https://www.youtube.com/watch?v=WupgyBFIlTg
// lattitude

// returns scalar field
const IDWInterpolate = (
  knownPoints,
  interpolationBounds,
  interpolationRadius,
  densitySensivity 
) => {
  const points = knownPoints.map((kp) => kp.position);
  const values = knownPoints.map((kp) => kp.value);

  // what area we want to interpolate on?
  const { xLowerBound, xUpperBound } = interpolationBounds;
  const { yLowerBound, yUpperBound } = interpolationBounds;
  const { stepSize } = interpolationBounds;

  // how many small steps we do on known interpolationBounds
  const xLen = Math.abs(xUpperBound - xLowerBound);
  const yLen = Math.abs(yLowerBound - yUpperBound);
  const xSteps = Math.ceil(xLen / stepSize);
  const ySteps = Math.ceil(yLen / stepSize);

  // kd tree of known points to quickly get all known points in inerpolationRadius from point x, y
  const kdtree = createKDTree(points);


  let resI = 0;
  const result = new Float32Array(xSteps * ySteps);
  for (let x = 0; x < xSteps; x++) {
    for (let y = 0; y < ySteps; y++) {
      const currentPointInPlane = [x, y];
      let totalWeight = 0;
      let sumOfWeights = 0;

      // for all points in interpolationRadius weight it's value
      kdtree.rnn(currentPointInPlane, interpolationRadius, (pointInRadiusIndex) => {
        const point = points[pointInRadiusIndex];
        const pointValue = values[pointInRadiusIndex]; 
        const distance = geoDistance(currentPointInPlane, point);
        const weight = getInvertedWeight(distance, densitySensivity);
        const weightedValue = weight * pointValue;
        totalWeight += weightedValue;
        sumOfWeights += weight;
      });

      if(sumOfWeights > 0)
      {
        const resultValue = totalWeight / sumOfWeights;
        const pos = x * xSteps + y;
        result[pos] = resultValue;
      }
    }
  }

  return [ result, xSteps, ySteps ];
};

// as densitySensivity increses, the distance between points,
// needed to have significant impact to interpolation result, decreases
const getInvertedWeight = (distance, densitySensivity = 2) => {
  return 1 / (distance ** densitySensivity);
};

export default IDWInterpolate;