import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';
import { TestMap } from './TestMap';

const StWrapper = styled.div`
  ${({ size }) => `width: ${size}%`};
`;
const StText = styled.h1`
  transform: rotate(294deg);
  margin-top: 45vh;
  opacity: 0.1;
  display: flex;
  justify-content: center;
`;

const MapContainer = ({ size, left }) => {
  const [context, setContext] = useState(null);

  return (
    <StWrapper size={size}>
      {/* <TestMap size={size} left={left} /> */}
      <StText>development</StText>
    </StWrapper>
  );
};

export default observer(MapContainer);
