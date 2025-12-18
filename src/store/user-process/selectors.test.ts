import { AuthorizationStatus, NameSpace } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import { getAuthCheckedStatus, getAuthorizationStatus, getUserData } from './selectors';

describe('UserProcess selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: makeFakeUserData(),
    }
  };

  it('should return authorizationStatus from state', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthorizationStatus(state);
    expect(result).toEqual(authorizationStatus);
  });

  it('should return userData from state', () => {
    const { userData } = state[NameSpace.User];
    const result = getUserData(state);
    expect(result).toBe(userData);
  });

  it('should return authorization-checked status', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthCheckedStatus(state);
    expect(result).toEqual(authorizationStatus !== AuthorizationStatus.Unknown);
  });
});
