import { scaleQuantize } from 'd3';
import styled from 'styled-components';

const StyledDiv = styled.div<{ color: string; borderColor: string }>`
  width: 100%;
  color: white;
  flex-basis: 100%;
  bottom: 0;
  text-align: center;
  font-size: 150%;
  padding-right: 30px;
  display: inlint-block;
  ${({ color }) =>
    color &&
    `
      color: ${color}
    `};
  ${({ borderColor }) =>
    borderColor &&
    `
      text-shadow:
        1px   0    1px ${borderColor},
        0     1px  1px ${borderColor},
        -1px  0    1px ${borderColor},
        0    -1px  1px ${borderColor};
    `};
`;

const textScale = scaleQuantize(
  [0, 70, 80],
  ['Низкий уровень', 'Средний уровень', 'Высокий уровень']
);

interface PropTypes {
  value: number;
  color: string;
  borderColor: string;
}

export const TextIndicator: React.FC<PropTypes> = ({
  value,
  color,
  borderColor,
}) => {
  return (
    <StyledDiv color={color} borderColor={borderColor}>
      {textScale(value)}
    </StyledDiv>
  );
};
