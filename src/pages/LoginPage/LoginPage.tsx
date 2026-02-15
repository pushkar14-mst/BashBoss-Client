import Footer from "../../components/UI/Footer/Footer";
import Navbar from "../../components/UI/Navbar/Navbar";
import signUpImg from "../../assets/signup-poster.png";
import "./LoginPage.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useApi from "../../hooks/apiHook";
import LoadingModal from "../../components/UI/Modal/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../store/loading-store";
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleLogin } from "@react-oauth/google";
import { loginActions } from "../../store/login-store";
const LoginPage: React.FC = () => {
  const roleOptions: string[] = ["RegularUser", "VenueOwner"];
  const location = useLocation();

  const linkFor = location.state.linkFor?.toString() || "login";
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [formToggler, setFormToggler] = useState<string>(linkFor);
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordScore, setPasswordScore] = useState<number>(0);
  const { register, login } = useApi();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state: any) => state.loading.isLoading);

  const messages: string[] = [
    "Password must contain at least 8 characters",
    "Password must contain at least 1 uppercase letter",
    "Password must contain at least 1 lowercase letter",
    "Password must contain at least 1 number",
    "Password must contain at least 1 special character",
  ];

  const responseMessage = (codeResponse: any) => {
    dispatch(loginActions.login());

    navigate("/user", {
      state: {
        loginType: "google",
        googleCred: {
          clientId: codeResponse.clientId,
          credential: codeResponse.credential,
        },
      },
    });
  };
  const errorMessage = () => {
    console.log("Error signing in with google.");
  };
  const validatePassword = (event: any) => {
    const password = event.target.value;
    const passwordLength = password.length;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*]/;
    if (passwordLength < 8) {
      setPasswordMessage(messages[0]);
    } else if (!upperCase.test(password)) {
      setPasswordMessage(messages[1]);
    } else if (!lowerCase.test(password)) {
      setPasswordMessage(messages[2]);
    } else if (!numbers.test(password)) {
      setPasswordMessage(messages[3]);
    } else if (!specialCharacters.test(password)) {
      setPasswordMessage(messages[4]);
    } else {
      setPasswordMessage("");
    }
  };
  const passwordStrengthSetter = (e: any) => {
    const password = e.target.value;
    const passwordLength = password.length;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const numbers = /[0-9]/;
    const specialCharacters = /[!@#$%^&*]/;
    if (passwordLength < 8) {
      setPasswordScore(0);
    }
    if (passwordLength >= 8) {
      setPasswordScore(1);
    }
    if (upperCase.test(password) && lowerCase.test(password)) {
      setPasswordScore(3);
    }
    if (specialCharacters.test(password) && numbers.test(password)) {
      setPasswordScore(5);
    }
  };

  useEffect(() => {
    const weak = document.querySelector(".weak");
    const average = document.querySelector(".average");
    const strong = document.querySelector(".strong");
    if (passwordScore === 1) {
      weak?.classList.add("active");
    }
    if (passwordScore === 3) {
      weak?.classList.add("active");
      average?.classList.add("active");
    }
    if (passwordScore === 5) {
      weak?.classList.add("active");
      average?.classList.add("active");
      strong?.classList.add("active");
    }
    if (passwordScore === 0) {
      weak?.classList.remove("active");
      average?.classList.remove("active");
      strong?.classList.remove("active");
    }
  }, [passwordStrengthSetter]);

  const confirmPassword = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirm-password",
    ) as HTMLInputElement;

    if (
      confirmPassword.value === password.value &&
      confirmPassword.value !== "" &&
      confirmPassword.value.length === password.value.length
    ) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleRegister = async () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const role = document.getElementById("role") as HTMLSelectElement;
    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      role: role.value,
    };

    if (
      passwordMessage === "" &&
      isPasswordValid &&
      username.value !== "" &&
      email.value !== "" &&
      password.value !== "" &&
      role.value !== ""
    ) {
      dispatch(
        loadingActions.setLoading({
          isLoading: true,
          message: "Registering you to our database...",
        }),
      );
      await register(data);
    } else {
      alert("Please fill the form correctly");
    }
  };
  const handleLogin = async () => {
    const username = document.getElementById(
      "login-username",
    ) as HTMLInputElement;
    const password = document.getElementById(
      "login-password",
    ) as HTMLInputElement;
    const role = document.getElementById("login-role") as HTMLSelectElement;
    const data = {
      username: username.value,
      password: password.value,
    };

    if (username.value !== "" && password.value !== "" && role.value !== "") {
      dispatch(
        loadingActions.setLoading({
          isLoading: true,
          message: "Logging you in...",
        }),
      );
      await login(data);
      username.value = "";
      password.value = "";
    } else {
      alert("Please fill the form correctly");
    }
  };
  return (
    <>
      <Navbar />
      <div className="login-page">
        {formToggler === "register" ? <h1>Register</h1> : <h1>Login</h1>}

        <div className="login-registeration-box">
          <div className="login-poster">
            <img src={signUpImg} alt="" />
          </div>
          <div className="login-registeration-form">
            <div className="form-box">
              {formToggler === "register" ? (
                <>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" />
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => {
                      validatePassword(e);
                      passwordStrengthSetter(e);
                      if (e.target.value === "") {
                        setPasswordScore(0);
                      }
                    }}
                    maxLength={20}
                  />
                  {
                    <>
                      <div className="password-validation">
                        <p>
                          {passwordMessage.length === 0 ? (
                            " "
                          ) : (
                            <p>
                              <span>&#128683;</span> {passwordMessage}
                            </p>
                          )}
                        </p>
                        <div className="password-strength">
                          <div className="weak" />
                          <div className="average" />
                          <div className="strong" />
                        </div>
                      </div>
                      {passwordScore === 5 && (
                        <>
                          <p>
                            <span>&#128526;</span> Strong Password
                          </p>
                        </>
                      )}
                    </>
                  }

                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    onChange={confirmPassword}
                    maxLength={20}
                  />
                  {isPasswordValid ? (
                    " "
                  ) : (
                    <>
                      <div className="password-validation">
                        <p>
                          <span>&#128683;</span> Password does not match
                        </p>
                      </div>
                    </>
                  )}
                  <label htmlFor="role">Role</label>
                  <select name="role" id="role">
                    {roleOptions.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    style={{ margin: "10px" }}
                  />
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    theme="filled_blue"
                    size="large"
                    context="signup"
                    shape="rectangular"
                    useOneTap
                    type="standard"
                  />
                  <button className="register-btn" onClick={handleRegister}>
                    Register
                  </button>
                  <div className="register-link">
                    <p>Already have an account?</p>
                    <button onClick={() => setFormToggler("login")}>
                      Login
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label htmlFor="username">Username</label>
                  <input type="text" id="login-username" />
                  <label htmlFor="password">Password</label>
                  <input type="password" id="login-password" />

                  <label htmlFor="role">Role</label>
                  <select name="role" id="login-role">
                    {roleOptions.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <button className="login-btn" onClick={handleLogin}>
                    Login
                  </button>
                  <div className="forgot-password">
                    <a href="/password-reset">Forgot Password?</a>
                  </div>
                  <div className="register-link">
                    <p>Don't have an account?</p>
                    <button
                      onClick={() => {
                        setFormToggler("register");
                      }}
                    >
                      Register
                    </button>
                  </div>
                  <p>Or</p>
                  <GoogleLogin
                    onSuccess={responseMessage}
                    onError={errorMessage}
                    theme="filled_blue"
                    size="large"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {isLoading && (
        <LoadingModal
          message={
            formToggler === "register" ? "Registering..." : "Logging in..."
          }
        />
      )}
      {/* <LoadingModal message="Registering..." /> */}
    </>
  );
};
export default LoginPage;
