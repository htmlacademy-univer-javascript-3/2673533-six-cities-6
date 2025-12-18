import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import LoadingScreen from './loading-screen';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <div data-testid="mock-header">Header</div>;
  }
}));

describe('Screen: LoadingScreen', () => {
  it('should render correctly', () => {
    render(withHistory(<LoadingScreen />));

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Fetching some data from server. Please wait🙂')).toBeInTheDocument();
  });

  it('should display mocked child components', () => {
    render(withHistory(<LoadingScreen />));

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });
});
