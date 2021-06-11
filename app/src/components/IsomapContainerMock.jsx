import izhevskBorders from 'data/izhevskBorders.json';
import { useEffect, useState } from 'react';
import { getGeoPointsW } from 'data/testdata';
import PropTypes from 'prop-types';
import Isomap from './Isomap';

/* BUG: после выноса логики обновления state (useEffect) в этот отдельный компонент из
        самого компонента Isomap, появился баг:
        при выключении слоя и повторном его включении слои накапливаются. */
const IsomapContainerMock = ({ tickS }) => {
  const [data, setData] = useState([]);

  // set new data every @tickS seconds
  useEffect(() => {
    const i = setInterval(() => {
      setData(getGeoPointsW());
    }, tickS * 100);
    return () => clearInterval(i);
  }, [tickS]);

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Isomap borders={izhevskBorders} data={data} />;
};

IsomapContainerMock.propTypes = {
  tickS: PropTypes.number,
};

IsomapContainerMock.defaultProps = {
  tickS: 1,
};

export default IsomapContainerMock;
