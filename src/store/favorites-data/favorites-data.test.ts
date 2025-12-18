import { makeFakeOffer } from '../../utils/mocks';
import { fetchFavoritesAction, postFavoriteStatusAction } from '../api-actions';
import { addToFavoritesCount, favoritesData } from './favorites-data';

describe('FavoritesData Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        favorites: [makeFakeOffer('Paris')],
        favoritesCount: 1,
        isFavoritesDataLoading: true,
        isFavoriteStatusUpdating: true,
        isStatusUpdateSuccess: true,
        hasError: true,
      };

      const result = favoritesData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        hasError: false,
      };

      const result = favoritesData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should set "isFavoritesDataLoading" to "true", "hasError" to "false" with "fetchFavoritesAction.pending"', () => {
      const expectedState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: true,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        hasError: false,
      };

      const result = favoritesData.reducer(undefined, fetchFavoritesAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "favorites" to array with favorites, "isFavoritesDataLoading" to "false", "favoritesCount" to array length with "fetchFavoritesAction.fulfilled"', () => {
      const mockFavorites = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
      const expectedState = {
        favorites: mockFavorites,
        favoritesCount: mockFavorites.length,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        hasError: false,
      };

      const result = favoritesData.reducer(undefined, fetchFavoritesAction.fulfilled(mockFavorites, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set "isFavoritesDataLoading" to "false", "hasError" to "true" with "fetchFavoritesAction.rejected"', () => {
      const expectedState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        hasError: true,
      };

      const result = favoritesData.reducer(undefined, fetchFavoritesAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('postFavoriteStatusAction', () => {
    it('should set "isStatusUpdateSuccess" to "null", "isFavoriteStatusUpdating" to "true" with "postFavoriteStatusAction.pending"', () => {
      const expectedState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: true,
        isStatusUpdateSuccess: null,
        hasError: false,
      };

      const result = favoritesData.reducer(undefined, postFavoriteStatusAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "isStatusUpdateSuccess" to "true", "isFavoriteStatusUpdating" to "false" with "postFavoriteStatusAction.fulfilled"', () => {
      const expectedState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: true,
        hasError: false,
      };

      const result = favoritesData.reducer(undefined, postFavoriteStatusAction.fulfilled);

      expect(result).toEqual(expectedState);
    });

    it('should set "isStatusUpdateSuccess" to "false", "isFavoriteStatusUpdating" to "false" with "postFavoriteStatusAction.rejected"', () => {
      const expectedState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: false,
        hasError: false,
      };

      const result = favoritesData.reducer(undefined, postFavoriteStatusAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('favoritesProcess', () => {
    it('should add number to favorites count with "addToFavoritesCount" action', () => {
      const initialState = {
        favorites: [],
        favoritesCount: 0,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        hasError: false,
      };
      const numberToAdd = 10;
      const expectedState = {
        favorites: [],
        favoritesCount: 10,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        hasError: false,
      };

      const result = favoritesData.reducer(initialState, addToFavoritesCount(numberToAdd));

      expect(result).toEqual(expectedState);
    });
  });
});
