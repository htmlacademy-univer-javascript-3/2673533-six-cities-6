import { render, screen } from '@testing-library/react';
import { makeFakeStore } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';
import { withStore } from '../../../utils/mock-component';
import HeaderNav from './header-nav';

vi.mock('../email/email', () => ({
  default: function MockEmail(): JSX.Element {
    return <div data-testid='mock-email'>Email</div>
  }
}));

vi.mock('../log-in-out-button/log-in-out-button', () => ({
  default: function MockButton(): JSX.Element {
    return <div data-testid='mock-button'>Button</div>
  }
}));

describe('Component: HeaderNav', () => {
  it('should render correctly wnen auth', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
      }
    })
    const {withStoreComponent} = withStore(<HeaderNav />, initialState);
    render(withStoreComponent);

    expect(screen.getByTestId('mock-email')).toBeInTheDocument();
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
  });

  it('should render correctly wnen NoAuth', () => {
    const initialState = makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      }
    })
    const {withStoreComponent} = withStore(<HeaderNav />, initialState);
    render(withStoreComponent);

    expect(screen.queryByTestId('mock-email')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-button')).toBeInTheDocument();
  });
});
