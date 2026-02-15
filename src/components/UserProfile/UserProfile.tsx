import ReactCreditCards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./UserProfile.css";
import { useEffect, useState } from "react";
import useApi from "../../hooks/apiHook";
const dummyCardDetails = {
  number: "5011 0544 8859 7827",
  expiry: "12/24",
  cvc: "123",
  name: "Pushkar Patil",
  focus: "name",
};
interface IUserProfileProps {
  id: string;
  name: string;
  bio: string;
  email: string;
  username: string;
  phone: string;
  address: string;
  setUsersName: (name: string) => void;
}
const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const [cardDetails, setCardDetails] = useState(dummyCardDetails);
  const [user, setUser] = useState({
    name: props.name,
    email: props.email,
    bio: props.bio,
    username: props.username,
    phone: props.phone,
    address: props.address,
  });

  const [isUserEditing, setIsUserEditing] = useState({
    name: false,
    email: false,
    username: false,
    bio: false,
    phone: false,
    address: false,
  });

  const [isCardEditing, setIsCardEditing] = useState(false);
  const { fetchProfile, createProfile, updateProfile } = useApi();
  // console.log(isUserEditing);
  const onSaveDetails = async () => {
    const updatedProfile = await updateProfile({
      first_name: user.name.split(" ")[0],
      last_name: user.name.split(" ")[1] || "",
      contact_number: user.phone,
      bio: user.bio,
      address: user.address,
    });
    setIsUserEditing({
      name: false,
      email: false,
      username: false,
      bio: false,
      phone: false,
      address: false,
    });
    if (updatedProfile) {
      alert("Profile updated successfully");
      console.log("updated profile", updatedProfile);
      props.setUsersName(
        updatedProfile.first_name + " " + updatedProfile.last_name
      );
      setUser({
        name: updatedProfile.first_name + " " + updatedProfile.last_name,
        email: props.email,
        bio: updatedProfile.bio,
        username: props.username,
        phone: updatedProfile.contact_number,
        address: updatedProfile.address,
      });
    } else {
      alert("An error occurred while updating the profile.");
    }
  };
  useEffect(() => {
    const checkForProfile = async () => {
      const profile: any = await fetchProfile().then((res) => {
        return res;
      });
      console.log(profile);

      if (profile === null) {
        const data = {
          first_name: props.name.split(" ")[0],
          last_name: props.name.split(" ")[1] || "",
          contact_number: props.phone,
          bio: props.bio,
          address: props.address,
        };
        createProfile(data);
      } else {
        setUser({
          name: profile.first_name + " " + profile.last_name,
          email: props.email,
          bio: profile.bio,
          username: props.username,
          phone: profile.contact_number,
          address: profile.address,
        });
        console.log(user);
      }
    };
    checkForProfile();
  }, []);
  useEffect(() => {
    if (
      isUserEditing.name ||
      isUserEditing.email ||
      isUserEditing.username ||
      isUserEditing.phone ||
      isUserEditing.address ||
      isUserEditing.bio
    ) {
      const userDetails2: HTMLDivElement = document.querySelector(
        ".user-details-2"
      ) as HTMLDivElement;
      userDetails2.style.border = "none";
    } else {
      const userDetails2: HTMLDivElement = document.querySelector(
        ".user-details-2"
      ) as HTMLDivElement;
      userDetails2.style.borderBottom = "1px solid #caf0f8";
    }
  }, [isUserEditing]);
  return (
    <>
      <>
        <div className="user-profile-container">
          <div className="user-profile-header">
            <h1>Your Details</h1>
          </div>
          <div className="user-details-1">
            <p className="user-name">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Name:
              </span>{" "}
              <input
                type="text"
                placeholder="Name"
                value={user.name}
                className="user-input"
                onChange={(e) => {
                  setUser({
                    ...user,
                    name: e.target.value,
                  });
                }}
                disabled={isUserEditing.name ? false : true}
              />{" "}
              <span className="edit-icon">
                <i
                  className={
                    isUserEditing.name ? "bi bi-check" : "bi bi-pencil-square"
                  }
                  onClick={() => {
                    const nameInput: HTMLInputElement = document.querySelector(
                      ".user-name input"
                    ) as HTMLInputElement;
                    setIsUserEditing({
                      ...isUserEditing,
                      name: !isUserEditing.name,
                    });
                    if (isUserEditing.name) {
                      nameInput.style.border = "none";
                      onSaveDetails();
                    } else {
                      nameInput.style.border = "1px solid #caf0f8";
                      nameInput.style.borderRadius = "5px";
                    }
                  }}
                />
              </span>
            </p>
            <p className="user-email">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Email:
              </span>{" "}
              <input
                type="text"
                placeholder="Email"
                value={user.email}
                className="user-input"
                onChange={(e) => {
                  setUser({
                    ...user,
                    email: e.target.value,
                  });
                }}
                disabled={isUserEditing.email ? false : true}
              />
              <span className="edit-icon">
                <i
                  className={
                    isUserEditing.email ? "bi bi-check" : "bi bi-pencil-square"
                  }
                  onClick={() => {
                    const emailInput: HTMLInputElement = document.querySelector(
                      ".user-email input"
                    ) as HTMLInputElement;
                    setIsUserEditing({
                      ...isUserEditing,
                      email: !isUserEditing.email,
                    });
                    if (isUserEditing.email) {
                      emailInput.style.border = "none";
                      onSaveDetails();
                    } else {
                      emailInput.style.border = "1px solid #caf0f8";
                      emailInput.style.borderRadius = "5px";
                    }
                  }}
                />
              </span>
            </p>
          </div>
          <div className="user-details-2">
            <p className="user-username">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Username:
              </span>{" "}
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                className="user-input"
                onChange={(e) => {
                  setUser({
                    ...user,
                    username: e.target.value,
                  });
                }}
                disabled={isUserEditing.username ? false : true}
              />
              <span className="edit-icon">
                <i
                  className={
                    isUserEditing.username
                      ? "bi bi-check"
                      : "bi bi-pencil-square"
                  }
                  onClick={() => {
                    const usernameInput: HTMLInputElement =
                      document.querySelector(
                        ".user-username input"
                      ) as HTMLInputElement;
                    setIsUserEditing({
                      ...isUserEditing,
                      username: !isUserEditing.username,
                    });
                    if (isUserEditing.username) {
                      usernameInput.style.border = "none";
                      onSaveDetails();
                    } else {
                      usernameInput.style.border = "1px solid #caf0f8";
                      usernameInput.style.borderRadius = "5px";
                    }
                  }}
                />
              </span>
            </p>
            <p className="user-bio">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Bio:
              </span>{" "}
              <textarea
                cols={30}
                rows={1}
                placeholder="Bio"
                value={user.bio}
                className="user-input"
                onChange={(e) => {
                  setUser({
                    ...user,
                    bio: e.target.value,
                  });
                }}
                disabled={isUserEditing.bio ? false : true}
              />
              <span className="edit-icon">
                <i
                  className={
                    isUserEditing.bio ? "bi bi-check" : "bi bi-pencil-square"
                  }
                  onClick={() => {
                    const bioInput: HTMLTextAreaElement =
                      document.querySelector(
                        ".user-bio textarea"
                      ) as HTMLTextAreaElement;
                    setIsUserEditing({
                      ...isUserEditing,
                      bio: !isUserEditing.bio,
                    });
                    if (isUserEditing.bio) {
                      bioInput.style.border = "none";
                      onSaveDetails();
                    } else {
                      bioInput.style.border = "1px solid #caf0f8";
                      bioInput.style.borderRadius = "5px";
                    }
                  }}
                />
              </span>
            </p>
            <p className="user-phone">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Phone:
              </span>{" "}
              <input
                type="text"
                placeholder="Phone"
                value={user.phone}
                className="user-input"
                onChange={(e) => {
                  setUser({
                    ...user,
                    phone: e.target.value,
                  });
                }}
                disabled={isUserEditing.phone ? false : true}
              />
              <span className="edit-icon">
                <i
                  className={
                    isUserEditing.phone ? "bi bi-check" : "bi bi-pencil-square"
                  }
                  onClick={() => {
                    const phoneInput: HTMLInputElement = document.querySelector(
                      ".user-phone input"
                    ) as HTMLInputElement;
                    setIsUserEditing({
                      ...isUserEditing,
                      phone: !isUserEditing.phone,
                    });
                    if (isUserEditing.phone) {
                      phoneInput.style.border = "none";
                      onSaveDetails();
                    } else {
                      phoneInput.style.border = "1px solid #caf0f8";
                      phoneInput.style.borderRadius = "5px";
                    }
                  }}
                />
              </span>
            </p>
            <p className="user-address">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Address:
              </span>{" "}
              <textarea
                cols={30}
                rows={1}
                placeholder="Address"
                value={user.address}
                className="user-input"
                onChange={(e) => {
                  setUser({
                    ...user,
                    address: e.target.value,
                  });
                }}
                disabled={isUserEditing.address ? false : true}
              />
              <span className="edit-icon">
                <i
                  className={
                    isUserEditing.address
                      ? "bi bi-check"
                      : "bi bi-pencil-square"
                  }
                  onClick={() => {
                    const addressInput: HTMLTextAreaElement =
                      document.querySelector(
                        ".user-address textarea"
                      ) as HTMLTextAreaElement;
                    setIsUserEditing({
                      ...isUserEditing,
                      address: !isUserEditing.address,
                    });
                    if (isUserEditing.address) {
                      addressInput.style.border = "none";
                      onSaveDetails();
                    } else {
                      addressInput.style.border = "1px solid #caf0f8";
                      addressInput.style.borderRadius = "5px";
                    }
                  }}
                />
              </span>
            </p>
          </div>

          <div className="user-payment-details">
            <h2>Payment Details</h2>
            <div className="payments-container">
              <ReactCreditCards
                number={cardDetails.number}
                name={cardDetails.name}
                expiry={cardDetails.expiry}
                cvc={cardDetails.cvc}
                focused={cardDetails.focus as any}
              />
              {isCardEditing ? (
                <>
                  <div className="card-details-form">
                    <div className="form-group">
                      <label htmlFor="card-number">Card Number</label>
                      <input
                        type="text"
                        id="card-number"
                        placeholder="Card Number"
                        value={cardDetails.number}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            number: e.target.value,
                          })
                        }
                        onFocus={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            focus: e.target.name,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-name">Name</label>
                      <input
                        type="text"
                        id="card-name"
                        placeholder="Name"
                        value={cardDetails.name}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            name: e.target.value,
                          })
                        }
                        onFocus={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            focus: e.target.name,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-expiry">Expiry</label>
                      <input
                        type="text"
                        id="card-expiry"
                        placeholder="Expiry"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                        onFocus={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            focus: e.target.name,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-cvc">CVC</label>
                      <input
                        type="password"
                        id="card-cvc"
                        name="cvc"
                        placeholder="CVC"
                        value={cardDetails.cvc}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvc: e.target.value,
                          })
                        }
                        onFocus={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            focus: e.target.name,
                          })
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="card-details">
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Card Number:
                      </span>{" "}
                      {cardDetails.number}
                    </p>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Name:
                      </span>{" "}
                      {cardDetails.name}
                    </p>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        Expiry:
                      </span>{" "}
                      {cardDetails.expiry}
                    </p>
                    <p>
                      <span
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        CVC:
                      </span>{" "}
                      {cardDetails.cvc}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <button
                onClick={() => {
                  setIsCardEditing(!isCardEditing);
                }}
              >
                {isCardEditing ? (
                  "Save"
                ) : (
                  <>
                    <i className="bi bi-pencil-square" />
                    Edit Card Details
                  </>
                )}
              </button>
              <button>Add a card</button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default UserProfile;
