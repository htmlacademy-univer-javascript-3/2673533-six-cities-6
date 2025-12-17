import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import MainScreen from './main-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import { makeFakeOffer } from '../../utils/mocks';
import { AuthorizationStatus, SortType } from '../../const';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <header data-testid="mock-header">Header</header>;
  }
}));

vi.mock('../../components/shared-components/offer-list/offer-list', () => ({
  default: function MockOfferList({ offers, cardName, listName }: any): JSX.Element {
    return (
      <div data-testid={`mock-offer-list-${cardName}`}>
        {offers.length} offers in {listName}
      </div>
    );
  }
}));

vi.mock('../../components/shared-components/main-map/main-map', () => ({
  default: function MockMainMap({ cityName, className, offers }: any): JSX.Element {
    return (
      <div data-testid={`mock-map-${className}`}>
        Map for {cityName} with {offers.length} offers
      </div>
    );
  }
}));

vi.mock('../../components/main-screen-components/locations-list/locations-list', () => ({
  default: function MockLocationsList({ activeCity }: { activeCity: string }): JSX.Element {
    return <div data-testid="mock-locations-list">Active city: {activeCity}</div>;
  }
}));

vi.mock('../../components/main-screen-components/sort-variants/sort-variants', () => ({
  default: function MockSortVariants(): JSX.Element {
    return <div data-testid="mock-sort-variants">Sort variants</div>;
  }
}));

vi.mock('../main-empty-screen/main-empty-screen', () => ({
  default: function MockMainEmptyScreen({ activeCity }: { activeCity: string }): JSX.Element {
    return <div data-testid="mock-empty-screen">No offers in {activeCity}</div>;
  }
}));

vi.mock('../loading-screen/loading-screen', () => ({
  default: function MockLoadingScreen(): JSX.Element {
    return <div data-testid="mock-loading">Loading...</div>;
  }
}));

vi.mock('../error-screen/error-screen', () => ({
  default: function MockErrorScreen({ restarter }: { restarter: () => void }): JSX.Element {
    return (
      <div data-testid="mock-error">
        Error Screen
        <button onClick={restarter} data-testid="retry-button">Retry</button>
      </div>
    );
  }
}));

describe('Screen: MainScreen', () => {
  const mockOffers = [makeFakeOffer('Paris'), makeFakeOffer('Paris'), makeFakeOffer('Paris')];

  it('should show loading screen when offers are loading', () => {
    const initialState = makeFakeStore({
      OFFERS_DATA: {
        offers: [],
        isOffersDataLoading: true,
        hasError: false,
      }
    });

    const { withStoreComponent } = withStore(<MainScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-offer-list-cities')).not.toBeInTheDocument();
  });

  it('should show error screen when hasError is true', () => {
    const initialState = makeFakeStore({
      OFFERS_DATA: {
        offers: [],
        isOffersDataLoading: false,
        hasError: true,
      }
    });

    const { withStoreComponent } = withStore(<MainScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-error')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-offer-list-cities')).not.toBeInTheDocument();
  });

  it('should show empty screen when no offers for active city', () => {
    const initialState = makeFakeStore({
      OFFERS_DATA: {
        offers: [],
        isOffersDataLoading: false,
        hasError: false,
      }
    });

    const { withStoreComponent } = withStore(<MainScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-empty-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-offer-list-cities')).not.toBeInTheDocument();
  });

  it('should render correctly', () => {
    const initialState = makeFakeStore({
      OFFERS_DATA: {
        offers: mockOffers,
        isOffersDataLoading: false,
        hasError: false,
      },
      MAIN_SCREEN: {
        activeCity: 'Paris',
        activeOfferId: '',
        activeSortType: SortType.Popular,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
      }
    });

    const { withStoreComponent } = withStore(<MainScreen />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText(`${mockOffers.length} places to stay in Paris`)).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-locations-list')).toHaveTextContent('Active city: Paris');
    expect(screen.getByTestId('mock-sort-variants')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-list-cities')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-list-cities')).toHaveTextContent(`${mockOffers.length} offers`);
    expect(screen.getByTestId('mock-map-cities')).toBeInTheDocument();
    expect(screen.getByTestId('mock-map-cities')).toHaveTextContent(`Map for Paris with ${mockOffers.length} offers`);
  });
});
