import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferFullDTO, Offers } from '../types/offer';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadCurrentOffer, loadOffers, requireAuthorization, setCurrentOfferLoadingStatus, setOffersDataLoadingStatus, setUserEmail } from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';

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
      await api.get(APIRoute.Login);
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
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUserEmail(data.email));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
