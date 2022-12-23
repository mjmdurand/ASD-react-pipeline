/*
 * Note.
 * This component is only used for unit test.
 */

import React, { useState } from "react";

import { postUser } from "../api/user";

const LoginForm = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const { email, password } = account;
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState({
    email: "",
    password: "",
    emailOrPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabled(true);
    e.preventDefault();
    try {
      const { user } = await postUser("/users/login", {
        user: {
          email: email,
          password: password,
        },
      });
    } catch (e: any) {
      const errorMessage = e.response.data.errors;
      setError({
        email: errorMessage.email,
        password: errorMessage.password,
        emailOrPassword: errorMessage["email or password"],
      });
    }
    setDisabled(false);
  };

  return (
    <>
      <ul className="error-messages">
        {error.email && <li>email can't be blank</li>}
        {error.password && <li>password can'be blank</li>}
        {error.emailOrPassword && <li>email or password is invalid</li>}
      </ul>

      <form onSubmit={(e) => handleLogin(e)}>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            disabled={disabled}
            autoComplete="off"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            disabled={disabled}
          />
        </fieldset>
        <button
          className="btn btn-lg btn-primary pull-xs-right"
          disabled={disabled}
        >
          Sign in
        </button>
      </form>
    </>
  );
};

export default LoginForm;
