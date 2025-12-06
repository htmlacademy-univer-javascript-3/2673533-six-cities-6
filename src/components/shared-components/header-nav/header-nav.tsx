import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hooks';
import Email from '../email/email';
import LogInOutButton from '../log-in-out-button/log-in-out-button';

function HeaderNav(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

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
