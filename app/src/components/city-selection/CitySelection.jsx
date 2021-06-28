import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import styled from 'styled-components';

import Control from '../Control';

const testData = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
];

const StyledPapper = styled(Paper)`
  ${({ width }) => `width: ${width}`};
  opacity: 0.6;
`;

export const CitySelection = ({ position }) => (
  <Control position={position}>
    <StyledPapper width="300px">
      <Autocomplete
        options={testData}
        value={testData[4]}
        onChange={(_, v) => {
          alert(v.title);
        }}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField {...params} label="Текущий город" variant="filled" />
        )}
      />
    </StyledPapper>
  </Control>
);
