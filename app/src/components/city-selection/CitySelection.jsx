import { Paper } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { trace } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { FlyToInterpolator } from 'react-map-gl';
import Control from 'src/components/Control';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledPapper = styled(Paper)`
  ${({ width }) => `width: ${width}`};
  opacity: 0.6;
`;
const flyToInterpolator = new FlyToInterpolator();

export const CitySelection = observer(({ position }) => {
  const { citiesStore, mapStore } = useStore();
  const [error, setError] = useState();

  const flyTo = useCallback((value) => {
    mapStore.changeViewState((prevViewState) => ({
      ...prevViewState,
      latitude: value.latitude,
      longitude: value.longitude,
      transitionDuration: 'auto',
      transitionInterpolator: flyToInterpolator,
    }));
  }, []);
  trace(true);

  return (
    <Control position={position}>
      <StyledPapper width="300px">
        <Autocomplete
          options={citiesStore.cities}
          value={citiesStore.SelectedCity}
          onChange={(_, selectedCity) => {
            citiesStore.switchSelectedCity(selectedCity?.name).then((err) => {
              if (selectedCity && !err) flyTo(selectedCity);
              setError(err);
            });
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Текущий город" variant="filled" />
          )}
        />
      </StyledPapper>

      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Control>
  );
});
