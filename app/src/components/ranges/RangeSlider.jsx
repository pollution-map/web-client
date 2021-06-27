/* eslint-disable no-nested-ternary */
import Slider from '@material-ui/core/Slider';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';
import styled from 'styled-components';

const StyledRangesControl = styled.div.attrs(({ orientation, size }) => ({
  orientation: orientation || 'horizontal',
}))`
  display: flex;
  flex-direction: column;
  height: ${({ orientation, size }) =>
    orientation === 'vertical'
      ? size
      : orientation === 'horizontal'
      ? '100%'
      : null};
  width: ${({ orientation, size }) =>
    orientation === 'vertical'
      ? '100%'
      : orientation === 'horizontal'
      ? size
      : null};
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
  width: 30px;
  height: 30px;
`;

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      rail: {
        color: '#d9d9d9',
      },
      cssLabel: {
        color: '#fff',
      },
    },
  },
});

export function RangeSlider({ range, onRangeChange, orientation }) {
  return (
    <StyledRangesControl orientation={orientation} size="60vh">
      <ThemeProvider theme={muiTheme}>
        <StyledTypography>{range.name}</StyledTypography>
        <Slider
          orientation={orientation}
          defaultValue={range.values}
          valueLabelFormat={(v) => range.domainFn(v)}
          valueLabelDisplay="auto"
          onChange={(_, v) => onRangeChange(range, v)}
        />
      </ThemeProvider>
    </StyledRangesControl>
  );
}
