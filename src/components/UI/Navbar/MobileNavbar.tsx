import { useState } from "react";
import "./MobileNavbar.css";
import { Link } from "react-router-dom";

interface ISideBarProps {
  closeSetter: () => void;
}
const MobileNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const closeSetter = () => {
    setShowSidebar(false);
  };
  return (
    <div className="mobile-navbar">
      <div className="mobile-logo">
        <h1>BashBoss</h1>
      </div>
      <div className="toggle-menu-btn">
        <button
          className="toggle-btn"
          onClick={() => {
            setShowSidebar(!showSidebar);
          }}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      {showSidebar && <SideBar closeSetter={closeSetter} />}
    </div>
  );
};
const SideBar: React.FC<ISideBarProps> = (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h1>BashBoss</h1>
      </div>
      <div className="sidebar-navlinks">
        <Link to="/">Home</Link>
        <Link to="/browse-events">Events</Link>
        <Link to="/events-near-me">Explore</Link>
        <a href="/">Contact</a>
      </div>
      <div
        className="close-btn"
        onClick={() => {
          props.closeSetter();
        }}
      >
        <i className="bi bi-x"></i>
      </div>
      <div className="sidebar-register-login-btns">
        <Link to="/sign-up" id="register-btn" state={{ linkFor: "register" }}>
          Register
        </Link>
        <Link to="/login" id="login-btn" state={{ linkFor: "login" }}>
          Login
        </Link>
      </div>
    </div>
  );
};
export default MobileNavbar;
