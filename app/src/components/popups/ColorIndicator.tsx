import styled from "styled-components";

export const ColorIndicator = styled.div<{ color: string }>`
  width: 100%;
  flex-basis: 100%;
  height: 8px;
  bottom: 0;
  background-color: ${(props) => props.color};
`;
