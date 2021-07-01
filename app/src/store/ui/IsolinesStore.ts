import { Feature, MultiPolygon } from 'geojson';
import { CitiesStore } from './CitiesStore';
import { getIzhevskBorders } from 'src/data/testdata';
import { Isolines } from 'src/models/isoline';
import { asGeoPoint } from 'src/models/measurement';
import { asActiveParams } from 'src/models/mode';
import { IMeasurementsStore } from 'src/store/data/MeasurementsStore';
import { ModesStore } from 'src/store/ui/ModesStore';
import { comboisolines } from 'src/utils/isolines';
import { isolinesZ } from 'src/utils/isolinesZ';
import { GeoPoint } from 'src/models/geo-point';
import explode from '@turf/explode';
import pointsWithinPolygon from '@turf/points-within-polygon';
import { featureCollection, point } from '@turf/helpers';
import { toJS } from 'mobx';

export class IsolinesStore {
  constructor(
    private modesStore: ModesStore,
    private measurementsStore: IMeasurementsStore,
    private citiesStore: CitiesStore
  ) {}

  get isolines(): Isolines {
    const modes = this.modesStore.modes;
    const measurements = this.measurementsStore.measurements;
    const c = toJS(this.citiesStore.SelectedCity);
    const borders = c ? c.borders : undefined;

    debugger;
    const points = featureCollection(measurements.map(m => point([m.latitude, m.longitude], m.value)));
    const pointsInCity = borders ? pointsWithinPolygon(points, borders) : undefined;

    debugger;
    const bordersAsGeoPoints = borders ?
      explode(borders).features.map((f) => f.geometry.coordinates) as Array<GeoPoint> :
      undefined;
      
    const result = comboisolines(
      bordersAsGeoPoints,
      pointsInCity?.features?.map(f => [f.geometry.coordinates[0], f.geometry.coordinates[1], f.properties]),
      asActiveParams(modes),
      2,
      (isolines) => isolines.thresholds(40)
    );
    return result;
  }

  get isolinesZ(): Isolines {
    const result = isolinesZ(this.isolines);
    return result;
  }
}
