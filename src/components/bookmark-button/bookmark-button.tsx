type BookmarkButtonProps = {
  isInBookmarks: boolean;
}

function BookmarkButton({ isInBookmarks }: BookmarkButtonProps): JSX.Element {
  return (
    <button className={`place-card__bookmark-button ${isInBookmarks ? 'place-card__bookmark-button--active' : ''} button`} type="button">
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isInBookmarks ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
