/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Noise } from 'src/icons/Noise';
import { Polution } from 'src/icons/Polution';
import styled from 'styled-components';

// icon chosen by name
const ChosenModeIcon = ({ name, className, color, opacity }) => {
  const iconStyle = {
    className,
    color,
    opacity,
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

ChosenModeIcon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  opacity: PropTypes.number,
  className: PropTypes.string,
};

ChosenModeIcon.defaultProps = {
  className: 'unexpected class name value',
  color: 'black',
  opacity: 1,
};

// decorates chosen icon with styles
export const ModeIcon = styled(ChosenModeIcon).attrs(({ color }) => ({
  color: color || 'black',
}))`
  width: 30px;
  height: 30px;
`;
