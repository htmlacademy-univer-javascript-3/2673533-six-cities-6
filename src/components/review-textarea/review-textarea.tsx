type ReviewTextareaProps = {
  reviewText: string;
  onReviewTextChange: (newText: string) => void;
}

function ReviewTextarea({ reviewText, onReviewTextChange } : ReviewTextareaProps): JSX.Element {
  return (
    <textarea 
      className="reviews__textarea form__textarea" 
      id="review" 
      name="review" 
      placeholder="Tell how was your stay, what you like and what can be improved"
      onChange={(evt) => onReviewTextChange(evt.target.value)}
    >
      {reviewText}
    </textarea>
  );
}

export default ReviewTextarea;
