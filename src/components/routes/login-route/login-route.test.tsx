import { MemoryHistory, createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { withHistory } from '../../../utils/mock-component';
import LoginRoute from './login-route';

describe('Component: LoginRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.Login);
  });

  it('should render component for Main route, when user authorized', () => {
    const expectedText = 'public route';
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<span>{expectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <LoginRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{notExpectedText}</span>
          </LoginRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for Login route, when user not authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.Login} element={
          <LoginRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{expectedText}</span>
          </LoginRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
