import { NameSpace } from "../../const";
import { makeFakeOfferById } from "../../utils/mocks";
import { getOfferById, getOfferByIdDataLoadingStatus, getOfferByIdErrorStatus, getOfferByIdNotFoundStatus } from "./selectors";

describe('OfferByIdData selectors', () => {
  const offerById = makeFakeOfferById();
  const state = {
    [NameSpace.OfferByIdData]: {
      offerById: offerById,
      isOfferByIdDataLoading: true,
      hasError: true,
      isNotFound: true,
    }
  };

  it('should return offerById from state', () => {
    const { offerById } = state[NameSpace.OfferByIdData];
    const result = getOfferById(state);
    expect(result).toEqual(offerById);
  });

  it('should return offerById data loading status', () => {
    const { isOfferByIdDataLoading } = state[NameSpace.OfferByIdData];
    const result = getOfferByIdDataLoadingStatus(state);
    expect(result).toBe(isOfferByIdDataLoading);
  });

  it('should return offerById error status from state', () => {
    const { hasError } = state[NameSpace.OfferByIdData];
    const result = getOfferByIdErrorStatus(state);
    expect(result).toBe(hasError);
  });

  it('should return offerById not-found status from state', () => {
    const { isNotFound } = state[NameSpace.OfferByIdData];
    const result = getOfferByIdNotFoundStatus(state);
    expect(result).toBe(isNotFound);
  });
});
