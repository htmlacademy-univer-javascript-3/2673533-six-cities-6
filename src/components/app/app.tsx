import MainScreen from '../../pages/main-screen/main-screen';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../routes/private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoginRoute from '../routes/login-route/login-route';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={
          <MainScreen />
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <LoginRoute>
            <LoginScreen />
          </LoginRoute>
        }
      />
      <Route
        path={AppRoute.Offer}
        element={<OfferScreen />}
      />
      <Route
        path={AppRoute.Favourites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<NotFoundScreen />}
      />
    </Routes>
  );
}

export default App;
