import { render, screen } from '@testing-library/react';
import OfferInsideItem from './offer-inside-item';

describe('Component: OfferInsideItem', () => {
  it('should render correctly', () => {
    const expectedItem = 'super puper computer';
    render(<OfferInsideItem item={expectedItem} />);

    expect(screen.getByText(expectedItem)).toBeInTheDocument();
  });
});
