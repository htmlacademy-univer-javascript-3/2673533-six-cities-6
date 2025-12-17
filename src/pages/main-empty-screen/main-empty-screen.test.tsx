import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import MainEmptyScreen from './main-empty-screen';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <header data-testid="mock-header">Header</header>;
  }
}));

vi.mock('../../components/main-screen-components/locations-list/locations-list', () => ({
  default: function MockLocationsList({ activeCity }: { activeCity: string }): JSX.Element {
    return <div data-testid="mock-locations-list">Locations List for {activeCity}</div>;
  }
}));

describe('Screen: MainEmptyScreen', () => {
  const activeCity = 'Paris';

  it('should render correctly', () => {
    render(withHistory(<MainEmptyScreen activeCity={activeCity} />));

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${activeCity}`)).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toHaveClass('visually-hidden');
  });

  it('should display mocked child components', () => {
    render(withHistory(<MainEmptyScreen activeCity={activeCity} />));

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-locations-list')).toBeInTheDocument();
    expect(screen.getByText(`Locations List for ${activeCity}`)).toBeInTheDocument();
  });
});
