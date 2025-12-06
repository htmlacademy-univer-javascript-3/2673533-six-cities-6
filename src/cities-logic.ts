import { OfferFullDTO, Offers } from './types/offer';

export const filterOffersByCity = (offersToFilter: OfferFullDTO[], cityName: string): OfferFullDTO[] => offersToFilter.filter((offer) => offer.city.name === cityName);

export const filterOffersMainScreenByCity = (offersToFilter: Offers, cityName: string): Offers => offersToFilter.filter((offer) => offer.city.name === cityName);

export const filterOffersByFavorite = (offersToFilter: Offers): Offers => offersToFilter.filter((offer) => offer.isFavorite === true);

export const getOfferById = (offersToSearch: OfferFullDTO[], offerId: string | undefined): OfferFullDTO | undefined => offersToSearch.find((offer) => offer.id === offerId);
