import {
  contours,
  scaleLinear,
  Delaunay,
  scaleSequential,
  interpolateRainbow,
  interpolate,
  interpolateCool,
  interpolateInferno,
} from "d3";
import * as arrayblur from "array-blur";
const blur = arrayblur.blur;

let delaunayExport = null;


// TIN
function isoplethCreatorFactory(centers, width, height, padding) {
  if (!padding) padding = 0;
  const scale = 1; // 0.2
  const w = Math.round((width + 2 * padding) * scale); // ширина в зависимости от scale
  const h = Math.round((height + 2 * padding) * scale); // высота в зависимости от scale
  //const x = scaleLinear([-padding, width + padding], [0, w]);
  const x = scaleLinear([-180, 180], [-180, 180])
  const y = x;
  //const y = x; // scaleLinear([0, height], [0, h]);  to change the aspect ratio (usually we wouldn't want that)

  const delaunay = Delaunay.from(centers.map((d) => [x(d[0]), y(d[1])]));

  // hack to see values 
  delaunayExport = delaunay;

  const nn = nnmap(delaunay, w, h);
  const bl = blur().width(w);
  const ct = contours().size([w, h]);

  // используя триангуляцию делоне
  // создает пространство (site) размера (width * height)
  // каждый элемент которого - индекс ближайшей точки триангуляции к этой точке пространства
  // и второе пространство (distance) размера (width * height)
  // каждый элемент которого - расстояние

  function nnmap(delaunay, width, height) {
    const site = new Uint16Array(width * height),
      distance = new Float32Array(width * height);
    width |= 0;
    height |= 0;

    let n = 0;
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        // https://github.com/d3/d3-delaunay/blob/main/README.md#delaunay_find
        // для каждой точки в пространстве (i, j) ищем индекс ближайшой точки в триангуляции
        site[i + width * j] = n = delaunay.find(i, j);

        const nearestPointInTriangulationX = delaunay.points[2 * n];
        const nearestPointInTriangulationY = delaunay.points[2 * n + 1];

        // n - индекс ближайшей точки в триангуляции/ (индекс из массива centres (стр 86))

        // взвешиваем каждую точку пространства
        // hypot - гипотинуза, как мера удаленности x от y (сравнивается с border radius)
        distance[i + width * j] = Math.hypot(
          /*
            # delaunay.points https://github.com/d3/d3-delaunay/blob/main/README.md#delaunay_points
              
            The coordinates of the points as an array [x0, y0, x1, y1, …]. 
            Typically, this is a Float64Array, 
            however you can use any array-like type in the 
          */
          // delaunay.points координаты исходных точек триангуляции
          // delaunay.points [2 * n] - i     -----> x ближайшей точки (к i, j) в триангуляции
          // delaunay.points [2 * n + 1] - j -----> y ближайшей точки (к i, j) в триангуляции
          delaunay.points[2 * n] - i,
          delaunay.points[2 * n + 1] - j
        );
      }
    }
    return { site, distance, width, height };
  }

  // для каждой . из плоскости width * height (nn.site)
  // устанавливает её значение:

  // --- радиус . данных ограничен  ---
  // если Удаление . плоскости от ближайшей . в триангуляции ( nn.distance[i] )
  // меньше радиуса размытя, то соотв. значение из data[s] (s индекс ближайшей . триангуляции), иначе 0 (defaultValue)

  // --- радиус . данных не ограничен ---
  // для Каждой . плоскости берем значение ближайщей . триангуляции
  // возвращает скалярное поле в виде массива величин (величины расположены в массиве на местах как в данные для d3.ct)

  function datamap(data, nn, borderradius, defaultValue) {
    return borderradius > 0
      ? // nn.site - массив индексов ближайших точек триангуляции,
        // т.е. его элемент s - индекс ближайшой точки в триангуляции к точке пространства i + width * j
        Array.from(nn.site, (s, i) =>
          nn.distance[i] < borderradius ? data[s] : defaultValue
        )
      : Array.from(nn.site, (s) => data[s]);
  }

  function rescale(contour) {
    for (const polygon of contour.coordinates) {
      for (const ring of polygon) {
        for (const pt of ring) {
          const pt0 = pt[0];
          const pt1 = pt[1];


          pt[0] = x.invert(pt1);
          pt[1] = y.invert(pt0);
        }
      }
    }
    return contour;
  }


  function computecontours(data, bandwidth, borderradius, defaultValue = 0) {
    bl.radius(bandwidth * scale);
    return ct(bl(datamap(data, nn, borderradius * scale, defaultValue)))
    // .map(
    //  rescale
    //  );
  }

  computecontours.thresholds = (_) =>
    _ ? (ct.thresholds(_), computecontours) : ct.thresholds();

    
  const delaunayPoints = [];

  // testinggg
  // export points of triangulation
  for (let n = 0; n < +(delaunay.points.length / 2); n++) {
    const x = delaunay.points[2 * n];
    const y = delaunay.points[2 * n + 1];
  
    delaunayPoints.push([x, y]);
  }

  // export interpolated values

  function interpolate(data, bandwidth, borderradius, defaultValue = 0) {
    bl.radius(bandwidth * scale);
    return bl(datamap(data, nn, borderradius * scale, defaultValue));
  }

  return [ computecontours, delaunayPoints, interpolate ];
}

const colorFnFactory = (interpolator = interpolateInferno) => {
  const coloringFn = scaleSequential(interpolator).domain([0, 255]);
  return coloringFn;
};


export { isoplethCreatorFactory, colorFnFactory };
