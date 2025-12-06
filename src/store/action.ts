import { createAction } from '@reduxjs/toolkit';
import { OfferFullDTO, Offers } from '../types/offer';
import { AppRoute, AuthorizationStatus } from '../const';
import { UserFullData } from '../types/user-full-data';
import { Reviews } from '../types/review';

export const setCurrentCity = createAction<string>('data/setCurrentCity');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const loadCurrentOffer = createAction<OfferFullDTO>('data/loadCurrentOffer');

export const clearCurrentOffer = createAction('data/clearCurrentOffer');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserFullData>('user/setUserData');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setCurrentOfferLoadingStatus = createAction<boolean>('data/setCurrentOfferLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('cities/redirectToRoute');

export const loadCurrentReviews = createAction<Reviews>('data/loadCurrentReviews');

export const clearCurrentReviews = createAction('data/clearCurrentReviews');

export const setCurrentReviewsLoadingStatus = createAction<boolean>('data/setCurrentReviewsLoadingStatus');
