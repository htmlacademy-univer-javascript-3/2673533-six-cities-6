import { Review } from '../../../types/review';
import Rating from '../../shared-components/rating/rating';
import ReviewUser from '../review-user/review-user';

type ReviewListItemProps = {
  review: Review;
}

function ReviewListItem({ review } : ReviewListItemProps): JSX.Element {
  const displayDate = new Date(review.date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <li className="reviews__item">
      <ReviewUser user={review.user} />
      <div className="reviews__info">
        <Rating className="reviews" ratingValue={review.rating} />
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date.split('T')[0]}>{displayDate}</time>
      </div>
    </li>
  );
}

export default ReviewListItem;
