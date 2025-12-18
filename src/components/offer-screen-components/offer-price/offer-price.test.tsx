import { render, screen } from '@testing-library/react';
import OfferPrice from './offer-price';

describe('Component: OfferPrice', () => {
  it('should render correctly', () => {
    render(<OfferPrice price={666}/>);

    expect(screen.getByText(/666/)).toBeInTheDocument();
    expect(screen.getByText(/night/)).toBeInTheDocument();
  });
});
