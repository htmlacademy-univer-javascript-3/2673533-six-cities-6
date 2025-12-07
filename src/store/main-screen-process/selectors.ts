import { NameSpace, SortType } from "../../const";
import { State } from "../../types/state";

export const getActiveCity = (state: State): string => state[NameSpace.MainScreen].activeCity;
export const getActiveOfferId = (state: State): string => state[NameSpace.MainScreen].activeOfferId;
export const getActiveSortType = (state: State): SortType => state[NameSpace.MainScreen].activeSortType;
