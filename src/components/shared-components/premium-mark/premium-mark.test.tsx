import { render, screen } from '@testing-library/react';
import PremiumMark from './premium-mark';

describe('Component: PremiumMark', () => {
  it('should render correctly', () => {
    render(<PremiumMark className=''/>);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });
});
