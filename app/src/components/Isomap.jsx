import { geoContour } from 'd3-geo-voronoi';
import polygonSmooth from '@turf/polygon-smooth';
import { scaleSequential, interpolateCool } from 'd3';
import { GeoJSON, Popup, FeatureGroup } from 'react-leaflet';
import PropTypes from 'prop-types';

const Isomap = ({
  borders, data, colorScale, configureContour, smooth,
}) => {
  const input = [...borders, ...data];
  const c = configureContour(geoContour());
  const contours = c(input);
  const smoothen = contours
    .map((crv) => polygonSmooth(crv, { iterations: smooth }))
    .map((f, i) => ({
      // save value data
      features: f.features.map((ft) => ({
        ...ft,
        properties: {
          value: contours[i].value,
        },
      })),
    }))
    // filter out corrupted polygons after smoothing
    .filter((f) => f.features[0].geometry.coordinates
      .flat(2)
      .every((crv) => typeof crv !== 'undefined'));

  // const onEachFeature = (feature, layer) => {
  //   const { value } = feature.properties;
  //   const i = value % 10;
  //   // eslint-disable-next-line no-nested-ternary
  //   const l = i === 0.2 ? 1 : i % 2 === 0 ? 0.05 : 0;
  //   layer.options.fillOpacity = 0.1;
  //   layer.options.weight = l;
  //   // layer.bindPopup(value.toString());
  // };

  return (
    <FeatureGroup>
      {smoothen.map((f) => {
        const isoline = f.features[0];
        const { value } = isoline.properties;
        const key = JSON.stringify(isoline);

        return (
          <GeoJSON
            key={key}
            data={isoline}
            style={{
              color: colorScale(value),
              fillOpacity: 0.1,
              weight: 0.05,
            }}
          >
            <Popup>{value}</Popup>
          </GeoJSON>
        );
      })}
    </FeatureGroup>
  );
};

Isomap.propTypes = {
  borders: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number, PropTypes.number),
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number, PropTypes.number, PropTypes.number),
  ).isRequired,
  colorScale: PropTypes.func,
  configureContour: PropTypes.func,
  smooth: PropTypes.number,
};

Isomap.defaultProps = {
  colorScale: scaleSequential(interpolateCool).domain([0, 255]),
  configureContour: (geoContourToConfigure) => geoContourToConfigure.thresholds(9),
  smooth: 4,
};

export default Isomap;
