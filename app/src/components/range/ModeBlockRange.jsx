import Fab from '@material-ui/core/Fab';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useState } from 'react';
import { RangesControl } from 'src/components/range/RangesControl';
import Control from 'src/components/Control.tsx';

export function ModeBlockRange() {
  const [isButtonActive, setButtonActive] = useState(false);
  return (
    <Control position="bottomright">
      <Fab onClick={() => setButtonActive(!isButtonActive)} color="primary">
        <ArrowBackIosRoundedIcon
          style={{
            transform: isButtonActive ? 'rotate(90deg)' : 'rotate(270deg)',
          }}
        />
      </Fab>
      {isButtonActive && <RangesControl />}
    </Control>
  );
}
