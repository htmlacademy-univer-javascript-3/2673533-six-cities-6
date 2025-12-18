import { Comments } from '../../../types/comment';
import ReviewListItem from '../review-list-item/review-list-item';

type ReviewListProps = {
  reviews: Comments;
}

function ReviewList({ reviews } : ReviewListProps): JSX.Element {
  const sortedReviews = [...reviews]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <ReviewListItem review={review} key={review.id}/>
      ))}
    </ul>
  );
}

export default ReviewList;
