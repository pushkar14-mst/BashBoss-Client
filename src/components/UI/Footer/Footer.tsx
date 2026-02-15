import "./Footer.css";
import logo from "../../../assets/BBLogo.png";
const Footer: React.FC = () => {
  return (
    <footer>
      <div className="content">
        <div className="top">
          <div className="logo-details">
            <span className="logo_name">BashBoss</span>
          </div>
          <div className="media-icons">
            <a href="#">
              <i className="bi bi-facebook" />
            </a>
            <a href="#">
              <i className="bi bi-twitter" />
            </a>
            <a href="#">
              <i className="bi bi-instagram" />
            </a>
            <a href="#">
              <i className="bi bi-linkedin" />
            </a>
            <a href="#">
              <i className="bi bi-youtube" />
            </a>
          </div>
        </div>
        <div className="link-boxes">
          <ul className="box">
            <li className="link_name">Company</li>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Explore</a>
            </li>
            <li>
              <a href="#">Get started</a>
            </li>
          </ul>
          <ul className="box">
            <li className="link_name">Account</li>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <a href="#">My account</a>
            </li>
            <li>
              <a href="#">Prefrences</a>
            </li>
            <li>
              <a href="#">Purchase</a>
            </li>
          </ul>
          <ul className="box">
            <li className="link_name">Venue Owner Services</li>
            <li>
              <a href="#">Register</a>
            </li>
            <li>
              <a href="#">Sign In</a>
            </li>
            <li>
              <a href="#">Benefits</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom-details">
        <div className="bottom_text">
          <span className="copyright_text">
            Copyright © 2024{" "}
            <a href="#">
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                }}
              />
            </a>
            All rights reserved
          </span>
          <span className="policy_terms">
            <a href="#">Privacy policy</a>
            <a href="#">Terms & condition</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
