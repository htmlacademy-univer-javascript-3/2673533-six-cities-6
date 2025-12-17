import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state';
import { UserFullData } from '../../types/user-full-data';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: Pick<State, NameSpace.User>): UserFullData | null => state[NameSpace.User].userData;
