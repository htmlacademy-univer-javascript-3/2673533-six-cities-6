import { makeFakeOffer } from '../../utils/mocks';
import { fetchOffersAction } from '../api-actions';
import { offersData } from './offers-data';

describe('OffersData Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offers: [makeFakeOffer('Paris')],
        isOffersDataLoading: true,
        hasError: true,
      };

      const result = offersData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offers: [],
        isOffersDataLoading: false,
        hasError: false,
      };

      const result = offersData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOffersAction', () => {
    it('should set "isOffersDataLoading" to "true", "hasError" to "false" with "fetchOffersAction.pending"', () => {
      const expectedState = {
        offers: [],
        isOffersDataLoading: true,
        hasError: false,
      };

      const result = offersData.reducer(undefined, fetchOffersAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "offers" to array with offers, "isOffersDataLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
      const mockOffers = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
      const expectedState = {
        offers: mockOffers,
        isOffersDataLoading: false,
        hasError: false,
      };

      const result = offersData.reducer(undefined, fetchOffersAction.fulfilled(mockOffers, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set "isOffersDataLoading" to "false", "hasError" to "true" with "fetchOffersAction.rejected"', () => {
      const expectedState = {
        offers: [],
        isOffersDataLoading: false,
        hasError: true,
      };

      const result = offersData.reducer(undefined, fetchOffersAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });
});
