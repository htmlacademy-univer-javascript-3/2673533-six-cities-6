import { render, screen } from '@testing-library/react';
import ReviewHelp from './review-help';

describe('Component: ReviewHelp', () => {
  it('should render correctly', () => {
    render(<ReviewHelp />);

    expect(screen.getByText(/To submit review please make sure to set/)).toBeInTheDocument();
    expect(screen.getByText(/rating/)).toBeInTheDocument();
    expect(screen.getByText(/and describe your stay with at least/)).toBeInTheDocument();
    expect(screen.getByText(/50 characters/)).toBeInTheDocument();
  });
});
