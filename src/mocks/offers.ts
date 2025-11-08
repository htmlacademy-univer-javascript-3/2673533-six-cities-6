import { CityName } from '../const';
import { Offers } from '../types/offer';

export const offers: Offers = [
  {
    id: '1',
    previewImage: 'img/apartment-01.jpg',
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-small-03.jpg', 'img/apartment-03.jpg', 'img/apartment-small-04.jpg', 'img/room.jpg'],
    insideItems: ['Mirror', 'Cup', 'Table', 'Chair', 'Sofa', 'Book'],
    price: 120,
    rating: 80,
    name: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
    },
    isPremium: true,
    isInBookmarks: false,
  },
  {
    id: '2',
    previewImage: 'img/room.jpg',
    images: ['img/apartment-small-03.jpg', 'img/apartment-03.jpg', 'img/apartment-small-04.jpg'],
    insideItems: ['Table', '7 chairs', 'Brick wall'],
    price: 80,
    rating: 80,
    name: 'Wood and stone place',
    type: 'Room',
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
    },
    isPremium: false,
    isInBookmarks: true,
  },
  {
    id: '3',
    previewImage: 'img/apartment-02.jpg',
    images: ['img/apartment-03.jpg', 'img/apartment-small-04.jpg', 'img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg'],
    insideItems: ['TV', '2 Tables', 'Sofa', 'Carpet', 'Window'],
    price: 132,
    rating: 80,
    name: 'Canal View Prinsengracht',
    type: 'Apartment',
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
    },
    isPremium: false,
    isInBookmarks: false,
  },
  {
    id: '4',
    previewImage: 'img/apartment-03.jpg',
    images: ['img/studio-01.jpg'],
    insideItems: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'],
    price: 180,
    rating: 100,
    name: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    city: {
      name: CityName.Amsterdam,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
    },
    isPremium: true,
    isInBookmarks: true,
  },
];
