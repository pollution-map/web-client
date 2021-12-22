import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'src/index.css';
import { RootStoreProvider } from 'src/store/RootStoreContext';
import GlobalFonts from './fonts/globalFonts';
import { privateRoutes, publicRoutes } from './router';

const App = () => {
  // ЗАГЛУШКА
  const [isAuth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <RootStoreProvider>
        <GlobalFonts />
        {!isAuth ? (
          <Routes>
            {publicRoutes.map((r) => (
              <Route
                key={r.path}
                element={r.element}
                path={r.path}
                exact={r.exact}
              />
            ))}
            <Route path="*" element={publicRoutes[0].element} />
          </Routes>
        ) : (
          <Routes>
            {privateRoutes.map((r) => (
              <Route
                key={r.path}
                element={r.element}
                path={r.path}
                exact={r.exact}
              />
            ))}
            <Route path="*" element={publicRoutes[0].element} />
          </Routes>
        )}
      </RootStoreProvider>
    </BrowserRouter>
  );
};

export default App;
