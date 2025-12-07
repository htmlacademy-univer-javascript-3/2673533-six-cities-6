import { NameSpace } from "../../const";
import { Offers } from "../../types/offer";
import { State } from "../../types/state";


export const getOffersNearby = (state: State): Offers => state[NameSpace.OffersNearbyData].offersNearby;
export const getOffersNearbyDataLoadingStatus = (state: State): boolean => state[NameSpace.OffersNearbyData].isOffersNearbyDataLoading;
export const getOffersNearbyErrorStatus = (state: State): boolean => state[NameSpace.OffersNearbyData].hasError;
