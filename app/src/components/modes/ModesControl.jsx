import { withStyles } from '@material-ui/core';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { observer } from 'mobx-react-lite';
import { ModeButton } from 'src/components/modes/ModeButton';
import { useStore } from 'src/store/RootStoreContext';

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
  },
}))(ToggleButtonGroup);

export const ModesControl = observer(({ position }) => {
  const { modesStore } = useStore();

  const onModeToggle = (mode) => {
    modesStore.toggleMode(mode);
  };

  return (
    <StyledToggleButtonGroup variant="contined" aria-label="mode selection">
      {modesStore.modes.map((m) => (
        <ModeButton key={m.name} mode={m} onToggle={onModeToggle} />
      ))}
    </StyledToggleButtonGroup>
  );
});

ModesControl.defaultProps = {
  position: 'topright',
};
