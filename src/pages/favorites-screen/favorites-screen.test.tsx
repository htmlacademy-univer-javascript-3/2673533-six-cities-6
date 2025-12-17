import { render, screen } from '@testing-library/react';
import FavoritesScreen from './favorites-screen';
import { vi } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <header data-testid="mock-header">Header</header>;
  }
}));

vi.mock('../../components/favorites-screen-components/favorites-list-by-city/favorites-list-by-city', () => ({
  default: function MockFavoritesListByCity({ cityName, offers }: { cityName: string; offers: any[] }) {
    return (
      <li data-testid={`favorites-list-${cityName.toLowerCase()}`}>
        Favorites in {cityName}: {offers.length} offers
      </li>
    );
  }
}));

vi.mock('../favorites-empty-screen/favorites-empty-screen', () => ({
  default: function MockFavoritesEmptyScreen(): JSX.Element {
    return <div data-testid="mock-favorites-empty">No favorites</div>;
  }
}));

vi.mock('../loading-screen/loading-screen', () => ({
  default: function MockLoadingScreen(): JSX.Element {
    return <div data-testid="mock-loading">Loading...</div>;
  }
}));

vi.mock('../error-screen/error-screen', () => ({
  default: function MockErrorScreen(): JSX.Element {
    return (
      <div data-testid="mock-error">Error Screen</div>
    );
  }
}));

describe('Screen: FavoritesScreen', () => {
  it('should render correctly with favorite offers', () => {
    const mockOffers = [makeFakeOffer('Paris'), makeFakeOffer('Cologne')];

    const initialState = makeFakeStore({
      FAVORITES_DATA: {
        favorites: mockOffers,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        favoritesCount: mockOffers.length,
        hasError: false,
      }
    });

    const { withStoreComponent } = withStore(<FavoritesScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list-paris')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list-cologne')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('should show loading screen when loading', () => {
    const initialState = makeFakeStore({
      FAVORITES_DATA: {
        favorites: [],
        isFavoritesDataLoading: true,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        favoritesCount: 0,
        hasError: false,
      }
    });

    const { withStoreComponent } = withStore(<FavoritesScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
  });

  it('should show error screen when hasError is true', () => {
    const initialState = makeFakeStore({
      FAVORITES_DATA: {
        favorites: [],
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        favoritesCount: 0,
        hasError: true,
      }
    });

    const { withStoreComponent } = withStore(<FavoritesScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-error')).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
  });

  it('should show empty screen when no favorites', () => {
    const initialState = makeFakeStore({
      FAVORITES_DATA: {
        favorites: [],
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: null,
        favoritesCount: 0,
        hasError: false,
      }
    });

    const { withStoreComponent } = withStore(<FavoritesScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-favorites-empty')).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
  });
});
