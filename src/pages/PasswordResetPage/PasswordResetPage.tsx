import Navbar from "../../components/UI/Navbar/Navbar";
import Footer from "../../components/UI/Footer/Footer";
import "./PasswordResetPage.css";
import passwordResetImg from "../../assets/Reset password-cuate.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../../hooks/apiHook";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading-store";
const PasswordResetPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reCheckPassword, setReCheckPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sendOtp, verifyOtp, resetPassword } = useApi();

  return (
    <>
      <Navbar />
      <div className="password-reset-page-container">
        <div className="password-reset-main-container">
          <div className="password-reset-img">
            <img src={passwordResetImg} alt="password-reset" />
          </div>
          <div className="password-reset-container">
            {isEmailSent && (
              <>
                <div className="back-btn" onClick={() => setIsEmailSent(false)}>
                  <p>
                    <i className="bi bi-arrow-left-circle-fill" /> Back
                  </p>
                </div>
                <h2>Otp</h2>
                <div className="otp-input">
                  <input
                    type="text"
                    placeholder="Otp"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </div>
                <p id="reset-password-text">
                  Please enter the OTP sent to your email address. If you don't
                  receive an email, please make sure you've entered the address
                  you registered with, check your spam folder or request another
                  email.
                </p>
                <div
                  className="next-btn"
                  onClick={() => {
                    dispatch(
                      loadingActions.setLoading({
                        isLoading: true,
                        message: "Verifying OTP",
                      }),
                    );
                    verifyOtp(username, otp).then(() => {
                      // setToken(res);
                      setIsOtpValidated(true);
                      setIsEmailSent(false);
                    });

                    dispatch(
                      loadingActions.setLoading({
                        isLoading: false,
                        message: "",
                      }),
                    );
                  }}
                >
                  <p>
                    Validate <i className="bi bi-arrow-right-circle-fill" />
                  </p>
                </div>
              </>
            )}
            {!isEmailSent && !isOtpValidated && !isPasswordReset && (
              <>
                <h2>Enter Your Username</h2>
                <div className="email-input">
                  <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <p id="reset-password-text">
                  We will send you a link to reset your password. If you don't
                  receive an email, please make sure you've entered the address
                  you registered with, check your spam folder or request another
                  email.
                </p>
                {/* <button>Next</button> */}
                <div
                  className="next-btn"
                  onClick={() => {
                    if (username === "") {
                      alert("Please enter username");
                      return;
                    }
                    dispatch(
                      loadingActions.setLoading({
                        isLoading: true,
                        message: "Sending OTP",
                      }),
                    );
                    sendOtp(username).then((res) => {
                      dispatch(
                        loadingActions.setLoading({
                          isLoading: false,
                          message: "",
                        }),
                      );

                      setIsEmailSent(true);
                      console.log(res);
                    });
                  }}
                >
                  <p>
                    Next <i className="bi bi-arrow-right-circle-fill" />
                  </p>
                </div>
              </>
            )}
            {isOtpValidated && (
              <>
                <h2>Reset Password</h2>
                <div className="password-input">
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="password-input">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setReCheckPassword(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="reset-password-btn"
                  onClick={() => {
                    if (password !== reCheckPassword) {
                      alert("Passwords do not match");
                      return;
                    }
                    resetPassword(username, password).then(() => {
                      setIsPasswordReset(true);
                      setIsOtpValidated(false);
                    });
                  }}
                >
                  <p>
                    Reset Password <i className="bi bi-check-circle-fill" />
                  </p>
                </div>
              </>
            )}
            {isPasswordReset && (
              <>
                <h2>Password Reset</h2>
                <p id="reset-password-text">
                  Your password has been reset successfully.
                </p>
                <div
                  className="back-to-login-btn"
                  onClick={() => {
                    setIsPasswordReset(false);
                    navigate("/login", { state: { linkFor: "login" } });
                  }}
                >
                  <p>
                    Back to Login{" "}
                    <i className="bi bi-arrow-right-circle-fill" />
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default PasswordResetPage;
