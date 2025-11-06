import { City } from '../const';
import { Offers } from '../types/offer';

export const offers: Offers = [
  {
    id: 1,
    imageSrc: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    city: City.Amsterdam,
    isPremium: true,
    isInBookmarks: false,
  },
  {
    id: 2,
    imageSrc: 'img/room.jpg',
    price: 80,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Room',
    city: City.Brussels,
    isPremium: false,
    isInBookmarks: true,
  },
  {
    id: 3,
    imageSrc: 'img/apartment-02.jpg',
    price: 132,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    city: City.Cologne,
    isPremium: false,
    isInBookmarks: false,
  },
  {
    id: 4,
    imageSrc: 'img/apartment-03.jpg',
    price: 180,
    rating: 100,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    city: City.Dusseldorf,
    isPremium: true,
    isInBookmarks: true,
  },
]
