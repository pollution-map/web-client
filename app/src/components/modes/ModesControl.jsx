import { observer } from 'mobx-react-lite';
import LeafletControlWrapper from 'src/components/Control.tsx';
import { ModeButton } from 'src/components/modes/ModeButton';
import { useModesContext } from 'src/store/ModesContext';
import styled from 'styled-components';

const StyledModesControl = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModesControl = observer(() => {
  const modesStore = useModesContext();

  const onModeToggle = (mode) => {
    modesStore.toggleMode(mode);
  };

  return (
    <LeafletControlWrapper position="topright">
      <StyledModesControl>
        {modesStore.modes.map((m) => (
          <ModeButton key={m.name} mode={m} onToggle={onModeToggle} />
        ))}
      </StyledModesControl>
    </LeafletControlWrapper>
  );
});
