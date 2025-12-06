import { createAction } from '@reduxjs/toolkit';
import { OffersList } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const setCurrentCity = createAction<string>('cities/setCurrentCity');

export const loadOffersMainScreen = createAction<OffersList>('cities/loadOffersMainScreen');

export const setOffers = createAction('cities/setOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
