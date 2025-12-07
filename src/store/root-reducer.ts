import { combineReducers } from "@reduxjs/toolkit";
import { NameSpace } from "../const";
import { offersData } from "./offers-data/offers-data";
import { offerByIdData } from "./offer-by-id-data/offer-by-id-data";
import { offersNearbyData } from "./offers-nearby-data/offers-nearby-data";
import { commentsData } from "./comments-data/comments-data";
import { userProcess } from "./user-process/user-process";
import { mainScreenProcess } from "./main-screen-process/main-screen-process";


export const rootReducer = combineReducers({
  [NameSpace.OffersData]: offersData.reducer,
  [NameSpace.OfferByIdData]: offerByIdData.reducer,
  [NameSpace.OffersNearbyData]: offersNearbyData.reducer,
  [NameSpace.CommentsData]: commentsData.reducer,
  [NameSpace.MainScreen]: mainScreenProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
