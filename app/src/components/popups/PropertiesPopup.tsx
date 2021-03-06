import { ModeIcon } from 'src/components/modes/ModeIcon';
import { WeightObjectV } from 'src/models/geo-point';
import { useStore } from 'src/store/RootStoreContext';
import { magama } from 'src/utils/colorScheme';
import styled from 'styled-components';

interface PopupContentProps {
  left: number;
  top: number;
  color: string;
}

const StyledPopupContent = styled.div.attrs<PopupContentProps>(
  ({ left, top }) => {
    return {
      style: {
        left: `${left}px`,
        top: `${top}px`,
      },
    };
  }
)<PopupContentProps>`
  position: absolute;
  z-index: 0;
  pointer-events: none;
  flex-wrap: wrap;
  padding: 10px;
  text-shadow: 1px 0 1px #181818, 0 1px 1px #181818, -1px 0 1px #181818,
    0 -1px 1px #181818;
`;

const StyledModeIcon = styled(ModeIcon)`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  align-self: center;
`;

interface PropertyProps {
  text: string;
  value: number;
  modeName: string;
}

const color = magama([100, 0]);
const colorInverted = magama([0, 100]);

const PropItem = styled.div`
  margin: 8px;
  padding: 0 5px 0 0;
  color: #ffffff;
  flex-wrap: wrap;
`;

const StyledPropName = styled.span`
  flex-basis: 20%;
  padding-bottom: 5px;
  display: block;
  font-size: 22px;
`;

const StyledPropValue = styled.span<{ color: string }>`
  font-size: 34px;
  font-weight: 900;
  color: ${(props) => props.color}px;
`;

const StyledPropRow = styled.div`
  display: flex;
  align-items: center;
  flex-basis: 20%;
`;

const Property: React.FC<PropertyProps> = ({ text, value, modeName }) => {
  const c = color(value).toString();
  return (
    <PropItem>
      <StyledPropName>{text}</StyledPropName>
      <StyledPropRow>
        <StyledModeIcon name={modeName} color="white" />
        <StyledPropValue color={c}>{value}</StyledPropValue>
      </StyledPropRow>
    </PropItem>
  );
};

interface PopupProps {
  x: number;
  y: number;
  properties: WeightObjectV;
}

const StyledPropsContainer = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 0 8px;
`;

export const PropertiesPopup: React.FC<PopupProps> = ({ x, y, properties }) => {
  const { modesStore } = useStore();
  const c = color(properties.value).toString();
  const bc = colorInverted(properties.value).toString();
  return (
    <StyledPopupContent left={x} top={y} color={c}>
      <StyledPropsContainer>
        {modesStore.ActiveModes.map((m) => (
          <Property
            key={m.name}
            modeName={m.name}
            text={m.displayName}
            value={properties[m.name]}
          />
        ))}
      </StyledPropsContainer>
    </StyledPopupContent>
  );
};
