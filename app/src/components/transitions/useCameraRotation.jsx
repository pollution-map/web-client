import { useCallback, useEffect } from 'react';
import { LinearInterpolator } from 'react-map-gl';
import { useStore } from 'src/store/RootStoreContext';

const transitionInterpolator = new LinearInterpolator(['bearing']);

// auto rotate camera when in 3d after timeout
// stop when user is interacting
export const useCameraRotation = (afterTimeout) => {
  const { mapStore } = useStore();

  // rotation will continue while in 3d and user is not interacting
  const rotateCamera = useCallback(() => {
    if (mapStore.is3D && !mapStore.isUserInteracting)
      mapStore.changeViewState((prevViewState) => ({
        ...prevViewState,
        bearing: prevViewState.bearing + 1.5,
        transitionDuration: 150,
        transitionInterpolator,
        onTransitionEnd:
          mapStore.is3D && !mapStore.isUserInteracting
            ? rotateCamera
            : () => {},
        transitionInterruption: 1,
      }));
  }, [mapStore.isUserInteracting, mapStore.is3D]);

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
