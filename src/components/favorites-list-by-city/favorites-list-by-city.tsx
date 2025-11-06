import { City } from "../../const";
import { Offers } from "../../types/offer";
import FavoriteCard from "../favorite-card/favorite-card";
import FavoritesLocation from "../favorites-location/favorites-location";

type FavoritesListByCityProps = {
  city: City;
  offers: Offers;
}

function FavoritesListByCity({ city, offers }: FavoritesListByCityProps): JSX.Element | null {
  const cityOffers = offers.filter(offer => offer.city === city);

  if (cityOffers.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <FavoritesLocation city={city} />
      <div className="favorites__places">
        {cityOffers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesListByCity;
