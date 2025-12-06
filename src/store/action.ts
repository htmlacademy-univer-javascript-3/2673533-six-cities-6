import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offer';
import { AuthorizationStatus } from '../const';

export const setCurrentCity = createAction<string>('cities/setCurrentCity');

export const loadOffers = createAction<Offers>('cities/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
