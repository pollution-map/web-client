import { getGeoPointsW, getIzhevskBorders } from 'data/testdata';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Isomap from './Isomap';

/* BUG: после добавления key={} к <FeatureGroup> в <Isomap>
        при каждом срабатывании интервала => вызове setData()
        <Isomap> становится видим, даже если на панели слоев он скрыт  */
const IsomapContainerMock = ({ tickS }) => {
  const [data, setData] = useState([]);

  // set new data every @tickS seconds
  useEffect(() => {
    const i = setInterval(() => {
      setData(getGeoPointsW(255));
    }, tickS * 1000);
    return () => clearInterval(i);
  }, [tickS]);

  return <Isomap borders={getIzhevskBorders()} data={data} />;
};

IsomapContainerMock.propTypes = {
  tickS: PropTypes.number,
};

IsomapContainerMock.defaultProps = {
  tickS: 1,
};

export default IsomapContainerMock;
