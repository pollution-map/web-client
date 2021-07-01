import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
`;

export const Preloader = () => (
  <StyledWrapper>
    <CircularProgress />
  </StyledWrapper>
);
