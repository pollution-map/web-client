import { createGlobalStyle } from 'styled-components';
import RobotoW from './roboto-v27-latin-regular.woff';
import RobotoW2 from './roboto-v27-latin-regular.woff2';

const Roboto = createGlobalStyle`

@font-face {
  font-family: 'Roboto';
  src: url(${RobotoW}) format('woff2'),
       url(${RobotoW2}) format('woff');
}
`;

export default Roboto;
