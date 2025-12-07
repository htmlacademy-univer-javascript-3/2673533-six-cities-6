import { AuthorizationStatus, NameSpace } from "../../const";
import { State } from "../../types/state";
import { UserFullData } from "../../types/user-full-data";

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: State): UserFullData | null => state[NameSpace.User].userData;
