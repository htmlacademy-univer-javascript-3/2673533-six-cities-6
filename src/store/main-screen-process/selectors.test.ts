import { NameSpace, SortType } from "../../const";
import { getActiveCity, getActiveOfferId, getActiveSortType } from "./selectors";

describe('MainScreenProcess selectors', () => {
  const state = {
    [NameSpace.MainScreen]: {
      activeCity: 'Paris',
      activeSortType: SortType.Popular,
      activeOfferId: '123',
    }
  };

  it('should return activeCity from state', () => {
    const { activeCity } = state[NameSpace.MainScreen];
    const result = getActiveCity(state);
    expect(result).toEqual(activeCity);
  });

  it('should return activeSortType from state', () => {
    const { activeSortType } = state[NameSpace.MainScreen];
    const result = getActiveSortType(state);
    expect(result).toBe(activeSortType);
  });

  it('should return activeOfferId from state', () => {
    const { activeOfferId } = state[NameSpace.MainScreen];
    const result = getActiveOfferId(state);
    expect(result).toBe(activeOfferId);
  });
});
