import { City } from './city';

export type OfferMainScreen = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  }
  images: string[];
  maxAdults: number;
}

export type OfferNearby = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  }
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type OffersList = OfferMainScreen[];
export type OffersNearby = OfferNearby[];
