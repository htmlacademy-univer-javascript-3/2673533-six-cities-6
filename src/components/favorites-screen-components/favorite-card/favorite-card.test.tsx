import { render, screen } from '@testing-library/react';
import FavoriteCard from './favorite-card';
import { makeFakeOffer } from '../../../utils/mocks';
import { withHistory, withStore } from '../../../utils/mock-component';

vi.mock('../../shared-components/bookmark-button/bookmark-button', () => ({
  default: function MockBookmarkButton(): JSX.Element {
    return <div data-testid="mock-bookmark">Bookmark</div>;
  }
}));

vi.mock('../favorite-offer-image/favorite-offer-image', () => ({
  default: function MockFavoriteOfferImage(): JSX.Element {
    return <div data-testid="mock-favorite-image">image</div>;
  }
}));

vi.mock('../../shared-components/offer-name/offer-name', () => ({
  default: function MockOfferName(): JSX.Element {
    return <div data-testid="mock-offer-name">OfferName</div>;
  }
}));

vi.mock('../../shared-components/offer-type/offer-type', () => ({
  default: function MockOfferType(): JSX.Element {
    return <div data-testid="mock-offer-type">OfferType</div>;
  }
}));

vi.mock('../../shared-components/premium-mark/premium-mark', () => ({
  default: function MockPremiumMark(): JSX.Element {
    return <div data-testid="mock-premium-mark">Premium</div>;
  }
}));

vi.mock('../../shared-components/price/price', () => ({
  default: function MockPrice(): JSX.Element {
    return <div data-testid="mock-price">Price</div>;
  }
}));

vi.mock('../../shared-components/rating/rating', () => ({
  default: function MockRating(): JSX.Element {
    return <div data-testid="mock-rating">Rating</div>;
  }
}));

describe('Component: FavoriteCard', () => {
  const mockOffer = makeFakeOffer('Paris');

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<FavoriteCard offer={mockOffer} />);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-favorite-image')).toBeInTheDocument();
    expect(screen.getByTestId('mock-price')).toBeInTheDocument();
    expect(screen.getByTestId('mock-rating')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-name')).toBeInTheDocument();
    expect(screen.getByTestId('mock-offer-type')).toBeInTheDocument();
    expect(screen.getByTestId('mock-bookmark')).toBeInTheDocument();
  });

  it('should render premium mark when offer is premium', () => {
    const premiumOffer = { ...mockOffer, isPremium: true };

    const { withStoreComponent } = withStore(<FavoriteCard offer={premiumOffer} />);
    render(withHistory(withStoreComponent));

    expect(screen.getByTestId('mock-premium-mark')).toBeInTheDocument();
    expect(screen.getByTestId('mock-premium-mark')).toHaveTextContent('Premium');
  });

  it('should not render premium mark when offer is not premium', () => {
    const nonPremiumOffer = { ...mockOffer, isPremium: false };

    const { withStoreComponent } = withStore(<FavoriteCard offer={nonPremiumOffer} />);
    render(withHistory(withStoreComponent));

    expect(screen.queryByTestId('mock-premium-mark')).not.toBeInTheDocument();
  });
});
