import { createReducer } from "@reduxjs/toolkit";
import { setOffers, setCurrentCity, setOffersMainScreen } from "./action";
import { Offer, OffersList } from "../types/offer";
import { fetchOffers, fetchOffersMainScreen } from "../cities-logic";


const initialState: {
  city: string;
  offersMainScreen: OffersList;
  offers: Offer[];
} = {
  city: "Paris",
  offersMainScreen: fetchOffersMainScreen(),
  offers: fetchOffers(),
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffersMainScreen, (state) => {
      state.offersMainScreen = fetchOffersMainScreen();
    })
    .addCase(setOffers, (state) => {
      state.offers = fetchOffers();
    });
});

export {reducer};