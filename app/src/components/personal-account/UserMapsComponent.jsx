import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import AddCard from './AddCard';

const StArchitectureIcon = styled(MapOutlinedIcon)`
  font-size: 80px !important;
  display: block !important;
  margin-left: auto !important;
  margin-right: auto !important;
  padding-top: 35px !important;
`;
const StCard = styled(Card)`
  flex-grow: 1;
  max-width: 200px;
  min-width: 150px;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #dadce0;
`;
const StCardActionArea = styled(CardActionArea)`
  height: 200px;
`;
const StWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  cursor: context-menu;
`;

const UserMapsComponen = ({
  maps,
  handleClick,
  actions,
  addMap,
  updateMap,
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const [idCard, setIdCard] = useState();
  const [nameCard, setNamwCard] = useState();
  const [open, setOpen] = useState(false);
  const newNameMap = useInput('', {
    minLength: 0,
    maxLength: 100,
  });

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  return (
    <StWrapper onContextMenu={handleContextMenu}>
      <AddCard addMap={addMap} />
      {maps?.map((m) => (
        <StCard key={m.id}>
          <StCardActionArea
            onBlur={() => {
              setIdCard(m.id);
              setNamwCard(m.name);
            }}
            onClick={() => {
              handleClick(m.id, 'redactor');
            }}
          >
            <StArchitectureIcon />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {m.name.length > 10 ? `${m.name.substr(0, 10)}...` : m.name}
              </Typography>
            </CardContent>
          </StCardActionArea>
          <Menu
            open={contextMenu !== null}
            onClose={() => {
              setContextMenu(null);
            }}
            anchorReference="anchorPosition"
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
          >
            {actions.map((a) => (
              <MenuItem
                key={a.operation}
                onClick={() => {
                  if (a.operation === 'rename') {
                    newNameMap.setValue(nameCard);
                    setOpen(true);
                  }
                  handleClick(idCard, a.operation);
                }}
              >
                <ListItemIcon>{a.icon}</ListItemIcon>
                {a.name}
              </MenuItem>
            ))}
          </Menu>
        </StCard>
      ))}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Переименовать</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={newNameMap.value}
            error={newNameMap.isDirty && !newNameMap.inputValid}
            onChange={(e) => newNameMap.onChange(e)}
            onBlur={(e) => newNameMap.onBlur(e)}
            margin="dense"
            id="name"
            label="Переименовать"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
          <Button
            disabled={!newNameMap.inputValid}
            onClick={() => {
              updateMap(idCard, newNameMap.value);
              setOpen(false);
              handleClick(idCard, 'rename');
            }}
          >
            Продолжить
          </Button>
        </DialogActions>
      </Dialog>
    </StWrapper>
  );
};

export default observer(UserMapsComponen);
