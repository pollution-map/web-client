// Basic class for placing controls on a map
import type { ReactNode } from 'react';
import styled from 'styled-components';

type Position = 'bottomleft' | 'bottomright' | 'topleft' | 'topright';

const SControl = styled.div<{ position: Position }>`
  position: absolute;
  ${({ position }) =>
    position === 'topright' &&
    `
      margin-top: 10px;
      margin-right: 10px;
      top: 0;
      right: 0;
    `};
    ${({ position }) =>
    position === 'topleft' &&
    `
      margin-left: 10px;
      margin-top: 10px;
      top: 0;
      left: 0;
    `};
    ${({ position }) =>
    position === 'bottomright' &&
    `
      margin-bottom: 10px;
      margin-right: 10px;
      bottom: 0;
      right: 0;
    `};
    ${({ position }) =>
    position === 'bottomleft' &&
    `
      margin-bottom: 10px;
      margin-left: 10px;
      bottom: 0;
      left: 0;
    `};
`;

const Control = (props: ControlProps): JSX.Element => {
  const { position, children } = props;
  return (
    <SControl position={position}>
      {children}
    </SControl>
  );
};

export type ControlProps = {
  position: Position;
  children: ReactNode;
};

Control.defaultProps = {
  position: 'topleft' as Position,
  children: null,
};

export default Control;
