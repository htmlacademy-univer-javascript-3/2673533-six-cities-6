import { SortType } from './const';
import { Offers } from './types/offer';

export const filterOffersByCity = (offersToFilter: Offers, cityName: string): Offers => offersToFilter.filter((offer) => offer.city.name === cityName);

export const sortOffers = (offers: Offers, sortType: SortType) => {
  const offersCopy = [...offers];

  switch (sortType) {
    case SortType.Popular:
      return offersCopy;
    case SortType.PriceHighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortType.PriceLowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortType.TopRatedFirst:
      return offersCopy.sort((a, b) => b.rating - a.rating);
  }
};
