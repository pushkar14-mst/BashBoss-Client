import "./UpcomingEventsSection.css";
import upcomingEventImg from "../../assets/upcoming-events.png";
import EventPreviewCard from "../UI/EventPreviewCard/EventPreviewCard";

interface IEventForCards {
  title: string;
  date: string;
  venue?: string;
}
interface IEventsForCards {
  events: IEventForCards[];
}

const UpcomingEventsSection: React.FC<IEventsForCards> = (props) => {
  return (
    <>
      <section className="upcoming-events-section">
        <h1 style={{ textAlign: "center", marginTop: "0" }}>Upcoming Events</h1>
        <div className="upcoming-events-container">
          <div className="upcoming-events">
            {props.events
              .filter((event: any) => {
                console.log(new Date(event.date).getDate());

                return new Date(event.date).getDate() > new Date().getDate();
              })
              .sort((a: any, b: any) => {
                return (
                  new Date(a.date).getMonth() - new Date(b.date).getMonth()
                );
              })
              .sort((a: any, b: any) => {
                return new Date(a.date).getDate() - new Date(b.date).getDate();
              })
              .splice(0, 4)
              .map((event) => (
                <EventPreviewCard
                  title={event.title}
                  date={event.date}
                  venue={event.venue}
                  key={event.title}
                />
              ))}
          </div>
          <div className="upcoming-events-img-container">
            <img src={upcomingEventImg} alt="upcoming events" />
          </div>
        </div>
      </section>
    </>
  );
};
export default UpcomingEventsSection;
