import { NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import { State } from '../../types/state';


export const getComments = (state: Pick<State, NameSpace.CommentsData>): Comments => state[NameSpace.CommentsData].comments;
export const getCommentsDataLoadingStatus = (state: Pick<State, NameSpace.CommentsData>): boolean => state[NameSpace.CommentsData].isCommentsDataLoading;
export const getCommentsErrorStatus = (state: Pick<State, NameSpace.CommentsData>): boolean => state[NameSpace.CommentsData].hasError;
