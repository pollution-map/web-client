import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    DataGrid,
    GridActionsCellItem,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    ruRU
} from '@mui/x-data-grid';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <IconButton color="primary">
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </GridToolbarContainer>
  );
}
const DataGridComponent = ({ columns, rows, actions }) => {
  const [contextMenu, setContextMenu] = useState(null);

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
  const columnsTest = [
    {
      field: 'mouse',
      type: 'actions',
      width: 10,
      cellClassName: 'mouse',

      getActions: ({ id }) => [
        <GridActionsCellItem
          onContextMenu={handleContextMenu}
          key={1}
          icon={<MouseOutlinedIcon color="primary"/>}
          label="Delete"
          onClick={handleContextMenu}
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
      field: 'latitude',
      headerName: 'Latitude ',
      type: 'string',
    },
    {
      field: 'name',
      headerName: 'name',
      type: 'string',
      editable: true,

      // eslint-disable-next-line react/display-name
      renderHeader: (params) => (
        <div onContextMenu={handleContextMenu}>
          {'Birthday '}
          <MouseOutlinedIcon color="primary" fontSize="small" />
        </div>
      ),
    },
  ];

  // const [checkboxSelection, setCheckboxSelection] = useState(false);

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columnsTest}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        experimentalFeatures={{ newEditingApi: true }}
        // checkboxSelection
        // disableSelectionOnClick
        disableColumnMenu // Меню столбцов
        rowHeight={35}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
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
              // handleClick(idCard, a.operation);
            }}
          >
            <ListItemIcon>{a.icon}</ListItemIcon>
            {a.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default observer(DataGridComponent);
