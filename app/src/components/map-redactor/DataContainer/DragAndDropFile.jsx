/* eslint-disable jsx-a11y/label-has-associated-control */
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import Tooltip from '@mui/material/Tooltip';
import '../../auth/styledLogin.css';
import Button from '@mui/material/Button';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';

const StFileOpenOutlinedIcon = styled(FileOpenOutlinedIcon)`
  font-size: 80px !important;
`;

const StInput = styled.input`
  display: none;
`;

const StWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DragAndDropFile = ({ addFile }) => {
  const [drag, setDrag] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };
  //  ----    finish    ----
  const onDropHandler = (e, type) => {
    e.preventDefault();

    const files =
      type !== 'button' ? [...e.dataTransfer.files] : [...e.target.files];
    const formData = new FormData();
    formData.append('file', files[0]);
    addFile(files);
    setDrag(false);
  };
  return (
    <StWrapper
      className={drag ? 'styledIconsActive' : null}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      onDrop={(e) => onDropHandler(e)}
      accept="application/geojson"
    >
      <Tooltip
        followCursor
        title={<h3>Перемести файл JSON</h3>}
        placement="bottom"
      >
        <StFileOpenOutlinedIcon />
      </Tooltip>
      <label htmlFor="contained-button-file">
        <StInput
          onChange={(e) => onDropHandler(e, 'button')}
          accept="application/json"
          id="contained-button-file"
          multiple
          type="file"
        />

        <Button
          style={{ marginTop: '1vh' }}
          variant="contained"
          component="span"
          startIcon={<FileOpenOutlinedIcon />}
        >
          Загрузить файл
        </Button>
      </label>
    </StWrapper>
  );
};

export default observer(DragAndDropFile);
