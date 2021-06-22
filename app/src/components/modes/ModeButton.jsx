import { observer } from 'mobx-react-lite';
import { ModeIcon } from 'src/components/modes/ModeIcon';
import styled from 'styled-components';

const StyledModeButton = styled.button`
  background: ${({ isActive }) => (isActive ? 'white' : 'gray')};
  opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
  border: none;
  border-radius: 4%;
  padding: 0;
  margin: 5px;
  padding: 5px;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px 100px rgba(0, 0, 0, 0.5);
`;

export const ModeButton = observer(({ mode, onToggle }) => {
  const { isActive, name } = mode;

  return (
    <StyledModeButton
      type="button"
      isActive={isActive}
      onClick={() => {
        onToggle(mode);
      }}
    >
      <ModeIcon
        color={isActive ? 'black' : 'lightgray'}
        opacity={isActive ? 1 : 0.8}
        name={name}
      />
    </StyledModeButton>
  );
});
