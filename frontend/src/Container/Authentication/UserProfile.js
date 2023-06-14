import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Styles from "./UserProfile.module.css";
import userPicture from "./userPicture/user.png";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const name = params.name;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/profile/${name}`
        );
        setUser(response.data.user[0]);
        localStorage.setItem("name", response.data.user[0].name);
        if (user) {
          console.log(user);
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const LogoutButton = ({ e }) => {
    return (
      <button type="button" class="btn btn-outline-info" onClick={e}>
        Logout
      </button>
    );
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <h2>An error occurred</h2>
        <br />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className={Styles.container}>
        <section className={Styles.userInfo}>
          <div className={Styles.userPicture}>
            <img src={userPicture} alt="userPicture" />
          </div>
          <p>
            Welcome to your profile{" "}
            <span className={Styles.name}>{user.name}</span>!
          </p>
          <p className={Styles.email}>Email: {user.email}</p>

          <section className={Styles.listSection}>
            <h2 className={Styles.adventages}>Adventages</h2>
            <h4>Now That You're Logged You Will Be Able To:</h4>
            <div className={Styles.list}>
              <ul className={Styles.listColumn1}>
                <li>Acess Hundreds Of Content</li>
                <li>Be a Hottest Family Member</li>
                <li>Share Opinion With Others</li>
              </ul>
              <ul className={Styles.listColumn2}>
                <li>Enjoy For Free</li>
                <li>Have A Recreation Time</li>
                <li>Explore Trending Movies and Series</li>
              </ul>
            </div>
          </section>

          <div className={Styles.logoutbutton}>
            <span className={Styles.button}>
              <LogoutButton e={handleLogout} />
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
