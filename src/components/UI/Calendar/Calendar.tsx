import "./Calendar.css";

interface ICalendarProps {
  day: string[];
  month: string;
  year: string;
}

const Calendar: React.FC<ICalendarProps> = (props) => {
  let currentMonth = new Date().toLocaleString("default", { month: "long" });
  let monthWiseDays: any = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };
  // console.log("Current day", typeof new Date().getDate());

  return (
    <div className="calendar">
      <div className="month">
        {/* <a href="#" className="nav">
          <i className="bi bi-chevron-left"></i>
        </a> */}
        <div>
          {props.month}
          <span className="year">{props.year}</span>
        </div>
        {/* <a href="#" className="nav">
          <i className="bi bi-chevron-right"></i>
        </a> */}
      </div>
      <div className="days">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
      <div className="dates">
        {Array.from({ length: monthWiseDays[currentMonth] }, (_, i) => (
          <button
            key={i + 1}
            className={
              props.day.includes((i + 1).toString())
                ? i + 1 >= new Date().getDate()
                  ? "today"
                  : "completed"
                : ""
            }
          >
            <time>{i + 1}</time>
          </button>
        ))}
      </div>
    </div>
  );
};
export default Calendar;
