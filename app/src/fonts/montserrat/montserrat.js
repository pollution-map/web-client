import { createGlobalStyle } from 'styled-components';
import MontserratW from './montserrat-v15-latin-regular.woff';
import MontserratW2 from './montserrat-v15-latin-regular.woff2';

const Montserrat = createGlobalStyle`

@font-face {
  font-family: 'Montserrat';
  src: url(${MontserratW2}) format('woff2'),
       url(${MontserratW}) format('woff');
}
`;

export default Montserrat;
