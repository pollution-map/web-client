import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import { Slide } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { observer } from 'mobx-react-lite';
import { forwardRef, useState } from 'react';

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const UserInfoComponent = ({ userName, email, logoutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleCloseDialog = (allDevicesLogout) => {
    setOpenDialog(false);
    logoutUser(allDevicesLogout);
  };
  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
          size="small"
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 42, height: 42 }}>
            {userName?.charAt(0) || email?.charAt(0) || 'U'}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        onClick={() => {
          setAnchorEl(null);
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 13,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {userName || email || 'User'}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Dialog
        TransitionComponent={Transition}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Выйти из всех устройств?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}
          >
            отмена
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog(false);
            }}
          >
            нет
          </Button>
          <Button
            onClick={() => {
              handleCloseDialog(true);
            }}
            autoFocus
          >
            да
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(UserInfoComponent);
