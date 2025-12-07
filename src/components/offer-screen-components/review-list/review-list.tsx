import { Comments } from '../../../types/comment';
import ReviewListItem from '../review-list-item/review-list-item';

type ReviewListProps = {
  reviews: Comments;
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
