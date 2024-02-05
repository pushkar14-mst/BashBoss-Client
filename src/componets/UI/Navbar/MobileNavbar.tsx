import { useState } from "react";
import "./MobileNavbar.css";

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
        <a href="/">Home</a>
        <a href="/">Events</a>
        <a href="/">Services</a>
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
        <a href="/" id="register-btn">
          Register
        </a>
        <a href="/" id="login-btn">
          Login
        </a>
      </div>
    </div>
  );
};
export default MobileNavbar;

{
  /* <div className="login-register-btns-mobile">
  <a href="/" id="register-btn">
    Register
  </a>
  <a href="/" id="login-btn">
    Login
  </a>
</div>; */
}