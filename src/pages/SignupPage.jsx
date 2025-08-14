import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../utils/api";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border text-lg p-4">
        <form onSubmit={handleSignupSubmit}>
          <legend className="fieldset-legend">Sign Up</legend>

          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            className="input"
            placeholder="Email"
            onChange={handleEmail}
          />

          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            className="input"
            placeholder="Name"
            onChange={handleName}
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
            Sign Up
          </button>
        </form>
        {errorMessage && <p className="text-error">{errorMessage}</p>}

        <p className="text-sm">Already have an account?</p>
        <Link className="text-sm" to="/login">
          Login
        </Link>
      </fieldset>
    </div>
  );
}

export default SignupPage;
