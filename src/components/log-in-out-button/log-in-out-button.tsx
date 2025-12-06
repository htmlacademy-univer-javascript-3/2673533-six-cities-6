import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

type LogInOutButtonProps = {
  authorizationStatus: AuthorizationStatus;
}

function LogInOutButton({ authorizationStatus }: LogInOutButtonProps): JSX.Element {
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const text = isAuth ? 'Sign out' : 'Sign in';
  const to = isAuth ? '#' : AppRoute.Login;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOnClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAuth) {
      evt.preventDefault();
      dispatch(logoutAction())
        .unwrap()
        .then(() => {
          navigate(AppRoute.Main);
        });
    }
  };

  return (
    <li className="header__nav-item">
      <Link className="header__nav-link" to={to} onClick={handleOnClick}>
        <span className="header__signout">{text}</span>
      </Link>
    </li>
  );
}

export default LogInOutButton;
