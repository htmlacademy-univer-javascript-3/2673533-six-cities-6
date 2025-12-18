import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../../utils/mock-component';
import LogInOutButton from './log-in-out-button';
import { AuthorizationStatus } from '../../../const';

describe('Component: LogInOutButton', () => {
  it('should render correctly when Auth', () => {
    const {withStoreComponent} = withStore(<LogInOutButton authorizationStatus={AuthorizationStatus.Auth} />);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render correctly when NoAuth', () => {
    const {withStoreComponent} = withStore(<LogInOutButton authorizationStatus={AuthorizationStatus.NoAuth} />);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
