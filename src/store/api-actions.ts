import { AxiosError, AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { OfferFullDTO, Offers } from '../types/offer';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { AuthData } from '../types/auth-data';
import { UserFullData } from '../types/user-full-data';
import { dropToken, saveToken } from '../services/token';
import { Comments } from '../types/comment';
import { NewComment } from '../types/new-comment';
import { NewFavoriteStatus } from '../types/new-favorite-status';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comments, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchComments',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Comments>(APIRoute.Comments.replace(':id', offerId));
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffersNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.NearbyOffers.replace(':id', offerId));
    return data;
  },
);

export const fetchOfferByIdAction = createAsyncThunk<OfferFullDTO, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: number | undefined;
}>(
  'data/fetchOfferByIdAction',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<OfferFullDTO>(APIRoute.OfferById.replace(':id', offerId));
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue(undefined);
    }
  },
);

export const checkAuthAction = createAsyncThunk<UserFullData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserFullData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserFullData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserFullData>(APIRoute.Login, { email, password });
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    return data;
  },
);

export const postCommentAction = createAsyncThunk<void, NewComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/postComment',
  async ({ comment, rating, offerId }, { extra: api }) => {
    await api.post(APIRoute.Comments.replace(':id', offerId), { comment, rating });
  },
);

export const postFavoriteStatusAction = createAsyncThunk<void, NewFavoriteStatus, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/postFavoriteStatus',
  async ({ offerId, status }, { extra: api }) => {
    await api.post(APIRoute.FavoriteStatus.replace(':id', offerId).replace(':status', status.toString()));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
