import 'src/index.css';
import { MapPage } from 'src/pages/MapPage';
import { RootStoreProvider } from 'src/store/RootStoreContext';

const App = () => (
  <RootStoreProvider>
    <MapPage />
  </RootStoreProvider>
);

export default App;
