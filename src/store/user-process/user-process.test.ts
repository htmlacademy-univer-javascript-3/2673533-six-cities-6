import { AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

describe('UserProcess Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      };

      const result = userProcess.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      };

      const result = userProcess.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('checkAuthAction', () => {
    it('should set "Auth", userData to user data with "checkAuthAction.fulfilled" action', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      };
      const userData = makeFakeUserData();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: userData,
      };

      const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(userData, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      };

      const result = userProcess.reducer(initialState, checkAuthAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('loginAction', () => {
    it('should set "Auth", userData to user data with "loginAction.fulfilled" action', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      };
      const userData = makeFakeUserData();
      const expectedState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: userData,
      };

      const result = userProcess.reducer(initialState, loginAction.fulfilled(userData, '', { email: '', password: '' }));

      expect(result).toEqual(expectedState);
    });

    it('should set "NoAuth" with "loginAction.rejected" action', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      };

      const result = userProcess.reducer(initialState, loginAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('logoutAction', () => {
    it('should set "NoAuth", userData to null with "logoutAction.fulfilled" action', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: makeFakeUserData(),
      };
      const expectedState = {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      };

      const result = userProcess.reducer(initialState, logoutAction.fulfilled);

      expect(result).toEqual(expectedState);
    });
  });
});
