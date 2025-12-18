import { render, screen } from '@testing-library/react';
import OfferList from './offer-list';
import { makeFakeOffer } from '../../../utils/mocks';

vi.mock('../offer-card/offer-card', () => ({
  default: function MockCard(): JSX.Element {
    return <div data-testid='mock-card'>Card</div>;
  }
}));

describe('Component: OfferList', () => {
  it('should render correctly', () => {
    render(<OfferList offers={[makeFakeOffer('Paris'), makeFakeOffer('Paris'), makeFakeOffer('Paris')]} listName='' cardName=''/>);

    const cards = screen.getAllByTestId('mock-card');
    expect(cards.length).toEqual(3);
    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
    });
  });

  it('should render correctly when no offers', () => {
    render(<OfferList offers={[]} listName='' cardName=''/>);

    expect(screen.queryByTestId('mock-card')).not.toBeInTheDocument();
  });
});
