import { CityName } from '../../const';


type FavoritesLocationProps = {
  cityName: CityName;
}

function FavoritesLocation({ cityName }: FavoritesLocationProps): JSX.Element {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{cityName}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoritesLocation;
