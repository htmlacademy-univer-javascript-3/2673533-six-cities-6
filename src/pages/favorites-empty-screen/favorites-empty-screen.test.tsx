import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import FavoritesEmptyScreen from './favorites-empty-screen';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <div data-testid="mock-header">Header</div>;
  }
}));

describe('Screen: FavoritesEmptyScreen', () => {
  it('should render correctly', () => {
    render(withHistory(<FavoritesEmptyScreen />));

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });

  it('should display mocked child components', () => {
    render(withHistory(<FavoritesEmptyScreen />));

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
