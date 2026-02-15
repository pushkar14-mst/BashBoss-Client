import bannerImg from "../../assets/banner.png";
import "./HeroSection.css";
const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-section-container">
        <div className="hero-section-img">
          <img src={bannerImg} alt="banner" />
        </div>
        <div className="hero-section-text">
          <h1>BashBoss</h1>
          <h3>One Platform for all events.</h3>
          <p>
            Welcome to BashBoss – Your Gateway to Unforgettable Events! Explore
            a diverse array of upcoming gatherings and seamlessly register for
            the experiences that resonate with you. Elevate your event journey
            with BashBoss, where every moment becomes a celebration.
          </p>
          <div className="lets-get-started">
            <button className="lets-get-started-btn">Let's Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
