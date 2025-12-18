import { FormEvent, useState } from 'react';
import ReviewHelp from '../review-help/review-help';
import ReviewStar from '../review-star/review-star';
import ReviewTextarea from '../review-textarea/review-textarea';
import { useAppDispatch } from '../../../hooks';
import { fetchCommentsAction, postCommentAction } from '../../../store/api-actions';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../../const';

type ReviewFormProps = {
  offerId: string;
}

function ReviewForm({ offerId } : ReviewFormProps): JSX.Element {
  const [rating, setRating] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const dispatch = useAppDispatch();

  const handleReviewTextChange = (newText: string) => {
    setReviewText(newText);
  };

  const handleRatingChange = (newRating: string) => {
    setRating(newRating);
  };

  const handleOnSubmit = (evt: FormEvent<HTMLFormElement>) => {
    setIsBlocked(true);
    evt.preventDefault();
    if (rating && reviewText.length >= MIN_REVIEW_LENGTH && reviewText.length <= MAX_REVIEW_LENGTH) {
      dispatch(postCommentAction({
        comment: reviewText,
        rating: Number(rating),
        offerId: offerId,
      })).unwrap().then(() => {
        dispatch(fetchCommentsAction(offerId));
      });
    }
    setIsBlocked(false);
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleOnSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <ReviewStar rating="5" title="perfect" selected={rating} onRatingChange={handleRatingChange} disabled={isBlocked}/>
        <ReviewStar rating="4" title="good" selected={rating} onRatingChange={handleRatingChange} disabled={isBlocked}/>
        <ReviewStar rating="3" title="not bad" selected={rating} onRatingChange={handleRatingChange} disabled={isBlocked}/>
        <ReviewStar rating="2" title="badly" selected={rating} onRatingChange={handleRatingChange} disabled={isBlocked}/>
        <ReviewStar rating="1" title="terribly" selected={rating} onRatingChange={handleRatingChange} disabled={isBlocked}/>
      </div>
      <ReviewTextarea reviewText={reviewText} onReviewTextChange={handleReviewTextChange} disabled={isBlocked}/>
      <div className="reviews__button-wrapper">
        <ReviewHelp />
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!rating || reviewText.length < MIN_REVIEW_LENGTH || reviewText.length > MAX_REVIEW_LENGTH || isBlocked}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
