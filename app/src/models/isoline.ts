import { Feature, FeatureCollection, MultiPolygon } from 'geojson';
import { WeightObjectV } from './geo-point';

export type Isolines = FeatureCollection<MultiPolygon, WeightObjectV>;
export type Isoline = Feature<MultiPolygon, WeightObjectV>;

export const NoIsolines: Isolines = {
    type: "FeatureCollection" as const,
    features: []
}
