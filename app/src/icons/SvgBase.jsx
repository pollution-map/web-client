import styled from 'styled-components';

export const SvgBase = styled.svg.attrs(({ className }) => ({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  className,
  preserveAspectRatio: 'xMaxYMax meet',
}))``;
