import { NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: Pick<State, NameSpace.FavoritesData>): Offers => state[NameSpace.FavoritesData].favorites;
export const getFavoritesCount = (state: Pick<State, NameSpace.FavoritesData>): number => state[NameSpace.FavoritesData].favoritesCount;
export const getFavoritesDataLoadingStatus = (state: Pick<State, NameSpace.FavoritesData>): boolean => state[NameSpace.FavoritesData].isFavoritesDataLoading;
export const getFavoritesErrorStatus = (state: Pick<State, NameSpace.FavoritesData>): boolean => state[NameSpace.FavoritesData].hasError;
export const getFavoriteStatusUpdatingStatus = (state: Pick<State, NameSpace.FavoritesData>): boolean => state[NameSpace.FavoritesData].isFavoriteStatusUpdating;
export const getFavoriteStatusChecked = (state: Pick<State, NameSpace.FavoritesData>): boolean | null => state[NameSpace.FavoritesData].isStatusUpdateSuccess;
