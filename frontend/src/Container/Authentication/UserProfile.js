import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.userId;
  console.log( userId )

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:4000/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUser();
  }, [userId]);

  const LogoutButton = ({e}) => {
    return(
      <div>
        <button onClick={e} >Logout</button>
      </div>
    )
  }

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/');
  }

  if (!user) {
    return (
      <div style={{ minHeight: 100 }}>
        <h2>An error occurred</h2>
         <break />

        <p>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <p>Welcome to your profile {user.name}!</p>
      <p>email: {user.email}</p>
      <LogoutButton e={() => handleLogout()} />
    </div>
  );
};

export default Profile;