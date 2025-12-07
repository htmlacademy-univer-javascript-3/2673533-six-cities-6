import { NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import { State } from '../../types/state';


export const getComments = (state: State): Comments => state[NameSpace.CommentsData].comments;
export const getCommentsDataLoadingStatus = (state: State): boolean => state[NameSpace.CommentsData].isCommentsDataLoading;
export const getCommentsErrorStatus = (state: State): boolean => state[NameSpace.CommentsData].hasError;
