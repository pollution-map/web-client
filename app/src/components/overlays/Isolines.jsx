import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import { GeoJSON } from 'react-leaflet';
import { useStore } from 'src/store/RootStoreContext';
import { magama } from 'src/utils/colorScheme';
import { v4 } from 'uuid';

export const Isolines = observer(({ colorScale }) => {
  const { isolinesStore } = useStore();
  const lines = isolinesStore.isolines;

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
    layer.bindPopup(JSON.stringify(line.properties));
  };

  return <GeoJSON key={v4(lines)} data={lines} onEachFeature={onEachLine} />;
});

Isolines.propTypes = {
  colorScale: PropTypes.func,
};

Isolines.defaultProps = {
  colorScale: magama([0, 100]),
};
