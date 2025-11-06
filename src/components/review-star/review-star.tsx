type ReviewStarProps = {
  rating: string;
  title: string;
  selected: string;
  onRatingChange: (newRating: string) => void;
}

function ReviewStar({ rating, title, selected, onRatingChange } : ReviewStarProps): JSX.Element {
  return (
    <>
      <input 
        className="form__rating-input visually-hidden"
        name="rating"
        value={rating}
        id={`${rating}-stars`}
        type="radio"
        checked={selected === rating}
        onChange={() => onRatingChange(rating)}
      />
      <label htmlFor={`${rating}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default ReviewStar;
