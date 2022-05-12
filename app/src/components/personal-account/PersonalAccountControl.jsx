import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Tooltip from '@mui/material/Tooltip';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';
import { forwardRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';
import UserInfoComponent from './UserInfoComponent';
import UserMapsComponent from './UserMapsComponent';

const StWrapper = styled.body`
  overflow: auto !important;
`;
const StLink = styled(Link)`
  text-decoration: none;
  margin-left: 1vh;
  margin-top: auto;
  margin-bottom: auto;
`;
const StUserInfo = styled.div`
  padding-right: 5vh;
`;
const StContentContainer = styled.div`
  margin-left: 5vh;
  margin-right: 5vh;
`;
const StHeader = styled.header`
  border-bottom: 1px solid #dadce0;
  padding-left: 5vh;
  display: flex;
  justify-content: space-between;
`;

const actions = [
  { icon: <DesktopWindowsIcon />, name: 'View', operation: 'viewing' },
  {
    icon: <HandymanRoundedIcon />,
    name: 'Edit',
    operation: 'redactor',
  },
  {
    icon: <DriveFileRenameOutlineRoundedIcon />,
    name: 'Rename',
    operation: 'rename',
  },
  { icon: <InsertLinkIcon />, name: 'Link', operation: 'link' },
  { icon: <DeleteForeverIcon />, name: 'Delete', operation: 'delete' },
];
// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Slide direction="up" ref={ref} {...props} />
));

const PersonalAccountControl = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { userStore } = useStore();
  const [open, setOpen] = useState(false);
  const [idMap, setIdMap] = useState();

  const handleClose = () => {
    userStore.mapDelete(idMap);
    setOpen(false);
  };

  useEffect(() => {
    autorun(() => {
      if (userStore.message === 'null') return;

      if (userStore.message.indexOf('create') !== -1) {
        userStore.message = 'null';
        enqueueSnackbar('Карта успешно создана', {
          variant: 'success',
        });
      }

      if (userStore.message.indexOf('update') !== -1) {
        userStore.message = 'null';
        enqueueSnackbar('Карта успешно обновлена', {
          variant: 'success',
        });
      }
      if (userStore.message.indexOf('delete') !== -1) {
        userStore.message = 'null';
        enqueueSnackbar('Карта успешно удалена', {
          variant: 'success',
        });
      }
    });
  }, []);

  const logoutUser = (fromAllDevices) => {
    userStore.logout(fromAllDevices);
    // eslint-disable-next-line no-unused-expressions
    fromAllDevices
      ? enqueueSnackbar('Вы вышли из системы со всех браузеров', {
          variant: 'success',
        })
      : enqueueSnackbar('Вы вышли из системы', {
          variant: 'success',
        });
  };

  useEffect(() => {
    userStore.getMaps('100', '0');
  }, []);

  const handleClick = (id, operation) => {
    setIdMap(id);
    if (operation === 'delete') {
      setOpen(true);
    } else if (operation === 'viewing') {
      navigate(`/map-viewing/${id}`);
    } else if (operation === 'redactor') {
      navigate(`/map-redactor/${id}`);
    } else if (operation === 'link') {
      enqueueSnackbar('Ссылка скопирована в буфер обмена', {
        variant: 'info',
      });
      navigator.clipboard.writeText(
        `${window.location.href.slice(
          0,
          window.location.href.indexOf('/person-account')
        )}/map-viewing/${id}`
      );
    }
  };
  const addMap = (name) => {
    userStore.createMaps(name);
  };
  const updateMap = (id, name) => {
    userStore.mapUpdate(id, name);
  };

  return (
    <StWrapper>
      <StHeader>
        <Tooltip title={<h3>Пример</h3>} placement="bottom">
          <StLink to="/pollutionmap">
            <Button variant="contained" startIcon={<MapOutlinedIcon />}>
              Pollution Map
            </Button>
          </StLink>
        </Tooltip>
        <StUserInfo>
          <UserInfoComponent
            email={userStore.user?.email}
            userName={userStore.user?.userName}
            logoutUser={logoutUser}
          />
        </StUserInfo>
      </StHeader>
      <StContentContainer>
        <UserMapsComponent
          maps={userStore.user.maps}
          handleClick={handleClick}
          actions={actions}
          addMap={addMap}
          updateMap={updateMap}
        />
      </StContentContainer>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Удалить карту?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Нет</Button>
          <Button color="error" onClick={handleClose}>
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </StWrapper>
  );
};

export default observer(PersonalAccountControl);
