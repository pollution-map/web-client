/* eslint-disable no-nested-ternary */
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useState } from 'react';
import styled from 'styled-components';
import LeafletControlWrapper from 'src/components/Control.tsx';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  ${({ orientation }) =>
    orientation === 'horizontal' && `align-items: flex-end`};

  flex-direction: ${({ orientation }) =>
    orientation === 'vertical'
      ? 'column'
      : orientation === 'horizontal'
      ? 'row'
      : null};
`;
const ChildrenWrapper = styled.div``;
const StyledButton = styled.div`
  align-self: 'flex-end';
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 2px 2px 100px rgba(0, 0, 0, 0.5);
`;
const StyledArrowBackIosRoundedIcon = styled(ArrowBackIosRoundedIcon).attrs(
  ({ orientation, isActive }) => ({
    orientation: orientation || 'horizontal',
    isActive: isActive || false,
  })
)`
  transform: ${({ orientation, isActive }) =>
    orientation === 'vertical'
      ? isActive
        ? 'rotate(90deg)'
        : 'rotate(-90deg)'
      : orientation === 'horizontal'
      ? isActive
        ? 'rotate(0deg)'
        : 'rotate(180deg)'
      : null};
`;

export function ArrowControl({
  children,
  title,
  titlePlacemet,
  orientation,
  onToggle,
  isActive,
  position,
}) {
  const [isButtonActive, setButtonActive] = useState(isActive);
  return (
    <LeafletControlWrapper position={position}>
      <StyledWrapper orientation={orientation}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        <LightTooltip title={title} placement={titlePlacemet}>
          <StyledButton>
            <Fab
              onClick={() => {
                setButtonActive(!isButtonActive);
                if (onToggle) onToggle(!isButtonActive);
              }}
            >
              <StyledArrowBackIosRoundedIcon
                orientation={orientation}
                isActive={isButtonActive}
              />
            </Fab>
          </StyledButton>
        </LightTooltip>
      </StyledWrapper>
    </LeafletControlWrapper>
  );
}
