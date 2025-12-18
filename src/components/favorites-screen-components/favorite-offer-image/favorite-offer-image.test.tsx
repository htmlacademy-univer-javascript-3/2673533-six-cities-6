import { render, screen } from '@testing-library/react';
import FavoriteOfferImage from './favorite-offer-image';

describe('Component: FavoriteOfferImage', () => {
  it('should render correctly', () => {
    render(<FavoriteOfferImage src="" />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
