import { MapboxLayer } from '@deck.gl/mapbox';
import GL from '@luma.gl/constants';
import DeckGL, { MapView } from 'deck.gl';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef, useState } from 'react';
import { MapContext, StaticMap } from 'react-map-gl';
import { PropertiesPopup } from 'src/components/popups/PropertiesPopup';
import { useStore } from 'src/store/RootStoreContext';
import { useDebouncedCallback } from 'use-debounce/lib';
import { ButtonGroups } from './ButtonGroups';
import { Logo } from './Logo';
import { Button3D } from './map-modes/Button3D';
import { ModesControl } from './modes/ModesControl';
import { RangesControl } from './ranges/RangesControl';
import { useCameraRotation } from './transitions/useCameraRotation';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCES_TOKEN;

// TODO: store для текущих диапазонов, цветовых гамм, отображение цветовой палитры

const view = new MapView({
  repeat: true,
  nearZMultiplier: 0.1,
  farZMultiplier: 1.01,
  orthographic: false,
});

export const PolutionMap = observer(() => {
  // DeckGL and mapbox will both draw into this WebGL context
  // layering stuff

  const [glContext, setGLContext] = useState(null);
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  const { layersStore, isolinePickInfoStore, mapStore } = useStore();

  const onMapLoad = useCallback(() => {
    const map = mapRef.current.getMap();
    const { deck } = deckRef.current;

    // You must initialize an empty deck.gl layer to prevent flashing
    map.addLayer(
      // This id has to match the id of the deck.gl layer
      new MapboxLayer({ id: 'isolines', deck }),
      // Optionally define id from Mapbox layer stack under which to add deck layer
      'land-structure-polygon'
    );

    mapStore.setBaseMapInitialized();
  }, []);

  const onViewStateChange = useDebouncedCallback(({ viewState }) => {
    mapStore.updateViewState(viewState);
  }, 100);

  useCameraRotation(9000);

  return (
    <DeckGL
      onViewStateChange={onViewStateChange}
      ref={deckRef}
      view={view}
      initialViewState={mapStore.viewState}
      onWebGLInitialized={setGLContext}
      width="100vw"
      height="100vh"
      gl={glContext}
      layers={layersStore.layers}
      glOptions={{
        /* To render vector tile polygons correctly */
        stencil: true,
      }}
      parameters={{
        blendFunc: [
          GL.SRC_ALPHA,
          GL.ONE_MINUS_SRC_ALPHA,
          GL.ONE,
          GL.ONE_MINUS_SRC_ALPHA,
        ],
        blendEquation: GL.FUNC_ADD,
      }}
      controller={{
        scrollZoom: {
          speed: 0.01,
          smooth: true,
        },
        inertia: true,
      }}
      getCursor={({ isDragging }) => {
        if (isDragging) isolinePickInfoStore.PickInfo = null;
      }}
      // provides context to a static map
      // this allows to use react-map-gl controls
      // and aslo out custom controls based on Control.tsx
      ContextProvider={MapContext.Provider}
    >
      {glContext && (
        <StaticMap
          reuseMaps
          asyncRender
          ref={mapRef}
          gl={glContext}
          onLoad={onMapLoad}
          // mapStyle="mapbox://styles/vfqww/ckq55qrrp0eom17n2qkmkcjd2"
          mapStyle="mapbox://styles/vfqww/ckq8cu7ea0nz417pehvywpm7t"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        />
      )}
      <Logo />
      <ButtonGroups
        modeSelection={<ModesControl />}
        additionalModeSelection={<Button3D />}
      />
      <RangesControl orientation="vertical" />

      {isolinePickInfoStore.PickInfo?.picked && (
        <PropertiesPopup
          x={isolinePickInfoStore.PickInfo.x}
          y={isolinePickInfoStore.PickInfo.y}
          properties={isolinePickInfoStore.PickInfo.object.properties}
        />
      )}
    </DeckGL>
  );
});
