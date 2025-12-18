import { NameSpace } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import { getOffersNearby, getOffersNearbyDataLoadingStatus, getOffersNearbyErrorStatus } from './selectors';

describe('OffersNearbyData selectors', () => {
  const mockOffersNearby = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne'),];
  const state = {
    [NameSpace.OffersNearbyData]: {
      offersNearby: mockOffersNearby,
      isOffersNearbyDataLoading: false,
      hasError: false,
    }
  };

  it('should return offersNearby from state', () => {
    const { offersNearby } = state[NameSpace.OffersNearbyData];
    const result = getOffersNearby(state);
    expect(result).toEqual(offersNearby);
  });

  it('should return offersNearby data loading status', () => {
    const { isOffersNearbyDataLoading } = state[NameSpace.OffersNearbyData];
    const result = getOffersNearbyDataLoadingStatus(state);
    expect(result).toBe(isOffersNearbyDataLoading);
  });

  it('should return offersNearby error status from state', () => {
    const { hasError } = state[NameSpace.OffersNearbyData];
    const result = getOffersNearbyErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
