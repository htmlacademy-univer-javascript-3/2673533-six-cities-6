import { render, screen } from '@testing-library/react';
import OfferType from './offer-type';

describe('Component: OfferType', () => {
  it('should render correctly', () => {
    const expectedValue = 'vaaaay';
    render(<OfferType value={expectedValue}/>);

    expect(screen.getByText(expectedValue)).toBeInTheDocument();
  });
});
