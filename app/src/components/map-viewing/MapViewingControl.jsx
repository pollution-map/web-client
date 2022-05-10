import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';

const StWrapper = styled.div``;
const StText = styled.h1`
  transform: rotate(294deg);
  margin-top: 45vh;
  opacity: 0.1;
  display: flex;
  justify-content: center;
`;

const MapViewingControl = () => {
  const [container, setContainer] = useState();

  return (
    <StWrapper>
      <StText>development</StText>
    </StWrapper>
  );
};

export default observer(MapViewingControl);
