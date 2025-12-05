import { offers, offersList } from './mocks/offers';
import { Offer, OffersList } from './types/offer';


export const fetchOffers = (): Offer[] => offers;

export const fetchOffersMainScreen = (): OffersList => offersList;

export const filterOffersByCity = (offersToFilter: Offer[], cityName: string): Offer[] => offersToFilter.filter((offer) => offer.city.name === cityName);

export const filterOffersMainScreenByCity = (offersToFilter: OffersList, cityName: string): OffersList => offersToFilter.filter((offer) => offer.city.name === cityName);

export const filterOffersByFavorite = (offersToFilter: OffersList): OffersList => offersToFilter.filter((offer) => offer.isFavorite === true);

export const getOfferById = (offersToSearch: Offer[], offerId: string | undefined): Offer | undefined => offersToSearch.find((offer) => offer.id === offerId);
