import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useStore } from 'src/store/RootStoreContext';

export const Button3D = () => {
  const { mapStore } = useStore();
  return (
    <ToggleButtonGroup aria-label="3D">
      <ToggleButton
        style={{ border: 0, color: mapStore.is3D ? 'black' : 'lightgray' }}
        variant="outlined"
        selected={mapStore.is3D}
        onClick={() => mapStore.toggleIs3D()}
      >
        3D
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
