import { Isopleth } from 'components/Isopleth';
import { getGeoPointsW, getIzhevskBorders } from 'data/testdata.ts';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { LayersControl, useMapEvents } from 'react-leaflet';
import { v4 } from 'uuid';

export const IsoplethOverlayMock = ({ checked, name, tickS }) => {
  const [data, setData] = useState(getGeoPointsW(255));
  const [isChecked, setChecked] = useState(checked);

  useMapEvents({
    overlayadd: (addedOverlay) => {
      if (name === addedOverlay.name) setChecked(true);
    },
    overlayremove: (removedOverlay) => {
      if (name === removedOverlay.name) setChecked(false);
    },
  });

  // set new data every @tickS seconds
  useEffect(() => {
    if (isChecked) {
      const i = setInterval(() => {
        console.log('tick', name);
        if (isChecked) {
          setData(getGeoPointsW(255));
        }
      }, tickS * 1000);
      return () => clearInterval(i);
    }
    return () => {};
  }, [isChecked]);

  return (
    <LayersControl.Overlay key={v4(data)} checked={isChecked} name={name}>
      <Isopleth data={data} borders={getIzhevskBorders()} />
    </LayersControl.Overlay>
  );
};

IsoplethOverlayMock.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  tickS: PropTypes.number,
};

IsoplethOverlayMock.defaultProps = {
  name: PropTypes.string,
  checked: true,
  tickS: 1,
};
