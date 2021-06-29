// Basic class for placing controls on a map
import type { ReactNode } from 'react';
import { _useMapControl as useMapControl } from 'react-map-gl';
import styled from 'styled-components';

type Position = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
type Margin = 'no-top' | 'no-right' | 'no-bottom' | 'no-left' | 'no';

const SControl = styled.div<{ position: Position; margin: Margin }>`
  position: absolute;
  ${({ position }) =>
    position === 'top-right' &&
    `
      margin-top: 10px;
      margin-right: 10px;
      top: 0;
      right: 0;
    `};
  ${({ position }) =>
    position === 'top-left' &&
    `
      margin-top: 10px;
      margin-left: 10px;
      top: 0;
      left: 0;
    `};
  ${({ position }) =>
    position === 'bottom-right' &&
    `
      margin-bottom: 10px;
      margin-right: 10px;
      bottom: 0;
      right: 0;
    `};
  ${({ position }) =>
    position === 'bottom-left' &&
    `
      margin-bottom: 10px;
      margin-left: 10px;
      bottom: 0;
      left: 0;
    `};

  ${({ margin }) =>
    margin === 'no-top' &&
    `
      margin-top: 0;
    `};
  ${({ margin }) =>
    margin === 'no-right' &&
    `
      margin-right: 0;
    `};
  ${({ margin }) =>
    margin === 'no-bottom' &&
    `
      margin-bottom: 0;
    `};
  ${({ margin }) =>
    margin === 'no-left' &&
    `
      margin-left: 0;
    `};

  ${({ margin }) =>
    margin === 'no' &&
    `
      margin: 0;
    `};
`;

const Control = (props: ControlProps): JSX.Element => {
  const { position, margin, children } = props;
  const { containerRef } = useMapControl({
    children,
    // @ts-ignore
    onDragStart: (evt) => {
      // prevent the base map from panning
      evt.stopPropagation();
    },
  });
  return (
    <SControl ref={containerRef} position={position} margin={margin}>
      {children}
    </SControl>
  );
};

export type ControlProps = {
  position: Position;
  children: ReactNode;
  margin: Margin;
};

Control.defaultProps = {
  position: 'top-left' as Position,
  children: null,
};

export default Control;
