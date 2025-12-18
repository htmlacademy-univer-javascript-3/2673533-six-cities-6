import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import FavoritesListByCity from './favorites-list-by-city';
import { makeFakeOffer } from '../../../utils/mocks';

vi.mock('../favorite-card/favorite-card', () => ({
  default: function MockFavoriteCard({ offer }: any): JSX.Element {
    return (
      <article data-testid={`mock-favorite-card-${offer.id}`}>FavoriteCard</article>
    );
  }
}));

vi.mock('../favorites-location/favorites-location', () => ({
  default: function MockFavoritesLocation(): JSX.Element {
    return (
      <div data-testid="mock-favorites-location">FavoritesLocation</div>
    );
  }
}));

describe('Component: FavoritesListByCity', () => {
  const mockParisOffers = [
    makeFakeOffer('Paris'),
    makeFakeOffer('Paris'),
    makeFakeOffer('Paris'),
  ];
  
  const mockAmsterdamOffers = [
    makeFakeOffer('Amsterdam'),
  ];
  
  const mixedOffers = [...mockParisOffers, ...mockAmsterdamOffers];

  it('should render correctly with offers for the city', () => {
    render(<FavoritesListByCity cityName="Paris" offers={mixedOffers} />);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByTestId('mock-favorites-location')).toBeInTheDocument();

    const cards = screen.getAllByTestId(/mock-favorite-card-/);
    expect(cards).toHaveLength(3);

    mockParisOffers.forEach(offer => {
      expect(screen.getByTestId(`mock-favorite-card-${offer.id}`)).toBeInTheDocument();
    });

    mockAmsterdamOffers.forEach(offer => {
      expect(screen.queryByTestId(`mock-favorite-card-${offer.id}`)).not.toBeInTheDocument();
    });
  });
});
