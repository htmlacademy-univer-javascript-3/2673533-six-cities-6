import { filterOffersByCity } from '../../../cities-logic';
import { Offers } from '../../../types/offer';
import FavoriteCard from '../favorite-card/favorite-card';
import FavoritesLocation from '../favorites-location/favorites-location';

type FavoritesListByCityProps = {
  cityName: string;
  offers: Offers;
}

function FavoritesListByCity({ cityName, offers }: FavoritesListByCityProps): JSX.Element | null {
  const cityOffers = filterOffersByCity(offers, cityName);

  if (cityOffers.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <FavoritesLocation cityName={cityName} />
      <div className="favorites__places">
        {cityOffers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer} />
        ))}
      </div>
    </li>
  );
}

export default FavoritesListByCity;
