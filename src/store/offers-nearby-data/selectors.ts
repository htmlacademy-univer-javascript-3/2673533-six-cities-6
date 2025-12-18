import { NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';


export const getOffersNearby = (state: Pick<State, NameSpace.OffersNearbyData>): Offers => state[NameSpace.OffersNearbyData].offersNearby;
export const getOffersNearbyDataLoadingStatus = (state: Pick<State, NameSpace.OffersNearbyData>): boolean => state[NameSpace.OffersNearbyData].isOffersNearbyDataLoading;
export const getOffersNearbyErrorStatus = (state: Pick<State, NameSpace.OffersNearbyData>): boolean => state[NameSpace.OffersNearbyData].hasError;
