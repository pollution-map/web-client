import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const StyledRangesControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 60vh;
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
  width: 20px;
  height: 30px;
`;

export function RangeSlider({ range, onRangeChange }) {
  return (
    <StyledRangesControl>
      <StyledTypography>{range.name}</StyledTypography>
      <Slider
        orientation="vertical"
        defaultValue={range.values}
        valueLabelFormat={(v) => range.domainFn(v)}
        valueLabelDisplay="auto"
        onChange={(_, v) => onRangeChange(range, v)}
      />
    </StyledRangesControl>
  );
}
