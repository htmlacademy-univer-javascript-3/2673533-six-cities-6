import { filterOffersByCity, sortOffers } from "../../cities-logic";
import { NameSpace, SortType } from "../../const";
import { makeFakeOffer } from "../../utils/mocks";
import { getOffers, getOffersDataLoadingStatus, getOffersErrorStatus, selectOffersByCity, selectSortedOffersByCity } from "./selectors";
import * as citiesLogic from '../../cities-logic.ts'

describe('OffersData selectors', () => {
  const offers = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Paris')];

  describe('normal selectors', () => {
    const state = {
      [NameSpace.OffersData]: {
        offers: offers,
        isOffersDataLoading: true,
        hasError: true,
      }
    };

    it('should return offers from state', () => {
      const { offers } = state[NameSpace.OffersData];
      const result = getOffers(state);
      expect(result).toEqual(offers);
    });

    it('should return offers data loading status', () => {
      const { isOffersDataLoading } = state[NameSpace.OffersData];
      const result = getOffersDataLoadingStatus(state);
      expect(result).toBe(isOffersDataLoading);
    });

    it('should return offers error status from state', () => {
      const { hasError } = state[NameSpace.OffersData];
      const result = getOffersErrorStatus(state);
      expect(result).toBe(hasError);
    });
  });

  describe('memoized selectors', () => {
    const firstState = {
      [NameSpace.OffersData]: {
        offers: offers,
        isOffersDataLoading: false,
        hasError: false,
      },
      [NameSpace.MainScreen]: {
        activeCity: 'Paris',
        activeSortType: SortType.PriceLowToHigh,
        activeOfferId: '',
      }
    };

    describe('selectOffersByCity', () => {
      const secondState = {
        ...firstState,
        [NameSpace.MainScreen]: {
          ...firstState[NameSpace.MainScreen],
          activeCity: 'Cologne',
        }
      };

      it('should memoize results', () => {
        const filterSpy = vi.spyOn(citiesLogic, 'filterOffersByCity');
        const result1 = selectOffersByCity(firstState);
        const result2 = selectOffersByCity(firstState);
        expect(filterSpy).toBeCalledTimes(1);
        expect(result1).toBe(result2);
        filterSpy.mockRestore();
      });

      it('should filter offers by active city', () => {
        const result = selectOffersByCity(firstState);
        const expectedOffers = offers.filter(offer => offer.city.name === 'Paris');

        expect(result).toEqual(expectedOffers);
        expect(result).toHaveLength(expectedOffers.length);
      });

      it('should return empty array when no offers for city', () => {
        const result = selectOffersByCity(secondState);
        expect(result).toEqual([]);
      });
    });

    describe('selectSortedOffersByCity', () => {
      it('should memoize results', () => {
        const sortSpy = vi.spyOn(citiesLogic, 'sortOffers');
        const result1 = selectSortedOffersByCity(firstState);
        const result2 = selectSortedOffersByCity(firstState);
        expect(sortSpy).toBeCalledTimes(1);
        expect(result1).toBe(result2);
        sortSpy.mockRestore();
      });

      it('should return filtered and sorted offers', () => {
        const result = selectSortedOffersByCity(firstState);
        const filtered = filterOffersByCity(offers, 'Paris');
        const expected = sortOffers(filtered, SortType.PriceLowToHigh);
        expect(result).toEqual(expected);
      });
    });
  });
});
