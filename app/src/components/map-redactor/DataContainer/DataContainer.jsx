import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';
import DataGridComponent from './DataGridComponent';
import DragAndDropFile from './DragAndDropFile';

const columns = [
  {
    field: 'mouse',
    type: 'actions',
    width: 10,
    cellClassName: 'mouse',

    getActions: ({ id }) => [
      <GridActionsCellItem
        // onContextMenu={handleContextMenu}
        key={1}
        icon={<MouseOutlinedIcon />}
        label="Delete"
        // onClick={handleContextMenu}
        color="inherit"
      />,
    ],
  },
  {
    field: 'longitude',
    headerName: 'Longitude',
    type: 'string',
  },
  {
    field: 'latitude ',
    headerName: 'Latitude',
    type: 'string',
  },
  {
    field: 'name',
    headerName: 'name',
    editable: true,
  },
];

const rows = [];

for (let i = 1; i < 1000; i++) {
  rows.push({
    id: i,
    longitude: '62.28836509824845',
    latitude: '75.706787109375',
    name: 'test',
  });
}

const actions = [
  { icon: <DeleteForeverIcon />, name: 'Delete', operation: 'delete' },
];

const StWrapper = styled.div`
  ${({ size }) => `width: ${size}%`};
  ${({ viewMode }) => (viewMode ? `display: none ` : `display: block `)};
  border-left: 1px solid #dadce0;
`;
const DataContainer = ({ size, addFile, mapData }) => {
  const [testdate, setTestdate] = useState(false);
  const handleClick = (id, operation) => {
    if (operation === 'delete') {}
  };

  return (
    <StWrapper size={size} viewMode={size === 0}>
      {mapData.length !== 0 ? (
        <DataGridComponent columns={columns} rows={rows} actions={actions} />
      ) : (
        <DragAndDropFile addFile={addFile} />
      )}
    </StWrapper>
  );
};

export default observer(DataContainer);
