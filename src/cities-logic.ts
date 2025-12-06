import { Offers } from './types/offer';

export const filterOffersByCity = (offersToFilter: Offers, cityName: string): Offers => offersToFilter.filter((offer) => offer.city.name === cityName);

export const filterOffersByFavorite = (offersToFilter: Offers): Offers => offersToFilter.filter((offer) => offer.isFavorite === true);
