type RatingProps = {
  ratingValue: number;
}

function Rating({ ratingValue }: RatingProps): JSX.Element {
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: `${ratingValue}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default Rating;
