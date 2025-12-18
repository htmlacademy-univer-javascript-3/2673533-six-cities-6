import { render, screen } from '@testing-library/react';
import ReviewTextarea from './review-textarea';

describe('Component: ReviewTextarea', () => {
  it('should render correctly', () => {
    render(<ReviewTextarea reviewText='' onReviewTextChange={vi.fn()}/>);

    expect(screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved')).toBeInTheDocument();
  });
});
