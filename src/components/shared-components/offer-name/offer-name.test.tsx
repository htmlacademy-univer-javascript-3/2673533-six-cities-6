import { render, screen } from '@testing-library/react';
import { withHistory } from '../../../utils/mock-component';
import OfferName from './offer-name';

describe('Component: OfferName', () => {
  it('should render correctly', () => {
    const expectedOfferName = 'Hello';
    render(withHistory(<OfferName offerId='' offerName={expectedOfferName}/>));

    expect(screen.getByText(expectedOfferName)).toBeInTheDocument();
  });
});
