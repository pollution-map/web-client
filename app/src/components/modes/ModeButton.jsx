import ToggleButton from '@material-ui/lab/ToggleButton';
import { observer } from 'mobx-react-lite';
import { ModeIcon } from 'src/components/modes/ModeIcon';

export const ModeButton = observer(({ mode, onToggle }) => {
  const { isActive, name } = mode;

  return (
    <ToggleButton
      style={{ border: 0 }}
      size="small"
      selected={isActive}
      onClick={() => {
        onToggle(mode);
      }}
    >
      <ModeIcon
        color={isActive ? 'black' : 'lightgray'}
        opacity={isActive ? 1 : 0.8}
        name={name}
      />
    </ToggleButton>
  );
});
