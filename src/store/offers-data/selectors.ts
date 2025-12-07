import { createSelector } from "@reduxjs/toolkit";
import { NameSpace } from "../../const";
import { Offers } from "../../types/offer";
import { State } from "../../types/state";
import { getActiveCity, getActiveSortType } from "../main-screen-process/selectors";
import { filterOffersByCity, sortOffers } from "../../cities-logic";


export const getOffers = (state: State): Offers => state[NameSpace.OffersData].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.OffersData].isOffersDataLoading;
export const getOffersErrorStatus = (state: State): boolean => state[NameSpace.OffersData].hasError;

export const selectOffersByCity = createSelector(
  [getOffers, getActiveCity],
  (offers, city) => filterOffersByCity(offers, city)
);

export const selectSortedOffersByCity = createSelector(
  [selectOffersByCity, getActiveSortType],
  (filteredOffers, sortType) => sortOffers(filteredOffers, sortType)
);
