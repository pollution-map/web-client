import { useCallback, useEffect } from 'react';
import { LinearInterpolator } from 'react-map-gl';
import { useStore } from 'src/store/RootStoreContext';

const transitionInterpolator = new LinearInterpolator([
  'bearing',
  // added to stop the transition if one of this properties changes
  'zoom',
  'latitude',
  'longitude',
]);

// auto rotate camera when in 3d after timeout
export const useCameraRotation = (afterTimeout) => {
  const { mapStore } = useStore();

  // rotation will continue while in 3d and user is not interacting
  const rotateCamera = useCallback(() => {
    if (mapStore.is3D)
      mapStore.changeViewState((prevViewState) => ({
        ...prevViewState,
        bearing: prevViewState.bearing + 15,
        transitionDuration: 1500,
        transitionInterpolator,
        onTransitionEnd: () => (mapStore.is3D ? rotateCamera() : () => {}),
      }));
  }, [mapStore.is3D]);

  // after timeout start rotation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (mapStore.is3D) {
        rotateCamera();
      }
    }, afterTimeout);

    return () => clearTimeout(timeoutId);
  }, [mapStore.is3D, afterTimeout, mapStore.viewState]);
};
