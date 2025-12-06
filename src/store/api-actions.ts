import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferFullDTO, Offers } from '../types/offer';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { loadCurrentOffer, loadCurrentReviews, loadOffers, loadOffersNearby, redirectToRoute, requireAuthorization, setCurrentOfferLoadingStatus, setCurrentReviewsLoadingStatus, setOffersDataLoadingStatus, setOffersNearbyLoadingStatus, setUserData } from './action';
import { AuthData } from '../types/auth-data';
import { UserFullData } from '../types/user-full-data';
import { dropToken, saveToken } from '../services/token';
import { Reviews } from '../types/review';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setCurrentReviewsLoadingStatus(true));
    const {data} = await api.get<Reviews>(APIRoute.Comments.replace(':id', offerId));
    dispatch(setCurrentReviewsLoadingStatus(false));
    dispatch(loadCurrentReviews(data));
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOffersNearbyLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.NearbyOffers.replace(':id', offerId));
    dispatch(setOffersNearbyLoadingStatus(false));
    dispatch(loadOffersNearby(data));
  },
);

export const fetchOfferFullByIdAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferFullByIdAction',
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setCurrentOfferLoadingStatus(true));
    const {data} = await api.get<OfferFullDTO>(APIRoute.OfferById.replace(':id', offerId));
    dispatch(setCurrentOfferLoadingStatus(false));
    dispatch(loadCurrentOffer(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserFullData>(APIRoute.Login);
      dispatch(setUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserFullData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
