import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { ModesControl } from 'src/components/modes/ModesControl';
import Control from 'src/components/Control.tsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
  },
}))(ToggleButtonGroup);

export function ButtonGroup() {
  const classes = useStyles();

  return (
    <Control position="topright">
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          exclusive
          aria-label="text alignment"
        >
          <ModesControl />
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledToggleButtonGroup
          size="small"
          exclusive
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            3D
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Paper>
    </Control>
  );
}
