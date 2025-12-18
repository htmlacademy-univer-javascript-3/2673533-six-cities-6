import faker from 'faker';
import { AuthorizationStatus, SortType } from '../const';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { OfferDTO, OfferFullDTO } from '../types/offer';
import { Comment } from '../types/comment';
import { UserFullData } from '../types/user-full-data';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeOfferById = (): OfferFullDTO => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.random.arrayElement(['apartment', 'house', 'room', 'hotel']),
  price: faker.datatype.number({ min: 50, max: 1000 }),
  city: {
    name: faker.address.city(),
    location: {
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      zoom: faker.datatype.number({ min: 10, max: 15 }),
    }
  },
  location: {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number({ min: 10, max: 15 }),
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
  description: faker.lorem.paragraph(),
  bedrooms: faker.datatype.number({ min: 1, max: 5 }),
  goods: faker.random.arrayElements(
    ['Wi-Fi', 'Kitchen', 'Heating', 'Washing machine', 'TV', 'Parking', 'Air conditioning', 'Elevator'],
    faker.datatype.number({ min: 3, max: 8 })
  ),
  host: {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  images: Array.from({ length: faker.datatype.number({ min: 3, max: 10 }) },
    () => faker.image.imageUrl()
  ),
  maxAdults: faker.datatype.number({ min: 1, max: 6 })
});

export const makeFakeOffer = (city: string): OfferDTO => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(3),
  type: faker.random.arrayElement(['apartment', 'house', 'room', 'hotel']),
  price: faker.datatype.number({ min: 50, max: 1000 }),
  city: {
    name: city,
    location: {
      latitude: parseFloat(faker.address.latitude()),
      longitude: parseFloat(faker.address.longitude()),
      zoom: faker.datatype.number({ min: 10, max: 15 }),
    }
  },
  location: {
    latitude: parseFloat(faker.address.latitude()),
    longitude: parseFloat(faker.address.longitude()),
    zoom: faker.datatype.number({ min: 10, max: 15 }),
  },
  isFavorite: faker.datatype.boolean(),
  isPremium: faker.datatype.boolean(),
  rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
  previewImage: faker.image.imageUrl()
});

export const makeFakeComment = (): Comment => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  user: {
    name: faker.name.findName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  comment: faker.lorem.paragraphs(1),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeUserData = (): UserFullData => ({
  name: faker.name.findName(),
  avatarUrl: faker.image.avatar(),
  isPro: faker.datatype.boolean(),
  email: faker.internet.email(),
  token: faker.datatype.uuid()
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  OFFERS_DATA: {offers: [], isOffersDataLoading: false, hasError: false},
  OFFERS_BY_ID_DATA: {offerById: null, isOfferByIdDataLoading: false, hasError: false, isNotFound: false},
  OFFERS_NEARBY_DATA: {offersNearby: [], isOffersNearbyDataLoading: false, hasError: false},
  COMMENTS_DATA: {comments: [], isCommentsDataLoading: false, hasError: false},
  FAVORITES_DATA: {favorites: [], isFavoritesDataLoading: false, isFavoriteStatusUpdating: false, isStatusUpdateSuccess: null, favoritesCount: 0, hasError: false},
  MAIN_SCREEN: {activeCity: 'Paris', activeOfferId: '', activeSortType: SortType.Popular},
  USER: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null },
  ...initialState ?? {},
});
