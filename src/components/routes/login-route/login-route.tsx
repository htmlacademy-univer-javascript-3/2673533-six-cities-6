import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../../const';
import { useAppSelector } from '../../../hooks';
import LoadingScreen from '../../../pages/loading-screen/loading-screen';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../../store/user-process/selectors';

type LoginRouteProps = {
  children: JSX.Element;
}

function LoginRoute({children}: LoginRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked) {
    return <LoadingScreen />;
  }

  return (
    authorizationStatus === AuthorizationStatus.NoAuth
      ? children
      : <Navigate to={AppRoute.Main} />
  );
}

export default LoginRoute;
