import { render, screen } from '@testing-library/react';
import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../utils/mock-component';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <div data-testid="mock-header">Header</div>;
  }
}));

describe('Screen: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('The page you are looking for does not exist or has been moved.')).toBeInTheDocument();
    expect(screen.getByText('Back to main page')).toBeInTheDocument();
  });

  it('should display mocked child components', () => {
    render(withHistory(<NotFoundScreen />));

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
