import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
export function ButtonGroups({ modeSelection, additionalModeSelection }) {
  const classes = useStyles();

  return (
    <Control position="topright">
      <Paper elevation={0} className={classes.paper} style={{ borderWidth: 0 }}>
        {modeSelection}
        <Divider flexItem orientation="vertical" className={classes.divider} />
        {additionalModeSelection}
      </Paper>
    </Control>
  );
}
