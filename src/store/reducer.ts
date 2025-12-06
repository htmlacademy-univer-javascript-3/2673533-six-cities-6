import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCity, loadOffers, requireAuthorization, setOffersDataLoadingStatus, setCurrentOfferLoadingStatus, clearCurrentOffer, loadCurrentOffer, setUserData, loadCurrentReviews, setCurrentReviewsLoadingStatus, clearCurrentReviews } from './action';
import { OfferFullDTO, Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { UserFullData } from '../types/user-full-data';
import { Reviews } from '../types/review';

const initialState: {
  city: string;
  offers: Offers;
  isOffersDataLoading: boolean;
  currentOffer: OfferFullDTO | null;
  isCurrentOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userData: UserFullData | null;
  currentReviews: Reviews;
  isCurrentReviewsDataLoading: boolean;
} = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  currentOffer: null,
  isCurrentOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  currentReviews: [],
  isCurrentReviewsDataLoading: false,
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
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(loadCurrentReviews, (state, action) => {
      state.currentReviews = action.payload;
    })
    .addCase(setCurrentReviewsLoadingStatus, (state, action) => {
      state.isCurrentReviewsDataLoading = action.payload;
    })
    .addCase(clearCurrentReviews, (state) => {
      state.currentReviews = [];
    });
});

export {reducer};
