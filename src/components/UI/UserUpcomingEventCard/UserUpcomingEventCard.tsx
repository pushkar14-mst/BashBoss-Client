import "./UserUpcomingEventCard.css";

interface IEvent {
  title: string;
  date: string;
  venue: string;
  image: string;
  time?: string;
}
const UserUpcomingEventCard: React.FC<IEvent> = (props) => {
  return (
    <>
      <div className="user-upcoming-event-card">
        <div className="event-pic">
          <img src={props.image} alt="Event Pic" />
        </div>
        <div className="event-info-container">
          <h2>{props.title}</h2>
          <p>{props.venue}</p>
          <p>{props.date}</p>
          <p>{props.time}</p>
        </div>
      </div>
    </>
  );
};
export default UserUpcomingEventCard;
