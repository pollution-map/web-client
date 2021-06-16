import {
  interpolateBlues,
  interpolateCool,
  interpolateDiscrete,
  interpolateMagma,
  scaleSequential,
} from 'd3';

const scaleWithDomain = (interpolator, domain) =>
  scaleSequential(interpolator).domain(domain);

const german = (domain) =>
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

const cool = (domain) => scaleWithDomain(interpolateCool, domain);
const magama = (domain) => scaleWithDomain(interpolateMagma, domain);
const blue = (domain) => scaleWithDomain(interpolateBlues, domain);

export { german, cool, magama, blue };
