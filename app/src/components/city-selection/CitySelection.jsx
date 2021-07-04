/* eslint-disable react/jsx-props-no-spreading */
import { CircularProgress, Paper } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { autorun, when } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Control from 'src/components/Control';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';
import { useFlyTo } from '../transitions/useFlyTo';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledPapper = styled(Paper)`
  ${({ width }) => `width: ${width}`};
  opacity: 0.6;
`;

export const CitySelection = observer(({ position }) => {
  const { citiesStore } = useStore();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const flyTo = useFlyTo();

  useEffect(() => {
    autorun(() => {
      if (citiesStore.loadingError) setError(citiesStore.loadingError);
    });
  }, []);

  return (
    <Control position={position}>
      <StyledPapper width="300px">
        <Autocomplete
          value={citiesStore.SelectedCity}
          loading={loading}
          options={citiesStore.cities}
          onChange={(_, selectedCity) => {
            if (!selectedCity) return;

            setLoading(true);
            citiesStore.setSelectedCity(selectedCity?.name);
            when(
              () =>
                citiesStore.SelectedCity.latitude &&
                citiesStore.SelectedCity.longitude,
              () => {
                setLoading(false);
                setError();
                flyTo(citiesStore.SelectedCity);
              }
            );
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
