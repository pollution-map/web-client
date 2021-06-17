import { PolutionMap } from 'src/components/PolutionMap';
import { ModesProvider } from 'src/store/ModesContext';

export const MapPage = () => (
  <ModesProvider>
    <PolutionMap />
  </ModesProvider>
);
