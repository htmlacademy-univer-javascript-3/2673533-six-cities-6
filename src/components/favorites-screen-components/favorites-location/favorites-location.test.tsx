import { render, screen } from '@testing-library/react';
import FavoritesLocation from './favorites-location';
import { withHistory, withStore } from '../../../utils/mock-component';

describe('Component: FavoritesLocation', () => {
  it('should render correctly', () => {
    const cityName = 'Paris';

    const { withStoreComponent } = withStore(<FavoritesLocation cityName={cityName} />);
    render(withHistory(withStoreComponent));
    
    expect(screen.getByText(cityName)).toBeInTheDocument();
  });
});
