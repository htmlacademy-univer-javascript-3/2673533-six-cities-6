import { render, screen } from '@testing-library/react';
import OfferGallery from './offer-gallery';

vi.mock('../offer-gallery-image/offer-gallery-image', () => ({
  default: function MockOfferGalleryImage(): JSX.Element {
    return <div data-testid='mock-gallery-image'>Gallery Image</div>;
  }
}));

describe('Component: OfferGallery', () => {
  it('should render correctly with no images', () => {
    render(<OfferGallery images={[]} />);

    expect(screen.queryByTestId('mock-gallery-image')).not.toBeInTheDocument();
  });

  it('should render correctly with images', () => {
    render(<OfferGallery images={['1', '2', '3', '4']} />);

    const result = screen.getAllByTestId('mock-gallery-image');
    expect(result.length).toEqual(4);
    result.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
