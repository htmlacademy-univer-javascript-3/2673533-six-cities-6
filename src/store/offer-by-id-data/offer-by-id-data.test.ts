import { makeFakeOfferById } from '../../utils/mocks';
import { fetchOfferByIdAction } from '../api-actions';
import { clearNotFound, clearOfferById, offerByIdData } from './offer-by-id-data';

describe('OfferByIdData Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: true,
        hasError: true,
        isNotFound: true,
      };

      const result = offerByIdData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: false,
        hasError: false,
        isNotFound: false,
      };

      const result = offerByIdData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchOfferByIdAction', () => {
    it('should set "isOfferByIdDataLoading" to "true", "hasError" to "false" with "fetchOfferByIdAction.pending"', () => {
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: true,
        hasError: false,
        isNotFound: false,
      };

      const result = offerByIdData.reducer(undefined, fetchOfferByIdAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "offerById" to offer object, "isOfferByIdDataLoading" to "false" with "fetchOfferByIdAction.fulfilled"', () => {
      const mockOfferById = makeFakeOfferById();
      const expectedState = {
        offerById: mockOfferById,
        isOfferByIdDataLoading: false,
        hasError: false,
        isNotFound: false,
      };

      const result = offerByIdData.reducer(undefined, fetchOfferByIdAction.fulfilled(mockOfferById, '', ''));

      expect(result).toEqual(expectedState);
    });

    it('should set "isOfferByIdDataLoading" to "false", "hasError" to "true", "isNotFound" to "false" with "fetchOfferByIdAction.rejected" and status code !== 404', () => {
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: false,
        hasError: true,
        isNotFound: false,
      };

      const rejectedAction = fetchOfferByIdAction.rejected(new Error(''), '', '', 500);
      const result = offerByIdData.reducer(undefined, rejectedAction);

      expect(result).toEqual(expectedState);
    });

    it('should set "isOfferByIdDataLoading" to "false", "hasError" to "true", "isNotFound" to "true" with "fetchOfferByIdAction.rejected" and status code === 404', () => {
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: false,
        hasError: true,
        isNotFound: true,
      };

      const rejectedAction = fetchOfferByIdAction.rejected(new Error(''), '', '', 404);
      const result = offerByIdData.reducer(undefined, rejectedAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('offerByIdProcess', () => {
    it('should set "offerById" to null with "clearOfferById" action', () => {
      const initialState = {
        offerById: makeFakeOfferById(),
        isOfferByIdDataLoading: false,
        hasError: false,
        isNotFound: false,
      };
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: false,
        hasError: false,
        isNotFound: false,
      };

      const result = offerByIdData.reducer(initialState, clearOfferById);

      expect(result).toEqual(expectedState);
    });

    it('should set "isNotFound" to false with "clearNotFound" action', () => {
      const initialState = {
        offerById: null,
        isOfferByIdDataLoading: false,
        hasError: false,
        isNotFound: true,
      };
      const expectedState = {
        offerById: null,
        isOfferByIdDataLoading: false,
        hasError: false,
        isNotFound: false,
      };

      const result = offerByIdData.reducer(initialState, clearNotFound);

      expect(result).toEqual(expectedState);
    });
  });
});
