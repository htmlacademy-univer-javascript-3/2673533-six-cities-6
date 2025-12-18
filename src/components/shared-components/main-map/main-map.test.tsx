import { render, screen } from '@testing-library/react';
import MainMap from './main-map';
import { withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: MainMap', () => {

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<MainMap cityName="Paris" offers={[]} className="cities"/>, makeFakeStore());
    render(withStoreComponent);

    const mapSection = screen.getByTestId('map');
    expect(mapSection).toBeInTheDocument();
  });
});
