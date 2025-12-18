import { render, screen } from '@testing-library/react';
import ReviewStar from './review-star';

describe('Component: ReviewStar', () => {
  it('should render correctly', () => {
    const mockRating = '5';
    const mockTitle = 'perfect';
    const mockSelected = '5';

    render(<ReviewStar rating={mockRating} title={mockTitle} selected={mockSelected} onRatingChange={vi.fn()} />);

    const inputElement = screen.getByRole('radio');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('value', mockRating);
    expect(inputElement).toHaveAttribute('id', `${mockRating}-stars`);
    expect(inputElement).toBeChecked();

    expect(screen.getByTitle(mockTitle)).toBeInTheDocument();
  });
});
