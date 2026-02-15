import { useEffect, useState } from "react";
import "./ReviewsAccordian.css";

interface IReview {
  name?: string;
  rating?: number;
  comment?: string;
  date?: string;
}
interface IReviewsAccordianCardProps {
  reviews?: IReview[];
}

const ReviewsAccordian: React.FC<IReviewsAccordianCardProps> = (props) => {
  const [ratingExpanded, setRatingExpanded] = useState({
    expanded: false,
    index: 0,
  }) as any;

  useEffect(() => {
    const maxRating = 5;
    const minRating = 1;
    const reviews = props.reviews;
    const reviewCircle = document.querySelectorAll(".review-rating-circle");
    const outterCircle = document.querySelectorAll(
      ".review-rating-circle-outter"
    );
    outterCircle.forEach((circle: any, index) => {
      const rating = reviews?.[index].rating;
      const innerCircle = reviewCircle[index] as HTMLDivElement;
      const percentage =
        ((rating! - minRating) / (maxRating - minRating)) * 100;
      circle.style.background = `conic-gradient(#6b6b6b ${percentage}%, #6b6b6b69 0%)`;
      innerCircle.style.background = `conic-gradient(#caf0f8 ${percentage}%, #caf0f8 0%)`;
    });
  }, [props.reviews]);
  return (
    <>
      <h2
        style={{
          marginTop: "20px",
          marginBottom: "0px",
        }}
      >
        Reviews :
      </h2>
      <div className="reviews-accordian-container">
        <div className="reviews-accordian">
          {props.reviews?.map((review, index) => {
            const day = new Date(review?.date!).getDate().toString();
            const month = new Date(review?.date!).toLocaleString("default", {
              month: "long",
            });
            const year = new Date(review?.date!).getFullYear().toString();
            return (
              <>
                <div
                  key={index}
                  className="review-card"
                  onClick={() => {
                    setRatingExpanded({
                      expanded: !ratingExpanded.expanded,
                      index: index,
                    });
                  }}
                >
                  <div className="review-card-header">
                    <h3>{review.name}</h3>
                    <p>{`${day} ${month} ${year}`}</p>
                  </div>
                  <div className="review-rating-circle-outter">
                    <div className="review-rating-circle">
                      <p>{review.rating}</p>
                    </div>
                  </div>
                </div>
                {ratingExpanded.expanded && ratingExpanded.index === index ? (
                  <div className="review-comment">
                    <p>{review.comment}</p>
                  </div>
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ReviewsAccordian;
