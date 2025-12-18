import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import LocationsList from './locations-list';
import { CITIES } from '../../../const';

describe('Component: LocationsList', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<LocationsList activeCity={'Paris'} />);
    render(withStoreComponent);

    CITIES.forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });
});
