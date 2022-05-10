import { observer } from 'mobx-react-lite';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import 'src/index.css';
import { useStore } from 'src/store/RootStoreContext';
import GlobalFonts from './fonts/globalFonts';
import { MapRedactorPage } from './pages/MapRedactorPage';
import { privateRoutes, publicRoutes } from './router';

const App = () => {
  const { userStore } = useStore();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      userStore.checkAuth();
    }
  }, []);
  // console.log(`isAuth ${userStore.isAuth}`);
  return (
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <GlobalFonts />
        {!userStore.isAuth ? (
          <Routes>
            {publicRoutes.map((r) => (
              <Route key={r.path} element={r.element} path={r.path}>
                {/* {r.isParameters ? (
                  <Route element={r.element} path={`:${r.path.substr(1)}`} />
                ) : null} */}
              </Route>
            ))}
            <Route path="*" element={publicRoutes[0].element} />
            {/* <Outlet /> */}
          </Routes>
        ) : (
          <Routes>
            {privateRoutes.map((r) => (
              <Route key={r.path} element={r.element} path={r.path}>
                {/* {r.isParameters ? (
                  <Route element={r.element} path={`:${r.path.substr(1)}`} />
                ) : null} */}
              </Route>
            ))}
            <Route path="*" element={privateRoutes[0].element} />
            {/* <Outlet /> */}
          </Routes>
        )}
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default observer(App);
