import { MapboxLayer } from '@deck.gl/mapbox';
import GL from '@luma.gl/constants';
import { easeQuadInOut, easeSinOut } from 'd3';
import DeckGL, { GeoJsonLayer } from 'deck.gl';
import 'leaflet/dist/leaflet.css';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef, useState } from 'react';
import { StaticMap } from 'react-map-gl';
import center from 'src/data/izhevskCenter.json';
import { useStore } from 'src/store/RootStoreContext';
import { magama } from 'src/utils/colorScheme';
import { colorToArray } from 'src/utils/colorToArray';
import { ModesControl } from './modes/ModesControl';
import { PropertiesPopup } from './popups/PropertiesPopup.tsx';

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
  const [glContext, setGLContext] = useState();
  const deckRef = useRef(null);
  const mapRef = useRef(null);
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
  }, []);

  // actual logic
  const { isolinesStore } = useStore();
  const [elevated, setElevated] = useState(true);
  const [hoverInfo, setHoverInfo] = useState({});
  const color = magama([-20, 95]);
  const [isDraggingNow, setIsDraggingNow] = useState(false);

  const layers = [
    new GeoJsonLayer({
      id: 'isolines',
      data: isolinesStore.isolines,
      // opacity: 0.02,
      pickable: true,
      filled: true,
      extruded: true,
      stroked: true,
      onHover: (info) => setHoverInfo(info),
      getFillColor: (f) => {
        const value = color(f.properties.value);
        return colorToArray(value);
      },
      getElevation: (f) => {
        const { value } = f.properties;
        if (!elevated) return value * 0.01;
        // return (value ** 1.3) ** 1.35 - 1;
        return ((value ** 1.1) ** 1.2) ** 1.3 - 1;
      },
      updateTriggers: {
        getElevation: [elevated],
      },
      transitions: {
        geometry: {
          duration: 700,
          easing: easeQuadInOut,
        },
        getElevation: {
          duration: 800,
          easing: easeSinOut,
        },
      },
      material: {
        ambient: 1,
        diffuse: 0.001,
        // diffuse: 2,
        shininess: 100,
      },
    }),

    // material={{
    //   ambient: 0.5,
    //   diffuse: 0.5,
    //   // diffuse: 2,
    //   shininess: 0,
    // }}
  ];

  return (
    <DeckGL
      ref={deckRef}
      onWebGLInitialized={setGLContext}
      initialViewState={INITIAL_VIEW_STATE}
      width="100vw"
      height="100vh"
      layers={layers}
      // useDevicePixels={false}
      glOptions={
        {
          // stencil: true,
          // depth: false,
        }
      }
      parameters={{
        // depthMask: false,
        // depthTest: true,
        depthMask: false,
        depthTest: true,
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
      }}
      getCursor={({ isDragging }) => {
        setIsDraggingNow(isDragging);
      }}
    >
      {glContext && (
        <StaticMap
          ref={mapRef}
          gl={glContext}
          mapStyle="mapbox://styles/vfqww/ckq55qrrp0eom17n2qkmkcjd2"
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          onLoad={onMapLoad}
        />
      )}
      {!isDraggingNow && hoverInfo?.object?.properties?.value > 0 && (
        <PropertiesPopup
          x={hoverInfo.x}
          y={hoverInfo.y}
          properties={hoverInfo.object.properties}
        />
      )}
      <button type="button" onClick={() => setElevated(!elevated)}>
        3D
      </button>
      <ModesControl />
    </DeckGL>
  );
});
