import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoritesData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFavoritesAction, postFavoriteStatusAction } from '../api-actions';

const initialState: FavoritesData = {
  favorites: [],
  favoritesCount: 0,
  isFavoritesDataLoading: false,
  isFavoriteStatusUpdating: false,
  isStatusUpdateSuccess: null,
  hasError: false,
};

export const favoritesData = createSlice({
  name: NameSpace.FavoritesData,
  initialState,
  reducers: {
    addToFavoritesCount: (state, action: PayloadAction<number>) => {
      state.favoritesCount += action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesCount = action.payload.length;
        state.isFavoritesDataLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesDataLoading = false;
        state.hasError = true;
      })
      .addCase(postFavoriteStatusAction.pending, (state) => {
        state.isStatusUpdateSuccess = null;
        state.isFavoriteStatusUpdating = true;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state) => {
        state.isStatusUpdateSuccess = true;
        state.isFavoriteStatusUpdating = false;
      })
      .addCase(postFavoriteStatusAction.rejected, (state) => {
        state.isFavoriteStatusUpdating = false;
        state.isStatusUpdateSuccess = false;
      });
  }
});

export const {addToFavoritesCount} = favoritesData.actions;
