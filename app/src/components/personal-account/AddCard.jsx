import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const StCard = styled(Card)`
  height: 200px;
  max-width: 200px;
  border-radius: 6px;
  border: 1px solid #dadce0;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  align-content: 'space-around';
  justify-content: 'space-around';
`;
const StAddCircleOutlineIcon = styled(AddCircleOutlineIcon)`
  font-size: 80px !important;
`;

const AddCard = ({ addMap }) => {
  const [open, setOpen] = useState(false);
  const name = useInput('new map', {
    minLength: 0,
    maxLength: 100,
  });

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <StCard>
        <CardActionArea
          onClick={() => {
            setOpen(true);
          }}
        >
          <StAddCircleOutlineIcon />
        </CardActionArea>
      </StCard>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Создание новой карты</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={name.value}
            error={name.isDirty && !name.inputValid}
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
            margin="dense"
            id="name"
            label="Название карты"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button
            disabled={!name.inputValid}
            onClick={() => {
              addMap(name.value);
              setOpen(false);
              name.setValue('new map');
            }}
          >
            Продолжить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddCard;
