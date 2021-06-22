import { observer } from 'mobx-react-lite';
import { RangeSlider } from 'src/components/range/RangeSlider';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';

const StyledRangesControl = styled.div`
  display: flex;
`;
export const RangesControl = observer(() => {
  const { rangesStore } = useStore();

  const onRangeChange = (range, values) => {
    rangesStore.setRangeValues(range, values);
  };
  return (
    <StyledRangesControl>
      {rangesStore.ranges.map((r) => (
        <RangeSlider key={r.name} range={r} onRangeChange={onRangeChange} />
      ))}
    </StyledRangesControl>
  );
});
