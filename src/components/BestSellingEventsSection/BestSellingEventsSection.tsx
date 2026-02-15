import EventGridCard from "../UI/EventGridCard/EventGridCard";
import "./BestSellingEventsSection.css";
interface IEventsAndVenues {
  events: any[];
  venues: any[];
}
const BestSellingEventsSection: React.FC<IEventsAndVenues> = (props) => {
  return (
    <section className="best-selling-events-section">
      <h1 style={{ textAlign: "center" }}>Best Selling Events</h1>
      <div className="best-selling-events-container">
        <div className="best-selling-events-row">
          {props.events.slice(0, 4).map((event) => {
            return (
              <EventGridCard
                title={event.name}
                date={event.startTime.split("T")[0]}
                venueName={
                  props.venues.find((venue: any) => venue.id === event.venueId)
                    ?.name
                }
                image={event.images[0]}
                key={event.name}
                venueId={event.venueId}
                event={event}
                venue={props.venues.find(
                  (venue: any) => venue.id === event.venueId
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default BestSellingEventsSection;
