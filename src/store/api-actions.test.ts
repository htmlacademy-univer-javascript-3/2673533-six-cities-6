import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from "../services/api";
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { State } from '../types/state';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeComment, makeFakeOffer, makeFakeOfferById } from '../utils/mocks';
import { APIRoute } from '../const';
import { checkAuthAction, fetchCommentsAction, fetchFavoritesAction, fetchOfferByIdAction, fetchOffersAction, fetchOffersNearbyAction, loginAction, logoutAction, postCommentAction, postFavoriteStatusAction } from './api-actions';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';
import { NewComment } from '../types/new-comment';
import { NewFavoriteStatus } from '../types/new-favorite-status';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      OFFERS_DATA: { offers: [] },
      OFFERS_BY_ID_DATA: { offerById: null },
      OFFERS_NEARBY_DATA: { offersNearby: [] },
      FAVORITES_DATA: { favorites: [] },
      COMMENTS_DATA: { comments: [] },
      USER: { userData: null },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.fulfilled.type]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(401);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.rejected.type]);
    });

    it('should dispatch "checkAuthAction.pending", "checkAuthAction.rejected" when network error', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).networkError();

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([checkAuthAction.pending.type, checkAuthAction.rejected.type]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, redirectToRoute.type, loginAction.fulfilled.type]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReply);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when server response 400', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(400);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, loginAction.rejected.type]);
    });

    it('should dispatch "loginAction.pending", "loginAction.rejected" when network error', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      mockAxiosAdapter.onPost(APIRoute.Login).networkError();

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([loginAction.pending.type, loginAction.rejected.type]);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
    });

    it('should call "dropToken" once with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });

    it('should dispatch "logoutAction.pending", "logoutAction.rejected" when network error', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).networkError();

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([logoutAction.pending.type, logoutAction.rejected.type]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const offers = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, offers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchOffersAction.pending.type, fetchOffersAction.fulfilled.type]);
      expect(fetchOffersActionFulfilled.payload).toEqual(offers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when network error', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).networkError();

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchOffersAction.pending.type, fetchOffersAction.rejected.type]);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    const offerId = '123';
    const route = APIRoute.NearbyOffers.replace(':id', offerId);

    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.fulfilled", when server response 200', async () => {
      const offersNearby = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
      mockAxiosAdapter.onGet(route).reply(200, offersNearby);

      await store.dispatch(fetchOffersNearbyAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersNearbyActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersNearbyAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchOffersNearbyAction.pending.type, fetchOffersNearbyAction.fulfilled.type]);
      expect(fetchOffersNearbyActionFulfilled.payload).toEqual(offersNearby);
    });

    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(route).reply(404);

      await store.dispatch(fetchOffersNearbyAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchOffersNearbyAction.pending.type, fetchOffersNearbyAction.rejected.type]);
    });

    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.rejected" when network error', async () => {
      mockAxiosAdapter.onGet(route).networkError();

      await store.dispatch(fetchOffersNearbyAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchOffersNearbyAction.pending.type, fetchOffersNearbyAction.rejected.type]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled", when server response 200', async () => {
      const favorites = [makeFakeOffer('Paris'), makeFakeOffer('Amsterdam'), makeFakeOffer('Cologne')];
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, favorites);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchFavoritesAction.pending.type, fetchFavoritesAction.fulfilled.type]);
      expect(fetchFavoritesActionFulfilled.payload).toEqual(favorites);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(401);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchFavoritesAction.pending.type, fetchFavoritesAction.rejected.type]);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when network error', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).networkError();

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchFavoritesAction.pending.type, fetchFavoritesAction.rejected.type]);
    });
  });

  describe('fetchCommentsAction', () => {
    const offerId = '123';
    const route = APIRoute.Comments.replace(':id', offerId);

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.fulfilled", when server response 200', async () => {
      const comments = [makeFakeComment(), makeFakeComment(), makeFakeComment()];
      mockAxiosAdapter.onGet(route).reply(200, comments);

      await store.dispatch(fetchCommentsAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchCommentsAction.pending.type, fetchCommentsAction.fulfilled.type]);
      expect(fetchCommentsActionFulfilled.payload).toEqual(comments);
    });

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(route).reply(404);

      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchCommentsAction.pending.type, fetchCommentsAction.rejected.type]);
    });

    it('should dispatch "fetchCommentsAction.pending", "fetchCommentsAction.rejected" when network error', async () => {
      mockAxiosAdapter.onGet(route).networkError();

      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([fetchCommentsAction.pending.type, fetchCommentsAction.rejected.type]);
    });
  });

  describe('fetchOfferByIdAction', () => {
    const offerId = '123';
    const route = APIRoute.OfferById.replace(':id', offerId);

    it('should dispatch "fetchOfferByIdAction.pending" and "fetchOfferByIdAction.fulfilled" when server response 200', async () => {
      const offerById = makeFakeOfferById();
      mockAxiosAdapter.onGet(route).reply(200, offerById);

      await store.dispatch(fetchOfferByIdAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferByIdActionFulfilled = emittedActions[1] as ReturnType<typeof fetchOfferByIdAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([fetchOfferByIdAction.pending.type, fetchOfferByIdAction.fulfilled.type]);
      expect(fetchOfferByIdActionFulfilled.payload).toEqual(offerById);
    });

    it('should dispatch "fetchOfferByIdAction.pending" and "fetchOfferByIdAction.rejected" with status 404 when server response 404', async () => {
      mockAxiosAdapter.onGet(route).reply(404, { error: 'Not found' });

      await store.dispatch(fetchOfferByIdAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferByIdActionRejected = emittedActions[1] as ReturnType<typeof fetchOfferByIdAction.rejected>;

      expect(extractedActionsTypes).toEqual([fetchOfferByIdAction.pending.type, fetchOfferByIdAction.rejected.type]);
      expect(fetchOfferByIdActionRejected.payload).toBe(404);
    });

    it('should dispatch "fetchOfferByIdAction.pending" and "fetchOfferByIdAction.rejected" with undefined when network error', async () => {
      mockAxiosAdapter.onGet(route).networkError();

      await store.dispatch(fetchOfferByIdAction(offerId));

      const emittedActions = store.getActions();
      const fetchOfferByIdActionRejected = emittedActions[1] as ReturnType<typeof fetchOfferByIdAction.rejected>;

      expect(fetchOfferByIdActionRejected.payload).toBeUndefined();
    });
  });

  describe('postCommentAction', () => {
    const fakeComment: NewComment = { comment: '', rating: 1, offerId: '123' };
    const route = APIRoute.Comments.replace(':id', fakeComment.offerId);

    it('should dispatch "postCommentAction.pending", "postCommentAction.fulfilled" when server response 200', async () => {
      mockAxiosAdapter.onPost(route).reply(200);

      await store.dispatch(postCommentAction(fakeComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCommentAction.pending.type, postCommentAction.fulfilled.type]);
    });

    it('should dispatch "postCommentAction.pending", "postCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(route).reply(400);

      await store.dispatch(postCommentAction(fakeComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCommentAction.pending.type, postCommentAction.rejected.type]);
    });

    it('should dispatch "postCommentAction.pending", "postCommentAction.rejected" when server response 401', async () => {
      mockAxiosAdapter.onPost(route).reply(401);

      await store.dispatch(postCommentAction(fakeComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCommentAction.pending.type, postCommentAction.rejected.type]);
    });

    it('should dispatch "postCommentAction.pending", "postCommentAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onPost(route).reply(404);

      await store.dispatch(postCommentAction(fakeComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCommentAction.pending.type, postCommentAction.rejected.type]);
    });

    it('should dispatch "postCommentAction.pending", "postCommentAction.rejected" when network error', async () => {
      mockAxiosAdapter.onPost(route).networkError();

      await store.dispatch(postCommentAction(fakeComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([postCommentAction.pending.type, postCommentAction.rejected.type]);
    });
  });

  describe('postFavoriteStatusAction', () => {
    const newFavoriteStatus: NewFavoriteStatus = { offerId: '123', status: 1 };
    const route = APIRoute.FavoriteStatus.replace(':id', newFavoriteStatus.offerId).replace(':status', String(newFavoriteStatus.status));

    describe('postFavoriteStatusAction success', () => {
      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onPost(route).reply(200);

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.fulfilled.type]);
      });

      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.fulfilled" when server response 201', async () => {
        mockAxiosAdapter.onPost(route).reply(201);

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.fulfilled.type]);
      });
    });

    describe('postFavoriteStatusAction error', () => {
      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onPost(route).reply(400);

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.rejected.type]);
      });

      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.rejected" when server response 401', async () => {
        mockAxiosAdapter.onPost(route).reply(401);

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.rejected.type]);
      });

      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.rejected" when server response 404', async () => {
        mockAxiosAdapter.onPost(route).reply(404);

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.rejected.type]);
      });

      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.rejected" when server response 409', async () => {
        mockAxiosAdapter.onPost(route).reply(409);

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.rejected.type]);
      });

      it('should dispatch "postFavoriteStatusAction.pending", "postFavoriteStatusAction.rejected" when network error', async () => {
        mockAxiosAdapter.onPost(route).networkError();

        await store.dispatch(postFavoriteStatusAction(newFavoriteStatus));
        const actions = extractActionsTypes(store.getActions());

        expect(actions).toEqual([postFavoriteStatusAction.pending.type, postFavoriteStatusAction.rejected.type]);
      });
    });
  });
});
