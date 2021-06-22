import { ButtonGroup } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { ModeButton } from 'src/components/modes/ModeButton';
import { useStore } from 'src/store/RootStoreContext';

export const ModesControl = observer(({ position }) => {
  const { modesStore } = useStore();

  const onModeToggle = (mode) => {
    modesStore.toggleMode(mode);
  };

  return (
    <ButtonGroup variant="contined">
      {modesStore.modes.map((m) => (
        <ModeButton key={m.name} mode={m} onToggle={onModeToggle} />
      ))}
    </ButtonGroup>
  );
});

ModesControl.defaultProps = {
  position: 'topright',
};
