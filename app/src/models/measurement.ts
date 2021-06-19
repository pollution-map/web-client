import { GeoPointO, Latitude, Longitude, WeightObject } from 'src/models/geo-point';

export interface IMeasurement {
  latitude: Latitude;
  longitude: Longitude;
  value: WeightObject;
}

export const asGeoPoint = (measure: IMeasurement): GeoPointO<WeightObject> => {
  return [measure.latitude, measure.longitude, measure.value];
};

export const asMeasure = ([
  latitude,
  longitude,
  value,
]: GeoPointO<WeightObject>): IMeasurement => ({
  latitude,
  longitude,
  value,
});
