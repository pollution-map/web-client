import { LoginPage } from 'src/pages/LoginPage';
import { MapPage } from 'src/pages/MapPage';
import { SingUpPage } from 'src/pages/SingUpPage';

export const privateRoutes = [
];
export const publicRoutes = [
  { path: '/pollutionmap', element: <MapPage />, exact: true },
  { path: '/login', element: <LoginPage />, exact: true },
  { path: '/singup', element: <SingUpPage />, exact: true },
];
