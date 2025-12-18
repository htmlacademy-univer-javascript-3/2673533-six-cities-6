import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import OfferCard from './offer-card';
import { makeFakeOffer } from '../../../utils/mocks';

vi.mock('../bookmark-button/bookmark-button', () => ({
  default: function MockBookmarkButton(): JSX.Element {
    return (
      <div data-testid="mock-bookmark">Bookmark</div>
    );
  }
}));

vi.mock('../offer-image/offer-image', () => ({
  default: function MockOfferImage(): JSX.Element {
    return (
      <div data-testid="mock-image">image</div>
    );
  }
}));

vi.mock('../offer-name/offer-name', () => ({
  default: function MockOfferName(): JSX.Element {
    return (
      <h2 data-testid="mock-offer-name">OfferName</h2>
    );
  }
}));

vi.mock('../offer-type/offer-type', () => ({
  default: function MockOfferType(): JSX.Element {
    return (
      <p data-testid="mock-offer-type">OfferType</p>
    );
  }
}));

vi.mock('../premium-mark/premium-mark', () => ({
  default: function MockPremiumMark(): JSX.Element {
    return (
      <div data-testid="mock-premium-mark">Premium</div>
    );
  }
}));

vi.mock('../price/price', () => ({
  default: function MockPrice(): JSX.Element {
    return (
      <div data-testid="mock-price">Price</div>
    );
  }
}));

vi.mock('../rating/rating', () => ({
  default: function MockRating(): JSX.Element {
    return (
      <div data-testid="mock-rating">Rating</div>
    );
  }
}));

describe('Component: OfferCard', () => {
  it('should render correctly when is premium', () => {
    let mockOffer = makeFakeOffer('Paris');
    mockOffer.isPremium = true;
    const {withStoreComponent} = withStore(<OfferCard offer={mockOffer} cardName=''/>);
    render(withStoreComponent);

    expect(screen.getByTestId('mock-bookmark')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-name')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-type')).toBeInTheDocument();
    expect(screen.getByTestId('mock-price')).toBeInTheDocument();
    expect(screen.getByTestId('mock-rating')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-premium-mark')).toBeInTheDocument();
  });

  it('should render correctly when not is premium', () => {
    let mockOffer = makeFakeOffer('Paris');
    mockOffer.isPremium = false;
    const {withStoreComponent} = withStore(<OfferCard offer={mockOffer} cardName=''/>);
    render(withStoreComponent);

    expect(screen.getByTestId('mock-bookmark')).toBeInTheDocument();
    expect(screen.getByTestId('mock-image')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-name')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-type')).toBeInTheDocument();
    expect(screen.getByTestId('mock-price')).toBeInTheDocument();
    expect(screen.getByTestId('mock-rating')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-premium-mark')).not.toBeInTheDocument();
  });
});
