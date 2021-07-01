import { HashCode } from 'src/utils/hashCode';
import { Feature, FeatureCollection, MultiPolygon } from 'geojson';
import { WeightObjectV } from './geo-point';

export interface Isoline extends Feature<MultiPolygon, WeightObjectV> {
    hashCode: HashCode;
}
export interface Isolines extends FeatureCollection<MultiPolygon, WeightObjectV> {
    features: Array<Isoline>;
}

export const NoIsolines: Isolines = {
    type: "FeatureCollection" as const,
    features: []
}
