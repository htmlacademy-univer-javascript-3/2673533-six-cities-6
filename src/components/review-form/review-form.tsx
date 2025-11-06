import { FormEvent, useState } from "react";
import ReviewHelp from "../review-help/review-help";
import ReviewStar from "../review-star/review-star";
import ReviewTextarea from "../review-textarea/review-textarea";

function ReviewForm(): JSX.Element {
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleReviewTextChange = (newText: string) => {
    setReviewText(newText);
  }

  const handleRatingChange = (newRating: string) => {
    setRating(newRating);
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(rating, reviewText); // тест. Пока некуда отправлять данные формы
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <ReviewStar rating="5" title="perfect" selected={rating} onRatingChange={handleRatingChange} />
        <ReviewStar rating="4" title="good" selected={rating} onRatingChange={handleRatingChange} />
        <ReviewStar rating="3" title="not bad" selected={rating} onRatingChange={handleRatingChange} />
        <ReviewStar rating="2" title="badly" selected={rating} onRatingChange={handleRatingChange} />
        <ReviewStar rating="1" title="terribly" selected={rating} onRatingChange={handleRatingChange} />
      </div>
      <ReviewTextarea reviewText={reviewText} onReviewTextChange={handleReviewTextChange}/>
      <div className="reviews__button-wrapper">
        <ReviewHelp />
        <button 
          className="reviews__submit form__submit button"
          type="submit" 
          disabled={!rating || reviewText.length < 50}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
