import { NameSpace, SortType } from '../../const';
import { State } from '../../types/state';

export const getActiveCity = (state: Pick<State, NameSpace.MainScreen>): string => state[NameSpace.MainScreen].activeCity;
export const getActiveOfferId = (state: Pick<State, NameSpace.MainScreen>): string => state[NameSpace.MainScreen].activeOfferId;
export const getActiveSortType = (state: Pick<State, NameSpace.MainScreen>): SortType => state[NameSpace.MainScreen].activeSortType;
