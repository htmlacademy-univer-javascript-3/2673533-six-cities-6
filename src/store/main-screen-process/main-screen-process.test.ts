import { INITIAL_CITY, SortType } from '../../const';
import { mainScreenProcess, setActiveCity, setActiveOfferId, setActiveSortType } from './main-screen-process';

describe('MainScreenProcess Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        activeCity: 'Amsterdam',
        activeSortType: SortType.PriceHighToLow,
        activeOfferId: '123',
      };

      const result = mainScreenProcess.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action and undefined state', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        activeCity: INITIAL_CITY,
        activeSortType: SortType.Popular,
        activeOfferId: '',
      };

      const result = mainScreenProcess.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('checkSetters', () => {
    it('should set new city with "setActiveCity" action', () => {
      const initialState = {
        activeCity: 'Paris',
        activeSortType: SortType.Popular,
        activeOfferId: '',
      };
      const expectedState = {
        activeCity: 'Amsterdam',
        activeSortType: SortType.Popular,
        activeOfferId: '',
      };
      const newActiveCity = 'Amsterdam';

      const result = mainScreenProcess.reducer(initialState, setActiveCity(newActiveCity));

      expect(result).toEqual(expectedState);
    });

    it('should set new sorting type with "setActiveSortType" action', () => {
      const initialState = {
        activeCity: 'Paris',
        activeSortType: SortType.Popular,
        activeOfferId: '',
      };
      const expectedState = {
        activeCity: 'Paris',
        activeSortType: SortType.TopRatedFirst,
        activeOfferId: '',
      };
      const newActiveSortType = SortType.TopRatedFirst;

      const result = mainScreenProcess.reducer(initialState, setActiveSortType(newActiveSortType));

      expect(result).toEqual(expectedState);
    });

    it('should set new active offer id with "setActiveOfferId" action', () => {
      const initialState = {
        activeCity: 'Paris',
        activeSortType: SortType.Popular,
        activeOfferId: '',
      };
      const expectedState = {
        activeCity: 'Paris',
        activeSortType: SortType.Popular,
        activeOfferId: '123',
      };
      const newActiveOfferId = '123';

      const result = mainScreenProcess.reducer(initialState, setActiveOfferId(newActiveOfferId));

      expect(result).toEqual(expectedState);
    });
  });
});
