import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCity, loadOffers, requireAuthorization, setOffersDataLoadingStatus } from './action';
import { Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';


const initialState: {
  city: string;
  offers: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
} = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
