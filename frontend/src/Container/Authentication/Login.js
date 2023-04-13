import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserProfile from "./UserProfile";
import Styles from "./loginForm.module.css";

const LoginForm = () => {
  const [usuario, setUsuario] = useState(null); // cambia el valor inicial a null
  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      setUsuario(response.data.user);
      setToken(response.data.token);
      navigate("/profile");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setUsuario(JSON.parse(user));
      setToken(token);
    }
  }, []);

  const HandleLogout = (e) => {
    e.preventDefault();

    localStorage.clear();
    setUsuario(null);
    setToken("");
    // console.log(usuario);
    navigate("/");
  };

  return (
    <div>
      {usuario ? (
        <UserProfile user={usuario} onClick={HandleLogout} />
      ) : (
        <div className={Styles.body}>
          <div className={Styles.loginContainer}>
            <h1 className={Styles.h1}>Login</h1>
            <form onSubmit={HandleSubmit}>
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
                className={`${Styles.btn} btn btn-primary btn-lg btn-block`}
              >
                Login
              </button>
              {error && (
                <p className="text-center text-bg-danger m-2">{error}</p>
              )}
              <hr />
              <div className={Styles.to_register}>
                <a href="http://localhost:3000/register">
                  Don't have an account?
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
