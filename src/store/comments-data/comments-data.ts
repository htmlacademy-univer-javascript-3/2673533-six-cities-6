import { createSlice } from "@reduxjs/toolkit";
import { CommentsData } from "../../types/state";
import { NameSpace } from "../../const";
import { fetchCommentsAction } from "../api-actions";

const initialState: CommentsData = {
  comments: [],
  isCommentsDataLoading: false,
  hasError: false,
};

export const commentsData = createSlice({
  name: NameSpace.CommentsData,
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isCommentsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsDataLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isCommentsDataLoading = false;
        state.hasError = true;
      });
  }
});

export const {clearComments} = commentsData.actions;
