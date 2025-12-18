import { render, screen } from '@testing-library/react';
import ReviewUser from './review-user';
import { User } from '../../../types/user';

describe('Component: ReviewUser', () => {
  it('should render correctly', () => {
    const mockUser: User = {
      name: 'Lulumba',
      avatarUrl: '',
      isPro: false,
    };
    render(<ReviewUser user={mockUser} />);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
  });
});
