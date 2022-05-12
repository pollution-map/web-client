import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'src/store/RootStoreContext';
import styled from 'styled-components';
import DataContainer from './DataContainer/DataContainer';
import ElementsContainer from './ElementsContainer/ElementsContainer';
import MapContainer from './MapContainer/MapContainer';
import Menu from './Menu';

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  margin: 0;
  padding: 0;
`;
const StMenuWrappe = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
`;

const MapRedactorControl = () => {
  const [sizeContainer, setSizeContainer] = useState([20, 80]);
  const { id } = useParams();
  const { userStore, datasetsStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (datasetsStore.map?.id === id) return;
    datasetsStore.getMap(id);

    autorun(() => {
      if (!datasetsStore.isLoading && datasetsStore.map.id === undefined) {
        navigate('/person-account');
      }
    });
  }, []);

  const setSizeMapContainer = (size) => {
    setSizeContainer(size);
  };
  const addFile = (file) => {
    datasetsStore.setFile(file);
  };

  return (
    <StWrapper>
      <ElementsContainer
        size={sizeContainer[0]}
        name={datasetsStore.map.name}
      />
      <MapContainer
        size={100 - (sizeContainer[0] + (100 - sizeContainer[1]))}
        left={sizeContainer[0]}
      />

      <DataContainer
        size={100 - sizeContainer[1]}
        addFile={addFile}
        mapData={datasetsStore.mapData}
      />
      <StMenuWrappe>
        <Menu
          setSizeMapContainer={setSizeMapContainer}
          sizeContainer={sizeContainer}
          minDistanceSlider={35}
          maxMinSlider={[15, 85]}
        />
      </StMenuWrappe>
    </StWrapper>
  );
};

export default observer(MapRedactorControl);
