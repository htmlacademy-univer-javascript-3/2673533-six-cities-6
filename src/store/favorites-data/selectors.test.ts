import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getFavorites, getFavoritesCount, getFavoritesDataLoadingStatus, getFavoritesErrorStatus, getFavoriteStatusChecked, getFavoriteStatusUpdatingStatus } from './selectors';

describe('FavoritesData selectors', () => {
  const mockFavorites = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
  const state = {
    [NameSpace.FavoritesData]: {
      favorites: mockFavorites,
      favoritesCount: 3,
      isFavoritesDataLoading: true,
      isFavoriteStatusUpdating: true,
      isStatusUpdateSuccess: true,
      hasError: true,
    }
  };

  it('should return favorites from state', () => {
    const { favorites } = state[NameSpace.FavoritesData];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });

  it('should return favorites data loading status', () => {
    const { isFavoritesDataLoading } = state[NameSpace.FavoritesData];
    const result = getFavoritesDataLoadingStatus(state);
    expect(result).toBe(isFavoritesDataLoading);
  });

  it('should return favorites error status from state', () => {
    const { hasError } = state[NameSpace.FavoritesData];
    const result = getFavoritesErrorStatus(state);
    expect(result).toBe(hasError);
  });

  it('should return favorites count from state', () => {
    const { favoritesCount } = state[NameSpace.FavoritesData];
    const result = getFavoritesCount(state);
    expect(result).toBe(favoritesCount);
  });

  it('should return favorites-status updating status from state', () => {
    const { isFavoriteStatusUpdating } = state[NameSpace.FavoritesData];
    const result = getFavoriteStatusUpdatingStatus(state);
    expect(result).toBe(isFavoriteStatusUpdating);
  });

  it('should return favorites-status update success status from state', () => {
    const { isStatusUpdateSuccess } = state[NameSpace.FavoritesData];
    const result = getFavoriteStatusChecked(state);
    expect(result).toBe(isStatusUpdateSuccess);
  });
});
