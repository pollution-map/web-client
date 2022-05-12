import { LoginPage } from 'src/pages/LoginPage';
import { MapPage } from 'src/pages/MapPage';
import { MapRedactorPage } from 'src/pages/MapRedactorPage';
import { MapViewingPage } from 'src/pages/MapViewingPage';
import { PersonalAccountPage } from 'src/pages/PersonalAccountPage';
import { RegistrationCompletedPage } from 'src/pages/RegistrationCompletedPage';
import { SingUpPage } from 'src/pages/SingUpPage';

export const baseRoutes = [
  { path: '/pollutionmap', element: <MapPage /> },
  { path: '/map-viewing/:id', element: <MapViewingPage /> },
];
// Последний элемент будет страницей по умолчанию!
export const privateRoutes = baseRoutes
  .concat([
    {
      path: '/map-redactor/:id',
      element: <MapRedactorPage />,
    },
    { path: '/person-alaccount', element: <PersonalAccountPage /> },
  ])
  .reverse();
export const publicRoutes = baseRoutes
  .concat([
    { path: '/singup', element: <SingUpPage /> },
    { path: '/registration-completed', element: <RegistrationCompletedPage /> },
    { path: '/login', element: <LoginPage /> },
  ])
  .reverse();
