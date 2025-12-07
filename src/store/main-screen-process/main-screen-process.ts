import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_CITY, NameSpace, SortType } from '../../const';
import { MainScreenProcess } from '../../types/state';


const initialState: MainScreenProcess = {
  activeCity: INITIAL_CITY,
  activeSortType: SortType.Popular,
  activeOfferId: '',
};

export const mainScreenProcess = createSlice({
  name: NameSpace.MainScreen,
  initialState,
  reducers: {
    setActiveCity: (state, action: PayloadAction<string>) => {
      state.activeCity = action.payload;
    },
    setActiveSortType: (state, action: PayloadAction<SortType>) => {
      state.activeSortType = action.payload;
    },
    setActiveOfferId: (state, action: PayloadAction<string>) => {
      state.activeOfferId = action.payload;
    },
  },
});

export const {setActiveCity, setActiveSortType, setActiveOfferId} = mainScreenProcess.actions;
