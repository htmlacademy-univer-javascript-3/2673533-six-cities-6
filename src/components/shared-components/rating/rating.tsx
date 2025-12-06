type RatingProps = {
  className: string;
  ratingValue: number;
}

function Rating({ className, ratingValue }: RatingProps): JSX.Element {
  return (
    <div className={`${className}__rating rating`}>
      <div className={`${className}__stars rating__stars`}>
        <span style={{ width: `${ratingValue}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}

export default Rating;
