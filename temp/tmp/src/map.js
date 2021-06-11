// import * as d3 from 'd3';
// import * as arrayblur from 'array-blur';

// const blur = arrayblur.blur;
// const contours = d3.contours;
// const scaleLinear = d3.scaleLinear;
// const Delaunay = d3.Delaunay;


// const replay = true;

// const states = {
//   AK: { x: 0, y: 0 },
//   ME: { x: 11, y: 0 },
//   VT: { x: 9.5, y: -1 },
//   NH: { x: 10.5, y: -1 },
//   WA: { x: 1, y: -2 },
//   MT: { x: 2, y: -2 },
//   ND: { x: 3, y: -2 },
//   MN: { x: 4, y: -2 },
//   WI: { x: 5, y: -2 },
//   MI: { x: 7, y: -2 },
//   NY: { x: 9, y: -2 },
//   MA: { x: 10, y: -2 },
//   RI: { x: 11, y: -2 },
//   ID: { x: 1.5, y: -3 },
//   WY: { x: 2.5, y: -3 },
//   SD: { x: 3.5, y: -3 },
//   IA: { x: 4.5, y: -3 },
//   IL: { x: 5.5, y: -3 },
//   IN: { x: 6.5, y: -3 },
//   OH: { x: 7.5, y: -3 },
// };

// //https://i.imgur.com/WB7eMLP.png

// const samevalue = true;
// let somevalue = false;
// //somevalue = (replay, samevalue && 100 + 150 * Math.random());

// console.log(somevalue);

// const data =
//   (replay,
//   Array.from(
//     Object.values(states),
//     (d) => somevalue || Math.floor(Math.random() * 256)
//   ));

// const color = d3.scaleSequential(d3.interpolateRainbow).domain([0, 255]);

// let centers = [
//   [1.2, 0.181818181881],
//   [43.2, 100.181818181881],
//   [543.2, 5.181818181881],
//   [53.2, 545.181818181881],
//   [2.2, 2.181818181881],
//   [1427.2, 3.181818181881],
//   [54.2, 5.181818181881],
//   [43.2, 5.181818181881],
//   [127.2, 100.181818181881],
//   [2.2, 65.181818181881],
// ];

// centers = centers.map((c, i) => [i * 2, i * 2])

// const height = 300;
// const width = 200;

// // centers = Array.from(Object.values(states), (d) => [
// //   (width * (2 + d.x)) / 15,
// //   (height * (2 - d.y)) / 11,
// // ]);


// const isopleth = isoplethFactory(centers, width, height);

// function isoplethFactory(centers, width, height, padding) {
//   if (!padding) padding = 0;
//   const scale = 1; // 0.2
//   const w = Math.round((width + 2 * padding) * scale);
//   const h = Math.round((height + 2 * padding) * scale);
//   const x = scaleLinear([-padding, width + padding], [0, w]);
//   const y = x; // Use scaleLinear([0, height], [0, h]); to change the aspect ratio (usually we wouldn't want that)

//   const delaunay = Delaunay.from(centers.map((d) => [x(d[0]), y(d[1])]));
//   const nn = nnmap(delaunay, w, h);
//   const bl = blur().width(w);
//   const ct = contours().size([w, h]);

  
//   // используя триангуляцию делоне 
//   // создает пространство (site) размера (width * height)
//   // каждый элемент которого - индекс ближайшей точки триангуляции к этой точке пространства
//   // и второе пространство (distance) размера (width * height)
//   // каждый элемент которого - расстояние 

//   function nnmap(delaunay, width, height) {
//     const site = new Uint16Array(width * height),
//       distance = new Float32Array(width * height);
//     width |= 0;
//     height |= 0;

//     let n = 0;
//     for (let i = 0; i < width; i++) {
//       for (let j = 0; j < height; j++) {
//         // https://github.com/d3/d3-delaunay/blob/main/README.md#delaunay_find
//         // для каждой точки в пространстве (i, j) ищем индекс ближайшой точки в триангуляции
//         site[i + width * j] = n = delaunay.find(i, j);

        
//         const nearestPointInTriangulationX = delaunay.points[2 * n];
//         const nearestPointInTriangulationY = delaunay.points[2 * n + 1];

//         // n - индекс ближайшей точки в триангуляции/ (индекс из массива centres (стр 86))

//         // узначть зачеми гипотинуза между сторонами с длинами x и y точки n
//         // hypot - гипотинуза, как мера удаленности x от y (сравнивается с border radius)
//         distance[i + width * j] = Math.hypot(
//           /*
//             # delaunay.points https://github.com/d3/d3-delaunay/blob/main/README.md#delaunay_points
              
//             The coordinates of the points as an array [x0, y0, x1, y1, …]. 
//             Typically, this is a Float64Array, 
//             however you can use any array-like type in the 
//           */
//          // delaunay.points координаты исходных точек триангуляции
//          // delaunay.points [2 * n] - i     -----> x ближайшей точки (к i, j) в триангуляции
//          // delaunay.points [2 * n + 1] - j -----> y ближайшей точки (к i, j) в триангуляции
//           delaunay.points[2 * n] - i,
//           delaunay.points[2 * n + 1] - j
//         );
//       }
//     }
//     return { site, distance, width, height };
//   }

//   // для каждой . из плоскости width * height (nn.site)
//   // устанавливает её значение:
  
//   // --- радиус . данных ограничен  ---
//   // если Удаление . плоскости от ближайшей . в триангуляции ( nn.distance[i] )
//   // меньше радиуса размытя, то соотв. значение из data[s] (s индекс ближайшей . триангуляции), иначе 0 (defaultValue)
 
//   // --- радиус . данных не ограничен ---
//   // для Каждой . плоскости берем значение ближайщей . триангуляции
//   // возвращает скалярное поле в виде массива величин (величины расположены в массиве на местах как в данные для d3.ct)

//   function datamap(data, nn, borderradius, defaultValue) {
//     return borderradius > 0
//       // nn.site - массив индексов ближайших точек триангуляции, 
//       // т.е. его элемент s - индекс ближайшой точки в триангуляции к точке пространства i + width * j
//       ? Array.from(nn.site, (s, i) =>
//           nn.distance[i] < borderradius ? data[s] : defaultValue
//         )
//       : Array.from(nn.site, (s) => data[s]);
//   }

//   function rescale(contour) {
//     for (const polygon of contour.coordinates) {
//       for (const ring of polygon) {
//         for (const pt of ring) {
//           console.log('pt0 before', pt[0])

//           pt[0] = x.invert(pt[0]);
//           console.log('pt0 after', pt[0])
          
//           console.log('pt1 before', pt[1])
//           pt[1] = y.invert(pt[1]);
//           console.log('pt1 after', pt[1])
//         }
//       }
//     }
//     return contour;
//   }

//   function computecontours(data, bandwidth, borderradius, defaultValue = 0) {
//     bl.radius(bandwidth * scale);
//     return ct(bl(datamap(data, nn, borderradius * scale, defaultValue))).map(
//       rescale
//     );
//   }

//   computecontours.thresholds = (_) =>
//     _ ? (ct.thresholds(_), computecontours) : ct.thresholds();

//   return computecontours;
// }


// const basedata = data;
// const resultdata = isopleth(basedata, 15, 66);

// console.log('basedata', basedata)
// console.log('resultdata', resultdata)

// export { resultdata, basedata, color };