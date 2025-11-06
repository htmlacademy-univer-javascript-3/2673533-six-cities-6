export type Offer = {
  id: number;
  imageSrc: string;
  price: number;
  rating: number;
  name: string;
  type: string;
  isPremium: boolean;
  isInBookmarks: boolean;
};

export type Offers = Offer[];