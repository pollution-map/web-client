import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      // thumb: {
      //   color: '#ffffff',
      // },
      track: {
        color: '#ffffff',
      },
      rail: {
        color: '#d9d9d9',
      },
      cssLabel: {
        color: '#fff',
      },
    },
  },
});

export function RangeSlider({ range, onRangeChange }) {
  return (
    <StyledRangesControl>
      <ThemeProvider theme={muiTheme}>
        <StyledTypography>{range.name}</StyledTypography>
        <Slider
          orientation="vertical"
          defaultValue={range.values}
          valueLabelFormat={(v) => range.domainFn(v)}
          valueLabelDisplay="auto"
          onChange={(_, v) => onRangeChange(range, v)}
        />
      </ThemeProvider>
    </StyledRangesControl>
  );
}
