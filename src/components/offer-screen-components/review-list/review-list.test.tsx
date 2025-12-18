import { render, screen } from '@testing-library/react';
import ReviewList from './review-list';
import { makeFakeComment } from '../../../utils/mocks';

vi.mock('../review-list-item/review-list-item', () => ({
  default: function MockReviewListItem(): JSX.Element {
    return <div data-testid='mock-review-item'>Review List Item</div>;
  }
}));

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    const mockComments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];

    render(<ReviewList reviews={mockComments}/>);

    const result = screen.getAllByTestId('mock-review-item');
    expect(result.length).toEqual(3);
    result.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it('should render correctly wnen no comments', () => {
    render(<ReviewList reviews={[]}/>);

    expect(screen.queryByTestId('mock-review-item')).not.toBeInTheDocument();
  });

  it('should render not more than 10', () => {
    const mockComments = [makeFakeComment(), makeFakeComment(), makeFakeComment(), makeFakeComment(), makeFakeComment(), makeFakeComment(), makeFakeComment(),
      makeFakeComment(), makeFakeComment(), makeFakeComment(), makeFakeComment(), makeFakeComment()];

    render(<ReviewList reviews={mockComments}/>);

    const result = screen.getAllByTestId('mock-review-item');
    expect(result.length).toEqual(10);
    expect(result.length).not.toEqual(mockComments.length);
    result.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
