import { useNavigate } from "react-router";
import "./EventGridCard.css";
interface EventGridCardProps {
  title: string;
  date: string;
  venueName?: string;
  image: string;
  venueId?: string;
  event?: any;
  venue?: any;
}
const EventGridCard: React.FC<EventGridCardProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div className="event-grid-card">
      <div className="event-grid-card-image">
        <img
          src={props.image}
          alt="Event Title"
          className="event-grid-card-image"
        />
      </div>
      <div className="event-grid-card-content">
        <h3 className="event-grid-card-title">{props.title}</h3>
        <p className="event-grid-card-date">{props.date}</p>
        <p className="event-grid-card-location">{props.venueName}</p>
        <button
          className="view-more-btn"
          onClick={() => {
            navigate(`/event/${props.venueName}`, {
              state: { event: props.event, venue: props.venue },
            });
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};
export default EventGridCard;
