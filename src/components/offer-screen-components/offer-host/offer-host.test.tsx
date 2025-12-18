import { render, screen } from '@testing-library/react';
import OfferHost from './offer-host';
import { User } from '../../../types/user';

describe('Component: OfferHost', () => {
  it('should render correctly', () => {
    const host: User = {
      name: 'Hello',
      avatarUrl: '',
      isPro: true,
    }
    const expectedDescription = '123445678965432';
    render(<OfferHost host={host} description={expectedDescription}/>);

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByAltText('Host avatar')).toBeInTheDocument();
    expect(screen.getByText(host.name)).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText(expectedDescription)).toBeInTheDocument();
  });

  it('should not render Pro if host is not pro', () => {
    const host: User = {
      name: '',
      avatarUrl: '',
      isPro: false,
    }
    render(<OfferHost host={host} description=''/>);

    expect(screen.queryByText('Pro')).not.toBeInTheDocument();
  });
});
