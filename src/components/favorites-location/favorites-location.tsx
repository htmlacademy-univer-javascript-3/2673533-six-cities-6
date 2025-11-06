type FavoritesLocationProps = {
  city: string;
}

function FavoritesLocation({ city }: FavoritesLocationProps): JSX.Element {
  return (
    <div className="favorites__locations locations locations--current">
      <div className="locations__item">
        <a className="locations__item-link" href="#">
          <span>{city}</span>
        </a>
      </div>
    </div>
  );
}

export default FavoritesLocation;
