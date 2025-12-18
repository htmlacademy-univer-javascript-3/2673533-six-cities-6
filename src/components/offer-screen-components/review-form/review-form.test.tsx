import { render, screen } from '@testing-library/react';
import ReviewForm from './review-form';
import { withStore } from '../../../utils/mock-component';

vi.mock('../review-help/review-help', () => ({
  default: function MockHelp(): JSX.Element {
    return <div data-testid='mock-help'>Help</div>;
  }
}));

vi.mock('../review-star/review-star', () => ({
  default: function MockStar(): JSX.Element {
    return <div data-testid='mock-star'>Star</div>;
  }
}));

vi.mock('../review-textarea/review-textarea', () => ({
  default: function MockTextarea(): JSX.Element {
    return <div data-testid='mock-textarea'>Textarea</div>;
  }
}));

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<ReviewForm offerId=''/>);
    render(withStoreComponent);

    const stars = screen.getAllByTestId('mock-star');
    expect(stars.length).toEqual(5);
    stars.forEach((star) => {
      expect(star).toBeInTheDocument();
    });
    expect(screen.getByTestId('mock-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('mock-help')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
