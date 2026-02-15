import { useEffect, useState } from "react";
import "./Navbar.css";
import MobileNavbar from "./MobileNavbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store/login-store";
import useAuth from "../../../hooks/authHook";
import { normalUserActions } from "../../../store/normal-user-store";
import { googleUserActions } from "../../../store/google-user-store";
import {
  resetBookedEvent,
  resetRecentlyBookedEvent,
} from "../../../store/booked-event-store";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isLoggedIn = useSelector((state: any) => state.login.isLoggedin);
  console.log(isLoggedIn);

  const dispatch = useDispatch();
  const { googleLogoutHandler } = useAuth();
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 1060) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
    // onscroll , add box shadow to navbar
    window.addEventListener("scroll", () => {
      const navbar = document.querySelector(".navbar") as HTMLElement;
      if (window.scrollY > 0) {
        navbar.style.boxShadow = "0px 17px 22px -10px rgba(0, 0, 0, 0.62)";
      } else {
        navbar.style.boxShadow = "none";
      }
    });
  }, []);
  return (
    <>
      {isMobile ? (
        <MobileNavbar />
      ) : (
        <div className="navbar">
          <div className="logo">
            <h1>BashBoss</h1>
          </div>
          <div className="navlinks">
            <Link to="/">Home</Link>
            <Link to="/browse-events">Events</Link>
            <Link to="/events-near-me">Explore</Link>
            <a href="/">Contact</a>
            {isLoggedIn && <Link to="/user">Profile</Link>}
          </div>
          <div className="register-login-btns">
            {isLoggedIn ? (
              <Link
                to="/"
                id="login-btn"
                onClick={() => {
                  dispatch(loginActions.logout());
                  dispatch(normalUserActions.resetUser());
                  dispatch(googleUserActions.resetGoogleUser());
                  dispatch(resetBookedEvent());
                  dispatch(resetRecentlyBookedEvent());
                  localStorage.removeItem("token");
                  googleLogoutHandler();
                }}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/sign-up"
                  id="register-btn"
                  state={{ linkFor: "register" }}
                >
                  Register
                </Link>
                <Link to="/login" id="login-btn" state={{ linkFor: "login" }}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
