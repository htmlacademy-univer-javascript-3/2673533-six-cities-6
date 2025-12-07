import { createSlice } from '@reduxjs/toolkit';
import { FavoritesData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchFavoritesAction } from '../api-actions';

const initialState: FavoritesData = {
  favorites: [],
  favoritesCount: 0,
  isFavoritesDataLoading: false,
  hasError: false,
};

export const favoritesData = createSlice({
  name: NameSpace.FavoritesData,
  initialState,
  reducers: {},
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
      });
  }
});
