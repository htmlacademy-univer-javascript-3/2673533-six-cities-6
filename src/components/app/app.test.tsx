import { MemoryHistory, createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/mocks';
import App from './app';

vi.mock('../../pages/main-screen/main-screen', () => ({
  default: function MockMainScreen(): JSX.Element {
    return <div data-testid='mock-main-screen'>MainScreen</div>;
  }
}));

vi.mock('../../pages/login-screen/login-screen', () => ({
  default: function MockLogInScreen(): JSX.Element {
    return <div data-testid='mock-log-in-screen'>LogInScreen</div>;
  }
}));

vi.mock('../../pages/offer-screen/offer-screen', () => ({
  default: function MockOfferScreen(): JSX.Element {
    return <div data-testid='mock-offer-screen'>OfferScreen</div>;
  }
}));

vi.mock('../../pages/favorites-screen/favorites-screen', () => ({
  default: function MockFavoritesScreen(): JSX.Element {
    return <div data-testid='mock-favorites-screen'>FavoritesScreen</div>;
  }
}));

vi.mock('../../pages/not-found-screen/not-found-screen', () => ({
  default: function MockNotFoundScreen(): JSX.Element {
    return <div data-testid='mock-not-found-screen'>NotFoundScreen</div>;
  }
}));

vi.mock('../../pages/loading-screen/loading-screen', () => ({
  default: function MockLoadingScreen(): JSX.Element {
    return <div data-testid='mock-loading-screen'>LoadingScreen</div>;
  }
}));

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "LoadingScreen" when AuthorizationStatus.Unknown', () => {
    const { withStoreComponent } = withStore(<App />, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('mock-loading-screen')).toBeInTheDocument();
  });

  it('should render "MainScreen" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId('mock-main-screen')).toBeInTheDocument();
  });

  it('should render "LoginScreen", not "MainScreen" when user navigate to "/login" and NoAuth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.queryByTestId('mock-log-in-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-main-screen')).not.toBeInTheDocument();
  });

  it('should render "MainScreen", not "LoginScreen" when user navigate to "/login" and Auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userData: null }
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.queryByTestId('mock-main-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-log-in-screen')).not.toBeInTheDocument();
  });

  it('should render "OfferScreen" when user navigate to "/offer/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Offer);

    render(withStoreComponent);

    expect(screen.getByTestId('mock-offer-screen')).toBeInTheDocument();
  });

  it('should render "FavoritesScreen", not "LogInScreen" when user navigate to "/favorites" and Auth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth, userData: null }
    }));
    mockHistory.push(AppRoute.Favourites);

    render(withStoreComponent);

    expect(screen.queryByTestId('mock-favorites-screen')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-log-in-screen')).not.toBeInTheDocument();
  });

  it('should render "LogInScreen", not "FavoritesScreen" when user navigate to "/favorites" and NoAuth', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth, userData: null }
    }));
    mockHistory.push(AppRoute.Favourites);

    render(withStoreComponent);

    expect(screen.queryByTestId('mock-favorites-screen')).not.toBeInTheDocument();
    expect(screen.queryByTestId('mock-log-in-screen')).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByTestId('mock-not-found-screen')).toBeInTheDocument();
  });
});
