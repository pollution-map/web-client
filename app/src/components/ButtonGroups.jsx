import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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
    <Control position="top-right">
      <Paper elevation={0} className={classes.paper} style={{ borderWidth: 0 }}>
        {modeSelection}
        <Divider flexItem orientation="vertical" className={classes.divider} />
        {additionalModeSelection}
      </Paper>
    </Control>
  );
}
