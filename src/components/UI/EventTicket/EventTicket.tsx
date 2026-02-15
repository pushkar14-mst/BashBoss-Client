import "./EventTicket.css";

interface IEventTicketProps {
  amount: number;
  eventName: string;
  eventLocation: string;
  eventTime: string;
  eventDate: string;
  userName: string;
}
const EventTicket: React.FC<IEventTicketProps> = (props) => {
  return (
    <>
      <div className="cardWrap">
        <div className="card cardLeft">
          <h1>
            BashBoss <span>Events</span>
          </h1>
          <div className="title">
            <h2>{props.eventName}</h2>
            <span>Event</span>
          </div>
          <div className="name">
            <h2>{props.userName}</h2>
            <span>name</span>
          </div>
          <div className="seat">
            <h2>{props.amount}</h2>
          </div>
          <div className="time">
            <h2>12:00</h2>
          </div>
        </div>
        <div className="card cardRight">
          <div className="dollar">
            <i className="bi bi-currency-dollar"></i>
          </div>
          <div className="number">
            <h3>{props.amount}</h3>
            <span>Amount</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventTicket;
