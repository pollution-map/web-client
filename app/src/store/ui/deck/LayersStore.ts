import { RGBAColor } from '@deck.gl/core';
import { easeSinOut } from 'd3';
import { GeoJsonLayer } from 'deck.gl';
import { IsolinesStore } from 'src/store/ui/IsolinesStore';
import { magama } from 'src/utils/colorScheme';
import { colorToArray } from 'src/utils/colorToArray';
import { MapStore } from './MapStore';
import { PickInfoStore } from './PickInfoStore';

const color = magama([-20, 100]);

export class LayersStore {
  constructor(
    private isolinesStore: IsolinesStore,
    private mapStore: MapStore,
    private pickInfoStore: PickInfoStore
  ) {}

  get layers(): Array<any> {
    return [
      new GeoJsonLayer({
        visible: this.mapStore.isBaseMapInitialized,
        id: 'isolines',
        data: this.mapStore.is3D
          ? this.isolinesStore.isolinesZ
          : this.isolinesStore.isolines,
        pickable: true,
        // filled: true,
        extruded: true,
        stroked: true,
        parameters: {
          // @ts-ignore
          // fix for z-fighting
          // https://deck.gl/docs/developer-guide/tips-and-tricks#z-fighting-and-depth-testing
          // deep test false means no z-fighting but no filled polygons either
          depthTest: this.mapStore.is3D && this.mapStore.isZoomedNear,
          fp64: true,
        },
        fp64: true,
        autoHighlight: true,
        highlightColor: [255, 255, 255, 20],
        dataComparator: (newData: any, oldData: any): boolean => {
         
          if (newData.features.length !== oldData.features.length) return false;

          for (let i = 0; i < newData.features.length; i += 1)
            if (newData.features[i].hashCode !== oldData.features[i].hashCode) return false;
          return true;
        },
        onHover: (info: any) => {
          this.pickInfoStore.PickInfo = info;
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
          if (!this.mapStore.is3D) return value * 0.01;
          return ((value ** 1.1) ** 1.2) ** 1.3 - 1;
        },
        updateTriggers: {
          getElevation: [this.mapStore.is3D],
        },
        transitions: {
          getElevation: {
            type: 'interpolation',
            duration: 700,
            easing: easeSinOut,
            //@ts-ignore
            enter: (v) => {
              return this.mapStore.is3D ? [0] : v;
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
