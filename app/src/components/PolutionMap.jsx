import { MapboxLayer } from '@deck.gl/mapbox';
import GL from '@luma.gl/constants';
import DeckGL from 'deck.gl';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import { PropertiesPopup } from 'src/components/popups/PropertiesPopup';
import center from 'src/data/izhevskCenter.json';
import { useStore } from 'src/store/RootStoreContext';
import { ModesControl } from 'src/components/modes/ModesControl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCES_TOKEN;

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: center[1],
  latitude: center[0],
  zoom: 12,
  pitch: 35,
  bearing: -2,
};

// TODO: store для текущих диапазонов, цветовых гамм, отображение цветовой палитры

export const PolutionMap = observer(() => {
  // DeckGL and mapbox will both draw into this WebGL context
  // layering stuff

  const [glContext, setGLContext] = useState(null);
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  const { deckLayersStore } = useStore();
  const { isolinePickInfoStore } = useStore();
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
    map.touchZoomRotate.disableRotation();

    deckLayersStore.setBaseMapInitialized();
  }, []);

  return (
    <DeckGL
      ref={deckRef}
      onWebGLInitialized={setGLContext}
      initialViewState={INITIAL_VIEW_STATE}
      width="100vw"
      height="100vh"
      gl={glContext}
      layers={deckLayersStore.layers}
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
          speed: 0.001,
          smooth: true,
        },
      }}
      getCursor={({ isDragging }) => {
        if (isDragging) isolinePickInfoStore.PickInfo = null;
      }}
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
      {isolinePickInfoStore.PickInfo?.object && (
        <PropertiesPopup
          x={isolinePickInfoStore.PickInfo.x}
          y={isolinePickInfoStore.PickInfo.y}
          properties={isolinePickInfoStore.PickInfo.object.properties}
        />
      )}
      <button type="button" onClick={() => deckLayersStore.toggleIs3D()}>
        3D
      </button>
      <ModesControl />
    </DeckGL>
  );
});
