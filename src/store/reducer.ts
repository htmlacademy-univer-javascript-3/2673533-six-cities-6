import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCity, loadOffers, requireAuthorization, setOffersDataLoadingStatus, setCurrentOfferLoadingStatus, clearCurrentOffer, loadCurrentOffer } from './action';
import { OfferFullDTO, Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';


const initialState: {
  city: string;
  offers: Offers;
  isOffersDataLoading: boolean;
  currentOffer: OfferFullDTO | null;
  isCurrentOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
} = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
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
    .addCase(loadCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentOfferLoadingStatus, (state, action) => {
      state.isCurrentOfferLoading = action.payload;
    })
    .addCase(clearCurrentOffer, (state) => {
      state.currentOffer = null;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
