import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen';
import { vi } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';

vi.mock('../../components/shared-components/header-logo/header-logo', () => ({
  default: function MockHeaderLogo(): JSX.Element {
    return <div data-testid="mock-header-logo">Header Logo</div>;
  }
}));

describe('Screen: LoginScreen', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LoginScreen />);
    render(withHistory(withStoreComponent));

    expect(screen.getByText('Sign in', { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByTestId('mock-header-logo')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const expectedEmailValue = 'test@example.com';
    const expectedPasswordValue = 'invalid';

    const { withStoreComponent } = withStore(<LoginScreen />);
    render(withHistory(withStoreComponent));

    await userEvent.type(screen.getByPlaceholderText('Email'), expectedEmailValue);
    await userEvent.type(screen.getByPlaceholderText('Password'), expectedPasswordValue);

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
