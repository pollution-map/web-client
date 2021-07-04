import { useCallback } from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import { useStore } from 'src/store/RootStoreContext';

const flyToInterpolator = new FlyToInterpolator();

export const useFlyTo = () => {
  const { mapStore } = useStore();

  const flyTo = useCallback((city) => {
    mapStore.changeViewState((prevViewState) => ({
      ...prevViewState,
      latitude: city.latitude,
      longitude: city.longitude,
      zoom: 11.9,
      transitionDuration: 'auto',
      transitionInterpolator: flyToInterpolator,
    }));
  }, []);
  return flyTo;
};
