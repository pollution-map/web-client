import { RGBAColor } from '@deck.gl/core';
import { easeSinOut } from 'd3';
import { GeoJsonLayer } from 'deck.gl';
import { magama } from 'src/utils/colorScheme';
import { colorToArray } from 'src/utils/colorToArray';
import { IsolinePickInfoStore } from './IsolinePickInfoStore';
import { IsolinesStore } from './IsolinesStore';
const color = magama([-20, 100]);

export class DeckLayersStore {
  constructor(
    private isolinesStore: IsolinesStore,
    private isolinePickInfoStore: IsolinePickInfoStore
  ) {}

  isBaseMapInitialized: boolean = false;
  setBaseMapInitialized = () => (this.isBaseMapInitialized = true);

  is3D: boolean = false;
  toggleIs3D = () => (this.is3D = !this.is3D);

  get layers(): Array<any> {
    return [
      new GeoJsonLayer({
        visible: this.isBaseMapInitialized,
        id: 'isolines',
        data: this.is3D
          ? this.isolinesStore.isolinesZ.features
          : this.isolinesStore.isolines.features,
        pickable: true,
        filled: true,
        extruded: true,
        stroked: true,
        parameters: {
          // @ts-ignore
          // fix for z-fighting
          // https://deck.gl/docs/developer-guide/tips-and-tricks#z-fighting-and-depth-testing
          depthTest: this.is3D, // deep test false means no z-fighting but no filled polygons either
          fp64: true,
        },
        fp64: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 20],
        dataComparator: (newData: any, oldData: any): boolean => {
          if (newData.length !== oldData.length) return false;

          for (let i = 0; i < newData.length; i += 1)
            if (newData[i].hashCode !== oldData[i].hashCode) return false;

          return true;
        },
        onHover: (info: any) => {
          this.isolinePickInfoStore.PickInfo = info;
        },
        getFillColor: (f: any) => {
          const value = color(f.properties.value);
          return colorToArray(value.toString()) as RGBAColor;
        },
        getLineColor: (f: any) => {
          const value = color(f.properties.value - 10);
          return colorToArray(value.toString()) as RGBAColor;
        },
        getLineWidth: (f: any) => (f.properties.value % 25 === 0 ? 10 : 2.5),
        getElevation: (f: any) => {
          const { value } = f.properties;
          // to prevent z-fighting when 3d transitions to 2d an so on
          if (!this.is3D) return value * 0.1;
          return ((value ** 1.1) ** 1.2) ** 1.3 - 1;
        },
        updateTriggers: {
          getElevation: [this.is3D],
        },
        transitions: {
          getElevation: {
            type: 'interpolation',
            duration: 800,
            easing: easeSinOut,
            // @ts-ignore
            enter: (v) => {
              return [0];
            },
          },
        },
        material: {
          ambient: 1,
          diffuse: 0.01,
          shininess: 100,
        },
      }),
    ];
  }
}
