import { Reviews } from '../../../types/review';
import ReviewListItem from '../review-list-item/review-list-item';

type ReviewListProps = {
  reviews: Reviews;
}

function ReviewList({ reviews } : ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewListItem review={review} key={review.id}/>
      ))}
    </ul>
  );
}

export default ReviewList;
