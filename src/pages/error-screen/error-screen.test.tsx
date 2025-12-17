import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import userEvent from '@testing-library/user-event';
import ErrorScreen from './error-screen';

vi.mock('../../components/shared-components/header/header', () => ({
  default: function MockHeader(): JSX.Element {
    return <header data-testid="mock-header">Header</header>;
  }
}));

describe('Screen: ErrorScreen', () => {
  const mockRestarter = vi.fn();

  beforeEach(() => {
    mockRestarter.mockClear();
  });

  it('should render correctly', () => {
    render(withHistory(<ErrorScreen restarter={mockRestarter} />));

    expect(screen.getByText('Something went wrong with loading data from server...')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /try again/i });
    expect(button).toBeInTheDocument();

    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
  });

  it('should call restarter function when button is clicked', async () => {
    const user = userEvent.setup();
    render(withHistory(<ErrorScreen restarter={mockRestarter} />));

    const button = screen.getByRole('button', { name: /try again/i });

    await user.click(button);
    expect(mockRestarter).toHaveBeenCalledTimes(1);

    await user.click(button);
    expect(mockRestarter).toHaveBeenCalledTimes(2);
  });
});
