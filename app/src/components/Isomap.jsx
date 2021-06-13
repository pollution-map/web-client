import polygonSmooth from '@turf/polygon-smooth';
import { geoContour } from 'd3-geo-voronoi';
import { magama } from 'helpers/colorScheme';
import PropTypes from 'prop-types';
import { FeatureGroup, GeoJSON, Popup } from 'react-leaflet';

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

  return (
    <FeatureGroup key={JSON.stringify(input)}>
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
              fillOpacity: 0.12,
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
  colorScale: magama([0, 255]),
  configureContour: (geoContourToConfigure) => geoContourToConfigure.thresholds(12),
  smooth: 4,
};

export default Isomap;
