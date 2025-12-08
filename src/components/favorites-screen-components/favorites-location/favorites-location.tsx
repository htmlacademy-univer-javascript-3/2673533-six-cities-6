import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { setActiveCity } from '../../../store/main-screen-process/main-screen-process';

type FavoritesLocationProps = {
  cityName: string;
}

function FavoritesLocation({ cityName }: FavoritesLocationProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(setActiveCity(cityName));
  };

  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Main} onClick={handleOnClick}>
          <span>{cityName}</span>
        </Link>
      </div>
    </div>
  );
}

export default FavoritesLocation;
