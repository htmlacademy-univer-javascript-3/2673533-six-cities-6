import { NameSpace } from "../../const";
import { Offers } from "../../types/offer";
import { State } from "../../types/state";


export const getOffers = (state: State): Offers => state[NameSpace.OffersData].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isOffersDataLoading;
export const getOffersErrorStatus = (state: State): boolean => state[NameSpace.OffersData].hasError;
