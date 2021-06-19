import { WeightObject } from 'src/models/geo-point';
import { Feature, FeatureCollection, MultiPolygon } from 'geojson';

export type Isolines = FeatureCollection<MultiPolygon, WeightObject>;
export type Isoline = Feature<MultiPolygon, WeightObject>;

export const EmptyIsolines: Isolines = {
    type: "FeatureCollection" as const,
    features: []
}
