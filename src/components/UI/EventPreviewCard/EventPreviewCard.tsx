// import { useState } from "react";
import "./EventPreviewCard.css";

interface IEventDetails {
  title: string;
  date: string;
  venue?: string;
}
const EventPreviewCard: React.FC<IEventDetails> = (props) => {
  let date = props.date.split(" ");
  let day = new Date(date[0]).toLocaleDateString("en-US", {
    day: "numeric",
  });
  let month = new Date(date[0]).toLocaleDateString("en-US", {
    month: "short",
  });
  // const [hovered, setHovered] = useState(false);
  return (
    <div className="event-preview-card">
      <h2 id="event-title">{props.title}</h2>
      <div
        className="event-date"
        // onMouseOver={() => {
        //   setHovered(true);
        // }}
        // onMouseOut={() => {
        //   setHovered(false);
        // }}
      >
        <h2>{day}</h2>
        <h4>{month}</h4>
      </div>
      <p id="event-venue">{props.venue}</p>
    </div>
  );
};
export default EventPreviewCard;
