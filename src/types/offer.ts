import { City } from "../const";

export type Offer = {
  id: number;
  imageSrc: string;
  price: number;
  rating: number;
  name: string;
  type: string;
  city: City;
  isPremium: boolean;
  isInBookmarks: boolean;
};

export type Offers = Offer[];