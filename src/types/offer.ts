import { City } from './city';
import { Host } from './host';
import { Location } from './location';

type BaseOfferDTO = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type OfferDTO = BaseOfferDTO & {
  previewImage: string;
};

export type OfferFullDTO = BaseOfferDTO & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

export type Offers = OfferDTO[];
