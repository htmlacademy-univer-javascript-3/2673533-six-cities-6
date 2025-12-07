import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { fetchOffersAction } from '../api-actions';
import { OffersData } from '../../types/state';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
  hasError: false,
};

export const offersData = createSlice({
  name: NameSpace.OffersData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      });
  }
});
