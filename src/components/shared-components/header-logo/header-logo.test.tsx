import { render, screen } from '@testing-library/react';
import HeaderLogo from './header-logo';
import { withHistory } from '../../../utils/mock-component';

describe('Component: HeaderLogo', () => {
  it('should render correctly', () => {
    render(withHistory(<HeaderLogo />));

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
