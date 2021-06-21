import Fab from '@material-ui/core/Fab';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { RangesControl } from 'src/components/range/RangesControl';
import 'src/leafletMarkerFix';
import styled from 'styled-components';

const StyledButton = styled.div`
  margin-top: 100px;
  margin-left: 10px;
  position: absolute;
  border-radius: 25px;
  z-index: 1000;
  cursor: pointer;
`;

export function ModeBlockRange() {
  const [isButtonActive, setButtonActive] = useState(false);
  return (
    <>
      <StyledButton>
        <Fab onClick={() => setButtonActive(!isButtonActive)} color="primary">
          <ArrowBackIosRoundedIcon
            style={{
              transform: isButtonActive ? 'rotate(0deg)' : 'rotate(180deg)',
            }}
          />
        </Fab>
      </StyledButton>
      {isButtonActive && <RangesControl />}
    </>
  );
}
