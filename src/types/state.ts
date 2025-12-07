import { AuthorizationStatus, SortType } from '../const.ts';
import { store } from '../store/index.ts';
import { OfferFullDTO, Offers } from './offer.ts';
import { Comments } from './comment.ts';
import { UserFullData } from './user-full-data.ts';

export type CommentsData = {
  comments: Comments;
  isCommentsDataLoading: boolean;
  hasError: boolean;
};

export type OffersData = {
  offers: Offers;
  isOffersDataLoading: boolean;
  hasError: boolean;
};

export type FavoritesData = {
  favorites: Offers;
  favoritesCount: number;
  isFavoritesDataLoading: boolean;
  isFavoriteStatusUpdating: boolean;
  isStatusUpdateSuccess: boolean | null;
  hasError: boolean;
};

export type OfferByIdData = {
  offerById: OfferFullDTO | null;
  isOfferByIdDataLoading: boolean;
  hasError: boolean;
};

export type OffersNearbyData = {
  offersNearby: Offers;
  isOffersNearbyDataLoading: boolean;
  hasError: boolean;
};

export type MainScreenProcess = {
  activeCity: string;
  activeSortType: SortType;
  activeOfferId: string;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserFullData | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
