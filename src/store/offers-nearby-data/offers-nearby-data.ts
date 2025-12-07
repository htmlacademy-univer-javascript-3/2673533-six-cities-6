import { createSlice } from '@reduxjs/toolkit';
import { OffersNearbyData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchOffersNearbyAction } from '../api-actions';

const initialState: OffersNearbyData = {
  offersNearby: [],
  isOffersNearbyDataLoading: false,
  hasError: false,
};

export const offersNearbyData = createSlice({
  name: NameSpace.OffersNearbyData,
  initialState,
  reducers: {
    clearOffersNearby: (state) => {
      state.offersNearby = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersNearbyAction.pending, (state) => {
        state.isOffersNearbyDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.offersNearby = action.payload;
        state.isOffersNearbyDataLoading = false;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state) => {
        state.isOffersNearbyDataLoading = false;
        state.hasError = true;
      });
  }
});

export const {clearOffersNearby} = offersNearbyData.actions;
