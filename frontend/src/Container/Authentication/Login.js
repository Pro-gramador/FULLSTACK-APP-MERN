import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Styles from "./loginForm.module.css";


const LoginForm = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      if (user) {
        console.log(user);
      }
      // redirigir al usuario a su perfil
      navigate(`/profile/${response.data.user.name}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <div className={Styles.body}>
        <div className={Styles.loginContainer}>
          <h1 className={Styles.h1}>Login</h1>
          <form onSubmit={handleSubmit}>
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
            {error && <p className="text-center text-bg-danger m-2">{error}</p>}
            <hr />
            <div className={Styles.to_register}>
              <a href="http://localhost:3000/register">
                Don't have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
