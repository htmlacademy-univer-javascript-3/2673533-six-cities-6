import { render, screen } from '@testing-library/react';
import OfferFeatures from './offer-features';

describe('Component: OfferFeatures', () => {
  it('should render correctly', () => {
    const expectedType = 'room';
    const expectedBedrooms = '3 Bedrooms';
    const expectedMaxAdults = 'Max 4 adults';

    render(<OfferFeatures type={expectedType} bedrooms={3} maxAdults={4} />);

    expect(screen.getByText(expectedType)).toBeInTheDocument();
    expect(screen.getByText(expectedBedrooms)).toBeInTheDocument();
    expect(screen.getByText(expectedMaxAdults)).toBeInTheDocument();
  });

  it('should render right form of bedrooms and adults', () => {
    const expectedBedrooms = '1 Bedroom';
    const expectedMaxAdults = 'Max 1 adult';

    render(<OfferFeatures type={''} bedrooms={1} maxAdults={1} />);

    expect(screen.getByText(expectedBedrooms)).toBeInTheDocument();
    expect(screen.getByText(expectedMaxAdults)).toBeInTheDocument();
  });
});
