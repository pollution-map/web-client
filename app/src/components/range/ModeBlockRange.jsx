import Fab from '@material-ui/core/Fab';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useState } from 'react';
import { RangesControl } from 'src/components/range/RangesControl';
import Control from 'src/components/Control.tsx';
import Tooltip from '@material-ui/core/Tooltip';
import { CSSTransition } from 'react-transition-group';
import { withStyles } from '@material-ui/core';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);


export function ModeBlockRange() {
  const [isButtonActive, setButtonActive] = useState(false);
  return (
    <Control position="bottomright">
      <LightTooltip title="Выбор диапазонов" placement="left">
        <Fab onClick={() => setButtonActive(!isButtonActive)}>
          <ArrowBackIosRoundedIcon
            style={{
              transform: isButtonActive ? 'rotate(90deg)' : 'rotate(270deg)',
            }}
          />
        </Fab>
      </LightTooltip>
      <CSSTransition
        in={isButtonActive}
        timeout={300}
        classNames="alert"
        unmountOnExit
      >
        {isButtonActive && <RangesControl />}
      </CSSTransition>
    </Control>
  );
}
