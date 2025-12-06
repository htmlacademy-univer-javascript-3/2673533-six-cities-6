import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const setCurrentCity = createAction<string>('data/setCurrentCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
