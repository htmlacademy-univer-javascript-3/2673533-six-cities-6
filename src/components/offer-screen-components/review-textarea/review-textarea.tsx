type ReviewTextareaProps = {
  reviewText: string;
  disabled: boolean;
  onReviewTextChange: (newText: string) => void;
}

function ReviewTextarea({ reviewText, disabled, onReviewTextChange } : ReviewTextareaProps): JSX.Element {
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      disabled={disabled}
      placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={(evt) => onReviewTextChange(evt.target.value)}
      value={reviewText}
    />
  );
}

export default ReviewTextarea;
