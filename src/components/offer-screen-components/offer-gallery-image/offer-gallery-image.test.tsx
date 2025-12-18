import { render, screen } from '@testing-library/react';
import OfferGalleryImage from './offer-gallery-image';

describe('Component: OfferGalleryImage', () => {
  it('should render correctly', () => {
    render(<OfferGalleryImage src=''/>);

    expect(screen.getByAltText('Photo studio')).toBeInTheDocument();
  });
});
