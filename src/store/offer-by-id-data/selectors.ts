import { NameSpace } from '../../const';
import { OfferFullDTO } from '../../types/offer';
import { State } from '../../types/state';


export const getOfferById = (state: Pick<State, NameSpace.OfferByIdData>): OfferFullDTO | null => state[NameSpace.OfferByIdData].offerById;
export const getOfferByIdDataLoadingStatus = (state: Pick<State, NameSpace.OfferByIdData>): boolean => state[NameSpace.OfferByIdData].isOfferByIdDataLoading;
export const getOfferByIdErrorStatus = (state: Pick<State, NameSpace.OfferByIdData>): boolean => state[NameSpace.OfferByIdData].hasError;
export const getOfferByIdNotFoundStatus = (state: Pick<State, NameSpace.OfferByIdData>): boolean => state[NameSpace.OfferByIdData].isNotFound;
