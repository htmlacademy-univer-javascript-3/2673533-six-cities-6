import { createSlice } from '@reduxjs/toolkit';
import { OfferByIdData } from '../../types/state';
import { NameSpace } from '../../const';
import { fetchOfferByIdAction } from '../api-actions';

const initialState: OfferByIdData = {
  offerById: null,
  isOfferByIdDataLoading: false,
  hasError: false,
  isNotFound: false,
};

export const offerByIdData = createSlice({
  name: NameSpace.OfferByIdData,
  initialState,
  reducers: {
    clearOfferById: (state) => {
      state.offerById = null;
    },
    clearNotFound: (state) => {
      state.isNotFound = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isOfferByIdDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action) => {
        state.offerById = action.payload;
        state.isOfferByIdDataLoading = false;
      })
      .addCase(fetchOfferByIdAction.rejected, (state, action) => {
        state.isOfferByIdDataLoading = false;
        state.hasError = true;
        state.isNotFound = action.payload === 404;
      });
  }
});

export const {clearOfferById, clearNotFound} = offerByIdData.actions;
