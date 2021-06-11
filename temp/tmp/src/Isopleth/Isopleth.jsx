import { GeoJSON } from "react-leaflet";

const Isopleth = ({ data, coloringFunction }) => {
  return data.map((curve, i) => (
    <GeoJSON
      key={curve.toString() + i}
      data={curve}
      style={{ fillColor: coloringFunction(curve.value), weight: curve.value % 100 ? 0.5 : 2 }}
    />
  ));
};

export default Isopleth;

/*



{
  const context = DOM.context2d(width, height, 1),
    path = d3.geoPath().context(context);

  context.strokeStyle = "#fff";

  do {
    
    // рисует линии уровня (с - curves)
    for (const c of isopleth(data, bandwidth, borderradius)) {
      //if (c.value < 0) c.value = 0;
      context.beginPath();
      path(c);
      
      // получает цвет линии в зависимоти от значения точки c
      // используется самописная функция color, которая скейлит value в цвет
      context.fillStyle = color(c.value);
      //для линий кратных 25 рисуем её шире или жирнее
      if (c.value % 25 === 0) {
        context.lineWidth = c.value % 100 ? 0.5 : 2;
        context.stroke();
      }
      context.fill();
    }
    
    // рисует центры точек data
    for (let i = 0; i < data.length; i++) {
      context.beginPath();
      path({ type: "Point", coordinates: centers[i] });
      context.fillStyle = color(data[i]);
      context.fill();
      context.stroke();
    }

    if (animate)
      for (let i = 0; i < data.length; i++) data[i] += 4 * (Math.random() - .5);

    yield context.canvas;
  } while (animate);
} 
*/
