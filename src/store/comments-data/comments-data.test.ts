import { makeFakeComment } from '../../utils/mocks';
import { fetchCommentsAction } from '../api-actions';
import { clearComments, commentsData } from './comments-data';

describe('CommentsData Slice', () => {
  describe('checkInitialState', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        comments: [makeFakeComment()],
        isCommentsDataLoading: true,
        hasError: true,
      };

      const result = commentsData.reducer(expectedState, emptyAction);

      expect(result).toEqual(expectedState);
    });

    it('should return default initial state with empty action', () => {
      const emptyAction = { type: '' };
      const expectedState = {
        comments: [],
        isCommentsDataLoading: false,
        hasError: false,
      };

      const result = commentsData.reducer(undefined, emptyAction);

      expect(result).toEqual(expectedState);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should set "isCommentsDataLoading" to "true", "hasError" to "false" with "fetchCommentsAction.pending"', () => {
      const expectedState = {
        comments: [],
        isCommentsDataLoading: true,
        hasError: false,
      };

      const result = commentsData.reducer(undefined, fetchCommentsAction.pending);

      expect(result).toEqual(expectedState);
    });

    it('should set "comments" to array with comments, "isCommentsDataLoading" to "false" with "fetchCommentsAction.fulfilled"', () => {
      const mockComments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
      const expectedState = {
        comments: mockComments,
        isCommentsDataLoading: false,
        hasError: false,
      };

      const result = commentsData.reducer(undefined, fetchCommentsAction.fulfilled(mockComments, '', ''));

      expect(result).toEqual(expectedState);
    });

    it('should set "isCommentsDataLoading" to "false", "hasError" to "true" with "fetchCommentsAction.rejected"', () => {
      const expectedState = {
        comments: [],
        isCommentsDataLoading: false,
        hasError: true,
      };

      const result = commentsData.reducer(undefined, fetchCommentsAction.rejected);

      expect(result).toEqual(expectedState);
    });
  });

  describe('commentsProcess', () => {
    it('should clear "comments" with "clearComments" action', () => {
      const initialState = {
        comments: [makeFakeComment(), makeFakeComment(), makeFakeComment()],
        isCommentsDataLoading: false,
        hasError: false,
      };
      const expectedState = {
        comments: [],
        isCommentsDataLoading: false,
        hasError: false,
      };

      const result = commentsData.reducer(initialState, clearComments);

      expect(result).toEqual(expectedState);
    });
  });
});
