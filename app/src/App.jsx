import 'src/index.css';
import { MapPage } from 'src/pages/MapPage';
import { RootStoreProvider } from 'src/store/RootStoreContext';
import GlobalFonts from './fonts/globalFonts';

const App = () => (
  <RootStoreProvider>
    <GlobalFonts />
    <MapPage />
  </RootStoreProvider>
);

export default App;
