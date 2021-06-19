import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';
import { magama } from 'src/utils/colorScheme';
import { isolines } from 'src/utils/isolines.ts';
import { v4 } from 'uuid';

export const Isopleth = ({
  borders,
  data,
  colorScale,
  configureContour,
  smooth,
}) => {
  const lines = isolines(borders, data, smooth, configureContour);

  const onEachLine = (line, layer) => {
    const { value } = line.properties;
    // eslint-disable-next-line no-param-reassign
    layer.options = {
      ...layer.options,
      color: colorScale(value),
      fillOpacity: 0.12,
      weight: 0.05,
      transition: 'fillOpactity 1s linear',
    };
    layer.bindPopup(value.toString());
  };

  return <GeoJSON key={v4(lines)} data={lines} onEachFeature={onEachLine} />;
};

Isopleth.propTypes = {
  borders: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  colorScale: PropTypes.func,
  configureContour: PropTypes.func,
  smooth: PropTypes.number,
};

Isopleth.defaultProps = {
  colorScale: magama([0, 255]),
  configureContour: (geoContourToConfigure) =>
    geoContourToConfigure.thresholds(12),
  smooth: 4,
};
