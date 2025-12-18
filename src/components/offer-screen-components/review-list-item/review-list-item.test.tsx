import { render, screen } from '@testing-library/react';
import ReviewListItem from './review-list-item';
import { makeFakeComment } from '../../../utils/mocks';

vi.mock('../../shared-components/rating/rating', () => ({
  default: function MockRating(): JSX.Element {
    return <div data-testid='mock-rating'>Rating</div>
  }
}));

vi.mock('../review-user/review-user', () => ({
  default: function MockReviewUser(): JSX.Element {
    return <div data-testid='mock-user'>Review User</div>
  }
}));

describe('Component: ReviewListItem', () => {
  it('should render correctly', () => {
    const mockComment = makeFakeComment();
    render(<ReviewListItem review={mockComment} />);

    expect(screen.getByTestId('mock-rating')).toBeInTheDocument();
    expect(screen.getByTestId('mock-user')).toBeInTheDocument();

    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
  });
});
