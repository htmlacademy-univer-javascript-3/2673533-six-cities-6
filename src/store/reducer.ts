import { createReducer } from '@reduxjs/toolkit';
import { setOffers, setCurrentCity, loadOffersMainScreen, requireAuthorization } from './action';
import { Offer, OffersList } from '../types/offer';
import { fetchOffers, fetchOffersMainScreen } from '../cities-logic';
import { AuthorizationStatus } from '../const';


const initialState: {
  city: string;
  offersMainScreen: OffersList;
  offers: Offer[];
  authorizationStatus: AuthorizationStatus;
} = {
  city: 'Paris',
  offersMainScreen: fetchOffersMainScreen(),
  offers: fetchOffers(),
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffersMainScreen, (state, action) => {
      state.offersMainScreen = action.payload;
    })
    .addCase(setOffers, (state) => {
      state.offers = fetchOffers();
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
