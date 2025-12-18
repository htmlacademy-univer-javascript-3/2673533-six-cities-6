import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    render(<Rating className='' ratingValue={5}/>);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
