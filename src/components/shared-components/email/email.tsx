import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppSelector } from '../../../hooks';
import { getUserData } from '../../../store/user-process/selectors';

function Email(): JSX.Element {
  const userData = useAppSelector(getUserData);

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favourites}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
          <img src={userData?.avatarUrl} />
        </div>
        <span className="header__user-name user__name">{userData?.email}</span>
        <span className="header__favorite-count">3</span>
      </Link>
    </li>
  );
}

export default Email;
