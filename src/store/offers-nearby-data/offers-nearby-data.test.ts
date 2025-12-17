import { makeFakeOffer } from "../../utils/mocks";
import { fetchOffersNearbyAction } from "../api-actions";
import { clearOffersNearby, offersNearbyData } from "./offers-nearby-data";

describe('OffersNearbyData Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offersNearby: [makeFakeOffer('Paris')],
        isOffersNearbyDataLoading: true,
        hasError: true,
      };

      const result = offersNearbyData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offersNearby: [],
        isOffersNearbyDataLoading: false,
        hasError: false,
      };

      const result = offersNearbyData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should set "isOffersNearbyDataLoading" to "true", "hasError" to "false" with "fetchOffersNearbyAction.pending"', () => {
      const expectedState = {
        offersNearby: [],
        isOffersNearbyDataLoading: true,
        hasError: false,
      };

      const result = offersNearbyData.reducer(undefined, fetchOffersNearbyAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "offersNearby" to array with offersNearby, "isOffersNearbyDataLoading" to "false" with "fetchOffersNearbyAction.fulfilled"', () => {
      const mockOffersNearby = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
      const expectedState = {
        offersNearby: mockOffersNearby,
        isOffersNearbyDataLoading: false,
        hasError: false,
      };

      const result = offersNearbyData.reducer(undefined, fetchOffersNearbyAction.fulfilled(mockOffersNearby, '', ''));

      expect(result).toEqual(expectedState);
    });

    it('should set "isOffersNearbyDataLoading" to "false", "hasError" to "true" with "fetchOffersNearbyAction.rejected"', () => {
      const expectedState = {
        offersNearby: [],
        isOffersNearbyDataLoading: false,
        hasError: true,
      };

      const result = offersNearbyData.reducer(undefined, fetchOffersNearbyAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('offersNearbyProcess', () => {
    it('should clear "offersNearby" with "clearOffersNearby" action', () => {
      const initialState = {
        offersNearby: [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')],
        isOffersNearbyDataLoading: false,
        hasError: false,
      };
      const expectedState = {
        offersNearby: [],
        isOffersNearbyDataLoading: false,
        hasError: false,
      };

      const result = offersNearbyData.reducer(initialState, clearOffersNearby);

      expect(result).toEqual(expectedState);
    });
  });
});
