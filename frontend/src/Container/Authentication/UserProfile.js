import React from "react";

const UserProfile = ({ usuario, onClick }) => {
  return (
    <div>
      {usuario ? (
        <>
          <p>Welcome to your profile, {usuario.name}</p>
          <br />
          <p>Your email addres is: {usuario.email}</p>
          <button onClick={onClick}>Logout</button>
        </>
      ) : (
        <>
          <h4>Loading...</h4>
        </>
      )}
    </div>
  );
};

export default UserProfile;
