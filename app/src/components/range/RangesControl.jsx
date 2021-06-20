import LeafletControlWrapper from 'src/components/Control.tsx';
import VerticalSlider from 'src/components/range/range';
import styled from 'styled-components';

const StyledRangesControl = styled.div`
  display: flex;
  align-items: stretch;
`;

const marksTime = [
  {
    value: 0,
    label: '00:00',
  },
  {
    value: 4,
    label: '04:00',
  },
  {
    value: 8,
    label: '08:00',
  },
  {
    value: 12,
    label: '12:00',
  },
  {
    value: 16,
    label: '16:00',
  },
  {
    value: 20,
    label: '20:00',
  },
  {
    value: 24,
    label: '24:00',
  },
];

export const RangesControl = () => (
  <LeafletControlWrapper position="bottomleft">
    <StyledRangesControl>
      <VerticalSlider
        type="Time"
        valueMin={0}
        valueMax={24}
        marks={marksTime}
      />
      <VerticalSlider
        type="Time"
        valueMin={0}
        valueMax={24}
        marks={marksTime}
      />
    </StyledRangesControl>
  </LeafletControlWrapper>
);
