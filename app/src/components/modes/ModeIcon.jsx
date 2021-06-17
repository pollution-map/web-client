/* eslint-disable react/jsx-props-no-spreading */
import { Fragment } from 'react';
import { Noise } from 'src/icons/Noise';
import { Polution } from 'src/icons/Polution';
import styled from 'styled-components';

// icon chosen by name
const ChosenModeIcon = ({ name, className, isActive }) => {
  const iconStyle = {
    className,
    color: isActive ? 'black' : 'lightgray',
    opacity: isActive ? 1 : 0.5,
  };

  switch (name) {
    case 'noise':
      return <Noise {...iconStyle} />;
    case 'polution':
      return <Polution {...iconStyle} />;

    default:
      return <Fragment {...iconStyle}>No icon for &apos;{name}&apos;</Fragment>;
  }
};

// decorates chosen icon with styles
export const ModeIcon = styled(ChosenModeIcon)`
  width: 30px;
  height: 30px;
  color: lightgray;

  /*
   * doesn't work
   * so we apply style in jsx
   ${({ isActive }) =>
    isActive &&
    `
    color: white
  `}; */
`;
