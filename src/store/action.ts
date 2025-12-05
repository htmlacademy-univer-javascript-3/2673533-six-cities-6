import { createAction } from "@reduxjs/toolkit";

export const setCurrentCity = createAction<string>('cities/setCurrentCity');

export const setOffersMainScreen = createAction('cities/setOffersMainScreen');

export const setOffers = createAction('cities/setOffers');