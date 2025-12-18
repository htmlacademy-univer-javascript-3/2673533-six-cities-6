import { NameSpace } from '../../const';
import { makeFakeComment } from '../../utils/mocks';
import { getComments, getCommentsDataLoadingStatus, getCommentsErrorStatus } from './selectors';

describe('CommentsData selectors', () => {
  const mockComments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
  const state = {
    [NameSpace.CommentsData]: {
      comments: mockComments,
      isCommentsDataLoading: true,
      hasError: true,
    }
  };

  it('should return comments from state', () => {
    const { comments } = state[NameSpace.CommentsData];
    const result = getComments(state);
    expect(result).toEqual(comments);
  });

  it('should return comments data loading status', () => {
    const { isCommentsDataLoading } = state[NameSpace.CommentsData];
    const result = getCommentsDataLoadingStatus(state);
    expect(result).toBe(isCommentsDataLoading);
  });

  it('should return comments error status from state', () => {
    const { hasError } = state[NameSpace.CommentsData];
    const result = getCommentsErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
