import { offers, offersList } from "./mocks/offers";
import { Offer, OffersList } from "./types/offer";


export const fetchOffers = (): Offer[] => {
  return offers;
}

export const fetchOffersMainScreen = (): OffersList => {
  return offersList;
}

export const filterOffersByCity = (offers: Offer[], cityName: string): Offer[] => {
  return offers.filter(offer => offer.city.name === cityName);
};

export const filterOffersMainScreenByCity = (offers: OffersList, cityName: string): OffersList => {
  return offers.filter(offer => offer.city.name === cityName);
};

export const filterOffersByFavorite = (offers: OffersList): OffersList => {
  return offers.filter(offer => offer.isFavorite === true);
};

export const getOfferById = (offers: Offer[], offerId: string | undefined): Offer | undefined => {
  return offers.find(offer => offer.id == offerId);
}