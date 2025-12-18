import { render, screen } from '@testing-library/react';
import Price from './price';

describe('Component: Price', () => {
  it('should render correctly', () => {
    render(<Price priceValue={666}/>);

    expect(screen.getByText(/666/)).toBeInTheDocument();
    expect(screen.getByText(/night/)).toBeInTheDocument();
  });
});
