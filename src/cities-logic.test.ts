import { SortType } from './const';
import { filterOffersByCity, sortOffers, checkPassword } from './cities-logic';
import { OfferDTO } from './types/offer';

// Mock данные для тестов
const createMockOffer = (city: string, price: number, rating: number, id?: string): OfferDTO => ({
  id: id || '1',
  title: 'Test Offer',
  type: 'apartment',
  price,
  city: {
    name: city,
    location: { latitude: 0, longitude: 0, zoom: 10 }
  },
  location: { latitude: 0, longitude: 0, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  rating,
  previewImage: 'test.jpg'
});

describe('filterOffersByCity', () => {
  const mockOffers = [
    createMockOffer('Paris', 100, 4.5, '1'),
    createMockOffer('Amsterdam', 150, 4.0, '2'),
    createMockOffer('Paris', 200, 4.8, '3'),
    createMockOffer('Cologne', 120, 3.5, '4'),
  ];

  it('should return only offers for specified city', () => {
    const result = filterOffersByCity(mockOffers, 'Paris');
    const expectedResult = [mockOffers[0], mockOffers[2]];

    expect(result).toEqual(expectedResult);
  });

  it('should return empty array when no offers for city', () => {
    const result = filterOffersByCity(mockOffers, 'Brussel');

    expect(result).toEqual([]);
  });

  it('should handle empty offers array', () => {
    const result = filterOffersByCity([], 'Paris');

    expect(result).toEqual([]);
  });
});

describe('sortOffers', () => {
  const mockOffers = [
    createMockOffer('Paris', 300, 4.8, '1'),
    createMockOffer('Paris', 100, 3.9, '2'),
    createMockOffer('Paris', 200, 4.2, '3'),
    createMockOffer('Paris', 150, 4.5, '4'),
  ];

  it('should return offers as is for Popular sort type', () => {
    const result = sortOffers(mockOffers, SortType.Popular);
    const expectedResult = [mockOffers[0], mockOffers[1], mockOffers[2], mockOffers[3]];

    expect(result).not.toBe(mockOffers);
    expect(result).toEqual(expectedResult);
  });

  it('should sort by price high to low', () => {
    const result = sortOffers(mockOffers, SortType.PriceHighToLow);
    const expectedResult = [mockOffers[0], mockOffers[2], mockOffers[3], mockOffers[1]];

    expect(result).not.toBe(mockOffers);
    expect(result).toEqual(expectedResult);
  });

  it('should sort by price low to high', () => {
    const result = sortOffers(mockOffers, SortType.PriceLowToHigh);
    const expectedResult = [mockOffers[1], mockOffers[3], mockOffers[2], mockOffers[0]];

    expect(result).not.toBe(mockOffers);
    expect(result).toEqual(expectedResult);
  });

  it('should sort by rating', () => {
    const result = sortOffers(mockOffers, SortType.TopRatedFirst);
    const expectedResult = [mockOffers[0], mockOffers[3], mockOffers[2], mockOffers[1]];

    expect(result).not.toBe(mockOffers);
    expect(result).toEqual(expectedResult);
  });

  it('should handle empty array', () => {
    const result = sortOffers([], SortType.PriceHighToLow);

    expect(result).toEqual([]);
  });
});

describe('checkPassword', () => {
  it('should return true for valid password with letters and digits', () => {
    expect(checkPassword('password123')).toBe(true);
    expect(checkPassword('123password')).toBe(true);
    expect(checkPassword('pass123word')).toBe(true);
    expect(checkPassword('PASSWORD123')).toBe(true);
    expect(checkPassword('123PASSWORD')).toBe(true);
    expect(checkPassword('PaSsWoRd123')).toBe(true);
  });

  it('should return false for password without letters', () => {
    expect(checkPassword('12345678')).toBe(false);
    expect(checkPassword('123')).toBe(false);
  });

  it('should return false for password without digits', () => {
    expect(checkPassword('password')).toBe(false);
    expect(checkPassword('PASSWORD')).toBe(false);
    expect(checkPassword('abc')).toBe(false);
  });

  it('should return false for empty password', () => {
    expect(checkPassword('')).toBe(false);
    expect(checkPassword(undefined)).toBe(false);
  });

  it('should return false for whitespace-only password', () => {
    expect(checkPassword('   ')).toBe(false);
    expect(checkPassword(' \t\n ')).toBe(false);
  });
});
