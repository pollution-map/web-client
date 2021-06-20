import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

const StyledRangesControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 60px;
  height: 600px;
`;
const StyledSlider = styled(Slider)``;
const StyledTypography = styled(Typography)`
  color: #ffffff;
`;

const useStyles = makeStyles(() => ({
  mark: {
    color: '#ffffff',
  },
}));

function valuetext(value) {
  return value <= 24 ? `${value}:00` : `${value}`;
}
export default function VerticalSlider({ type, valueMin, valueMax, marks }) {
  const classes = useStyles();

  return (
    <StyledRangesControl>
      <StyledTypography gutterBottom color="initial">
        {type}
      </StyledTypography>
      <StyledSlider
        orientation="vertical"
        defaultValue={[valueMin, valueMax]}
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        marks={marks}
        valueLabelDisplay="auto"
        min={valueMin}
        max={valueMax}
        classes={{ markLabel: classes.mark }}
      />
    </StyledRangesControl>
  );
}
