import { createGlobalStyle } from 'styled-components';
import './montserrat/montserrat';
import './roboto/roboto';

const GlobalFonts = createGlobalStyle`

body {
  font-family: 'Roboto', sans-serif;
}
`;

export default GlobalFonts;
