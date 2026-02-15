import { useState } from "react";
import "./ReviewForm.css";

// interface IReviewProps {
//   eventName: string;
// }
const ReviewForm = () => {
  const [review, setReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  return (
    <div className="review-form-container">
      <h2>Write a Review</h2>
      <form
        className="review-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(review);
        }}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={(e) => {
            setReview({
              ...review,
              name: e.target.value,
            });
          }}
        />
        <label htmlFor="rating">Rating</label>
        <input
          type="number"
          name="rating"
          id="rating"
          min={1}
          max={5}
          required
          onChange={(e) => {
            setReview({
              ...review,
              rating: parseInt(e.target.value),
            });
          }}
        />
        <label htmlFor="comment">Comment</label>
        <textarea
          name="comment"
          id="comment"
          required
          onChange={(e) => {
            setReview({
              ...review,
              comment: e.target.value,
            });
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
