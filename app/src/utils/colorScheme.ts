import {
  interpolateBlues,
  interpolateCool,
  interpolateDiscrete,
  interpolateMagma,
  interpolateRgb,
  ScaleSequential,
  scaleSequential,
} from 'd3';

type Interpolator = (t: number) => string;
type Domain = Array<number>;

const scaleWithDomain = (interpolator: Interpolator, domain: Domain) =>
  scaleSequential(interpolator).domain(domain);

const german = (domain: Domain): ScaleSequential<string, never> =>
  scaleWithDomain(
    interpolateDiscrete([
      '#82a6ad',
      '#a0babf',
      '#b8d6d1',
      '#cee4cc',
      '#e2f2bf',
      '#f3c683',
      '#e87e4d',
      '#cd463e',
      '#a11a4d',
      '#75085c',
      '#430a4a',
    ]),
    domain
  );

const cool = (domain: Domain) => scaleWithDomain(interpolateCool, domain);
const magama = (domain: Domain) => scaleWithDomain(interpolateMagma, domain);
const blue = (domain: Domain) => scaleWithDomain(interpolateBlues, domain);
const green = (domain: Domain) =>
  scaleWithDomain(
    interpolateDiscrete([
      '#143e04',
      '#99aa55',
      '#e6b333',
      '#e6b333',
      '#5e0808',
      '#db0b00',
    ]),
    domain
  );
const logo = (domain: Domain) =>
  scaleWithDomain(
    interpolateRgb('rgba(147, 41, 149, 0.72)', 'rgba(0, 255, 133, 0.72)'),
    domain
  );

export type ColorFn = typeof cool;

export { german, cool, magama, blue, green, logo };
