import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "./Register.module.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      });
      const { user, token } = response.data;

      //Guarda el user en el localstorage
      localStorage.setItem("user", JSON.stringify({ user }));
      localStorage.setItem("token", token);

      //--dirige a login
      navigate('/login');

    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    setError('');
    HandleSubmit();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name,email,password]);

  return (
    <div className={Styles.body}>
      <div className={Styles.form}>
        <h1>Register</h1>
        <form onSubmit={HandleSubmit}>
          <div>
            <label className={Styles.labels}>Username:</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              required
            />
          </div>
          <div>
            <label className={Styles.labels}>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
            />
          </div>
          <div>
            <label className={Styles.labels}>Password:</label>
            <br />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />
          </div>
          <button
            type="submit"
            className={`${Styles.btn} + btn btn-primary btn-lg btn-block`}
          >
            Register
          </button>
          {error && <p className="text-center text-bg-danger m-2">{error}</p>}
          <hr />
          <div className={Styles.to_login}>
            <a href="http://localhost:3000/login">Already have an account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
