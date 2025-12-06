type RatingProps = {
  className: string;
  ratingValue: number;
  children?: JSX.Element;
}

function Rating({ className, ratingValue, children }: RatingProps): JSX.Element {
  return (
    <div className={`${className}__rating rating`}>
      <div className={`${className}__stars rating__stars`}>
        <span style={{ width: `${Math.round(ratingValue) * 20}%` }}></span>
        <span className="visually-hidden">Rating</span>
      </div>
      {children}
    </div>
  );
}

export default Rating;
