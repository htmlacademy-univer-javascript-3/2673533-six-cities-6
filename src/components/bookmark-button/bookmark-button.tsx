type BookmarkButtonProps = {
  isInBookmarks: boolean;
  className: string;
  width: string;
  height: string;
}

function BookmarkButton({ isInBookmarks, className, width, height }: BookmarkButtonProps): JSX.Element {
  return (
    <button className={`${className}__bookmark-button ${isInBookmarks ? `${className}__bookmark-button--active` : ''} button`} type="button">
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{isInBookmarks ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default BookmarkButton;
