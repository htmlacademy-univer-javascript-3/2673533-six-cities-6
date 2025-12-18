import { render, screen } from '@testing-library/react';
import OfferImage from './offer-image';

describe('Component: OfferImage', () => {
  it('should render correctly', () => {
    render(<OfferImage src='' cardName=''/>);

    expect(screen.getByAltText('Place image')).toBeInTheDocument();
  });
});
