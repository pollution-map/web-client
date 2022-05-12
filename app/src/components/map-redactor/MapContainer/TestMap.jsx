import { MapboxLayer } from '@deck.gl/mapbox';
import GL from '@luma.gl/constants';
import DeckGL, { MapView } from 'deck.gl';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef, useState } from 'react';
import { MapContext, StaticMap } from 'react-map-gl';
import { PropertiesPopup } from 'src/components/popups/PropertiesPopup';
import { Preloader } from 'src/components/preloader/Preloader';
import { useStore } from 'src/store/RootStoreContext';
import { useDebouncedCallback } from 'use-debounce/lib';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCES_TOKEN;

// TODO: store для текущих диапазонов, цветовых гамм, отображение цветовой палитры

const view = new MapView({
  repeat: true,
  nearZMultiplier: 0.1,
  farZMultiplier: 1.01,
  orthographic: false,
});

export const TestMap = observer(({ size, left }) => {
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

  return (
    <div>
      {!mapStore.isBaseMapInitialized && <Preloader />}

      <DeckGL
        onViewStateChange={onViewStateChange}
        ref={deckRef}
        view={view}
        style={{
          opacity: `${mapStore.isBaseMapInitialized ? '1' : '0'}`,
          left: `${!left}%`,
        }}
        initialViewState={mapStore.viewState}
        onWebGLInitialized={setGLContext}
        width={`${size}%`}
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
            // mapStyle="mapbox://styles/vfqww/ckqjlt39v37lz17qsi1jfcxq4"
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          />
        )}

        {isolinePickInfoStore.PickInfo?.picked && (
          <PropertiesPopup
            x={isolinePickInfoStore.PickInfo.x}
            y={isolinePickInfoStore.PickInfo.y}
            properties={isolinePickInfoStore.PickInfo.object.properties}
          />
        )}
      </DeckGL>
    </div>
  );
});