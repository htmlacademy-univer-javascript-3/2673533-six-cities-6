import { NameSpace } from "../../const";
import { OfferFullDTO } from "../../types/offer";
import { State } from "../../types/state";


export const getOfferById = (state: State): OfferFullDTO | null => state[NameSpace.OfferByIdData].offerById;
export const getOfferByIdDataLoadingStatus = (state: State): boolean => state[NameSpace.OfferByIdData].isOfferByIdDataLoading;
export const getOfferByIdErrorStatus = (state: State): boolean => state[NameSpace.OfferByIdData].hasError;
