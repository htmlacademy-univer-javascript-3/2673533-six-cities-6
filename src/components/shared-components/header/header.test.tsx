import { render, screen } from '@testing-library/react';
import Header from './header';

vi.mock('../header-logo/header-logo', () => ({
  default: function MockLogo(): JSX.Element {
    return <div data-testid='mock-logo'>Logo</div>;
  }
}));

vi.mock('../header-nav/header-nav', () => ({
  default: function MockNav(): JSX.Element {
    return <div data-testid='mock-nav'>Nav</div>;
  }
}));

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(<Header />);

    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    expect(screen.getByTestId('mock-nav')).toBeInTheDocument();
  });
});
