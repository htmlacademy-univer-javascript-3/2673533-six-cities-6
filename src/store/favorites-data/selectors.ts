import { NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getFavorites = (state: State): Offers => state[NameSpace.FavoritesData].favorites;
export const getFavoritesCount = (state: State): number => state[NameSpace.FavoritesData].favoritesCount;
export const getFavoritesDataLoadingStatus = (state: State): boolean => state[NameSpace.FavoritesData].isFavoritesDataLoading;
export const getFavoritesErrorStatus = (state: State): boolean => state[NameSpace.FavoritesData].hasError;
