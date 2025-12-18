import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import Email from './email';
import { makeFakeStore } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';

describe('Component: Email', () => {
  it('should render correctly', () => {
    const initialState = makeFakeStore({
      FAVORITES_DATA: {
        favorites: [],
        favoritesCount: 3,
        isFavoritesDataLoading: false,
        isFavoriteStatusUpdating: false,
        isStatusUpdateSuccess: false,
        hasError: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: {
          name: '',
          avatarUrl: 'someUrl',
          isPro: false,
          email: 'someEmail',
          token: '',
        },
      }
    });
    const {withStoreComponent} = withStore(<Email />, initialState);
    render(withHistory(withStoreComponent));

    expect(screen.getByText(initialState.FAVORITES_DATA.favoritesCount)).toBeInTheDocument();
    expect(screen.getByText(initialState.USER.userData!.email)).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', initialState.USER.userData!.avatarUrl);
  });
});
