import { scaleQuantize } from 'd3';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  color: white;
  flex-basis: 100%;
  bottom: 0;
  text-align: center;
  font-size: 150%;
  padding-right: 30px;
  display: inlint-block;

`;


const textScale = scaleQuantize(
  [0, 70, 80],
  ['Низкий уровень', 'Средний уровень', 'Высокий уровень']
);

interface PropTypes {
  value: number;
}

export const TextIndicator: React.FC<PropTypes> = ({
  value,
}) => {
  return (
    <StyledDiv>
      {textScale(value)}
    </StyledDiv>
  );
};
