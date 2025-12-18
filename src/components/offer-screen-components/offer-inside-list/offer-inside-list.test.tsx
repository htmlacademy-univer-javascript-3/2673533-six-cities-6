import { render, screen } from '@testing-library/react';
import OfferInsideList from './offer-inside-list';

vi.mock('../offer-inside-item/offer-inside-item', () => ({
  default: function MockOfferInsideItem(): JSX.Element {
    return <div data-testid='mock-inside-item'>Inside Item</div>
  }
}));

describe('Component: OfferInsideList', () => {
  it('should render correctly', () => {
    render(<OfferInsideList items={['', '', '']} />);
    const result = screen.getAllByTestId('mock-inside-item');
    expect(result.length).toEqual(3);
    result.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should render correctly when no items', () => {
    render(<OfferInsideList items={[]} />);

    expect(screen.queryByTestId('mock-inside-item')).not.toBeInTheDocument();
  });
});
