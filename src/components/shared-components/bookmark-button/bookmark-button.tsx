import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchFavoritesAction, postFavoriteStatusAction } from '../../../store/api-actions';
import { addToFavoritesCount } from '../../../store/favorites-data/favorites-data';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import { AppRoute, AuthorizationStatus } from '../../../const';

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  className: string;
  width: string;
  height: string;
  fetchFavoritesIsNeeded?: boolean;
}

function BookmarkButton({ offerId, isFavorite, className, width, height, fetchFavoritesIsNeeded = false }: BookmarkButtonProps): JSX.Element {
  const [currentIsFavorite, setCurrentIsFavorite] = useState(isFavorite);
  const [isUpdating, setIsUpdating] = useState(false);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handleOnClick = useCallback(() => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    } else if (!isUpdating) {
      setIsUpdating(true);
      dispatch(postFavoriteStatusAction({
        offerId,
        status: currentIsFavorite ? 0 : 1
      }))
        .unwrap()
        .then(() => {
          dispatch(addToFavoritesCount(currentIsFavorite ? -1 : 1));
          setCurrentIsFavorite((prev) => !prev);
          if (fetchFavoritesIsNeeded) {
            dispatch(fetchFavoritesAction());
          }
        })
        .finally(() => {
          setIsUpdating(false);
        });
    }
  }, [dispatch, offerId, currentIsFavorite, isUpdating, authorizationStatus, navigate, fetchFavoritesIsNeeded]);

  const newClassName = `${className}__bookmark-button ${currentIsFavorite ? `${className}__bookmark-button--active` : ''} button`;

  return (
    <button className={newClassName} type="button" onClick={handleOnClick} disabled={isUpdating} >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{currentIsFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
