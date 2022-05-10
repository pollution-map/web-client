import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styled from 'styled-components';

const StWrapper = styled.div`
  ${({ size }) => `width: ${size}%`};
  ${({ viewMode }) => (viewMode ? `display: none ` : `display: block `)};

  border-right: 1px solid #dadce0;
`;
const StText = styled.h1`
  transform: rotate(294deg);
  margin-top: 45vh;
  opacity: 0.1;
  display: flex;
  justify-content: center;
`;

const ElementsContainer = ({ size, name }) => {
  const [context, setContext] = useState(null);

  return (
    <StWrapper size={size} viewMode={size === 0}>
      <StText>development</StText>
    </StWrapper>
  );
};

export default observer(ElementsContainer);
