import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hooks';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import Email from '../email/email';
import LogInOutButton from '../log-in-out-button/log-in-out-button';

function HeaderNav(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth && <Email />}
        <LogInOutButton authorizationStatus={authorizationStatus} />
      </ul>
    </nav>
  );
}

export default HeaderNav;
