import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import { API_URL } from "../utils/api";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // console.log("JWT Token: ", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border text-lg p-4">
        <form onSubmit={handleLoginSubmit}>
          <legend className="fieldset-legend">Log In</legend>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="input"
            placeholder="Email"
            onChange={handleEmail}
          />

          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            className="input"
            placeholder="Password"
            onChange={handlePassword}
          />
          <button type="submit" className="btn btn-neutral mt-4">
            Login
          </button>
        </form>
        {errorMessage && <p className="text-error">{errorMessage}</p>}

        <p className="text-sm">Don't have an account yet?</p>
        <Link className="text-sm" to="/signup">
          Sign Up
        </Link>
      </fieldset>
    </div>
  );
}

export default LoginPage;
