import { createAction } from '@reduxjs/toolkit';
import { OfferFullDTO, Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const setCurrentCity = createAction<string>('data/setCurrentCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadCurrentOffer = createAction<OfferFullDTO>('data/loadCurrentOffer');

export const clearCurrentOffer = createAction('data/clearCurrentOffer');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setCurrentOfferLoadingStatus = createAction<boolean>('data/setCurrentOfferLoadingStatus');
