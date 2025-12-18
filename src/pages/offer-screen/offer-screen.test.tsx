import { render, screen } from '@testing-library/react';
import OfferScreen from './offer-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { AuthorizationStatus } from '../../const';
import { makeFakeComment, makeFakeOffer, makeFakeOfferById, makeFakeStore, makeFakeUserData } from '../../utils/mocks';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <div data-testid="mock-header">Header</div>;
  }
}));

vi.mock('../../components/offer-screen-components/review-form/review-form', () => ({
  default: function MockReviewForm(): JSX.Element {
    return <div data-testid="mock-review-form">Review Form</div>;
  }
}));

vi.mock('../not-found-screen/not-found-screen', () => ({
  default: function MockNotFoundScreen(): JSX.Element {
    return <div data-testid="mock-not-found">Not Found</div>;
  }
}));

vi.mock('../../components/offer-screen-components/offer-gallery/offer-gallery', () => ({
  default: function MockOfferGallery(): JSX.Element {
    return <div data-testid="mock-gallery">Gallery</div>;
  }
}));

vi.mock('../../components/shared-components/premium-mark/premium-mark', () => ({
  default: function MockPremiumMark(): JSX.Element {
    return <div data-testid="mock-premium-mark">Premium</div>;
  }
}));

vi.mock('../../components/shared-components/bookmark-button/bookmark-button', () => ({
  default: function MockBookmarkButton(): JSX.Element {
    return <div data-testid='mock-bookmark'>Bookmark</div>;
  }
}));

vi.mock('../../components/offer-screen-components/offer-inside-list/offer-inside-list', () => ({
  default: function MockOfferInsideList(): JSX.Element {
    return <div data-testid="mock-inside-list">List</div>;
  }
}));

vi.mock('../loading-screen/loading-screen', () => ({
  default: function MockLoadingScreen(): JSX.Element {
    return <div data-testid="mock-loading">Loading...</div>;
  }
}));

vi.mock('../../components/offer-screen-components/review-list/review-list', () => ({
  default: function MockReviewList(): JSX.Element {
    return <div data-testid="mock-review-list">reviews</div>;
  }
}));

vi.mock('../../components/offer-screen-components/offer-host/offer-host', () => ({
  default: function MockOfferHost(): JSX.Element {
    return <div data-testid="mock-host">Host</div>;
  }
}));

vi.mock('../../components/offer-screen-components/offer-price/offer-price', () => ({
  default: function MockOfferPrice(): JSX.Element {
    return <div data-testid="mock-price">Price</div>;
  }
}));

vi.mock('../../components/offer-screen-components/offer-features/offer-features', () => ({
  default: function MockOfferFeatures(): JSX.Element {
    return <div data-testid="mock-features">Features</div>;
  }
}));

vi.mock('../../components/shared-components/rating/rating', () => ({
  default: function MockRating(): JSX.Element {
    return <div data-testid="mock-rating">Rating</div>;
  }
}));

vi.mock('../../components/shared-components/offer-list/offer-list', () => ({
  default: function MockOfferList(): JSX.Element {
    return <div data-testid='mock-offer-list'>OfferList</div>;
  }
}));

vi.mock('../../components/shared-components/main-map/main-map', () => ({
  default: function MockMainMap(): JSX.Element {
    return <div data-testid="mock-map">Map</div>;
  }
}));

vi.mock('../error-screen/error-screen', () => ({
  default: function MockErrorScreen(): JSX.Element {
    return <div data-testid="mock-error">Error-screen</div>;
  }
}));

describe('Screen: OfferScreen', () => {
  const mockOffer = makeFakeOfferById();
  mockOffer.isPremium = true;
  const mockComments = [makeFakeComment(), makeFakeComment()];
  const mockOffersNearby = [makeFakeOffer('Paris'), makeFakeOffer('Paris'), makeFakeOffer('Paris')];
  const mockUser = makeFakeUserData();

  describe('Loading state', () => {
    it('should show loading screen when offer is loading', () => {
      const initialState = makeFakeStore({
        OFFERS_BY_ID_DATA: {
          offerById: null,
          isOfferByIdDataLoading: true,
          hasError: false,
          isNotFound: false,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    });

    it('should show loading screen when comments are loading', () => {
      const initialState = makeFakeStore({
        COMMENTS_DATA: {
          comments: [],
          isCommentsDataLoading: true,
          hasError: false,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    });

    it('should show loading screen when offers nearby are loading', () => {
      const initialState = makeFakeStore({
        OFFERS_NEARBY_DATA: {
          offersNearby: [],
          isOffersNearbyDataLoading: true,
          hasError: false,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    });
  });

  describe('Error state', () => {
    it('should show error screen when offer has error', () => {
      const initialState = makeFakeStore({
        OFFERS_BY_ID_DATA: {
          offerById: null,
          isOfferByIdDataLoading: false,
          hasError: true,
          isNotFound: false,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-error')).toBeInTheDocument();
    });

    it('should show error screen when comments have error', () => {
      const initialState = makeFakeStore({
        COMMENTS_DATA: {
          comments: [],
          isCommentsDataLoading: false,
          hasError: true,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-error')).toBeInTheDocument();
    });

    it('should show error screen when offers nearby have error', () => {
      const initialState = makeFakeStore({
        OFFERS_NEARBY_DATA: {
          offersNearby: [],
          isOffersNearbyDataLoading: false,
          hasError: true,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-error')).toBeInTheDocument();
    });
  });

  describe('Not Found state', () => {
    it('should show not found screen when isNotFound is true', () => {
      const initialState = makeFakeStore({
        OFFERS_BY_ID_DATA: {
          offerById: null,
          isOfferByIdDataLoading: false,
          hasError: false,
          isNotFound: true,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByTestId('mock-not-found')).toBeInTheDocument();
    });
  });

  describe('Success state', () => {
    it('should render correctly', () => {
      const initialState = makeFakeStore({
        OFFERS_BY_ID_DATA: {
          offerById: mockOffer,
          isOfferByIdDataLoading: false,
          hasError: false,
          isNotFound: false,
        },
        COMMENTS_DATA: {
          comments: mockComments,
          isCommentsDataLoading: false,
          hasError: false,
        },
        OFFERS_NEARBY_DATA: {
          offersNearby: mockOffersNearby,
          isOffersNearbyDataLoading: false,
          hasError: false,
        },
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          userData: mockUser,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-premium-mark')).toBeInTheDocument();
      expect(screen.getByTestId('mock-rating')).toBeInTheDocument();
      expect(screen.getByTestId('mock-price')).toBeInTheDocument();
      expect(screen.getByTestId('mock-features')).toBeInTheDocument();
      expect(screen.getByTestId('mock-gallery')).toBeInTheDocument();
      expect(screen.getByTestId('mock-inside-list')).toBeInTheDocument();
      expect(screen.getByTestId('mock-host')).toBeInTheDocument();
      expect(screen.getByTestId('mock-review-list')).toBeInTheDocument();
      expect(screen.getByTestId('mock-review-form')).toBeInTheDocument();
      expect(screen.getByTestId('mock-map')).toBeInTheDocument();
      expect(screen.getByTestId('mock-offer-list')).toBeInTheDocument();
      expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    });

    it('should not show review form for unauthorized users', () => {
      const initialState = makeFakeStore({
        USER: {
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
        }
      });

      const { withStoreComponent } = withStore(<OfferScreen />, initialState);
      render(withHistory(withStoreComponent));

      expect(screen.queryByTestId('mock-review-form')).not.toBeInTheDocument();
    });
  });
});
