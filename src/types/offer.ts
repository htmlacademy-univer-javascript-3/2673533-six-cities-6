import { City } from './city';


export type Offer = {
  id: string;
  previewImage: string;
  images: string[];
  insideItems: string[];
  price: number;
  rating: number;
  name: string;
  type: string;
  city: City;
  location: {
    latitude: number;
    longitude: number;
  }
  isPremium: boolean;
  isInBookmarks: boolean;
};

export type Offers = Offer[];
