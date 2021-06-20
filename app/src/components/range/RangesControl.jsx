import { observer } from 'mobx-react-lite';
import LeafletControlWrapper from 'src/components/Control.tsx';
import { RangeSlider } from 'src/components/range/RangeSlider';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';

const StyledRangesControl = styled.div`
  display: flex;
  margin-bottom: 125px;
`;
export const RangesControl = observer(() => {
  const { rangesStore } = useStore();

  const onRangeChange = (range, values) => {
    rangesStore.setRangeValues(range, values);
  };
  return (
    <LeafletControlWrapper position="bottomleft">
      <StyledRangesControl>
        {rangesStore.ranges.map((r) => (
          <RangeSlider key={r.name} range={r} onRangeChange={onRangeChange} />
        ))}
      </StyledRangesControl>
    </LeafletControlWrapper>
  );
});
