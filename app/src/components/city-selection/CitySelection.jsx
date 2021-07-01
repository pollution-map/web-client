import { CircularProgress, Paper } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
  const [loading, setLoading] = useState(false);

  const flyTo = useCallback((value) => {
    mapStore.changeViewState((prevViewState) => ({
      ...prevViewState,
      latitude: value.latitude,
      longitude: value.longitude,
      transitionDuration: 'auto',
      transitionInterpolator: flyToInterpolator,
    }));
  }, []);

  return (
    <Control position={position}>
      <StyledPapper width="300px">
        <Autocomplete
          loading={loading}
          options={citiesStore.cities}
          value={citiesStore.SelectedCity}
          onChange={(_, selectedCity) => {
            setLoading(true);
            citiesStore
              .switchSelectedCity(selectedCity?.name)
              .then((cityData) => {
                if (cityData.city) flyTo(cityData.city);
                setError(cityData.error);
                setLoading(false);
              });
            return selectedCity;
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Текущий город"
              variant="filled"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </StyledPapper>

      <Snackbar open={!!error}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Control>
  );
});
