import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppSelector } from "../../hooks";

function Email(): JSX.Element {
  const email = useAppSelector((state) => state.userEmail);

  return (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favourites}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__user-name user__name">{email}</span>
        <span className="header__favorite-count">3</span>
      </Link>
    </li>
  );
}

export default Email;
