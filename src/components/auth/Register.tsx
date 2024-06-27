import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import "./Register.css";
import { signUp } from "aws-amplify/auth";

Amplify.configure(outputs);

interface RegisterFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
  readonly elements: RegisterFormElements;
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<RegisterForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const email = form.elements.email.value;

    try {
      await signUp({
        username: form.elements.email.value,
        password: form.elements.password.value,
      });
      alert("We've sent you the code. Please check email!");
      navigate('/validate', { state: { email: email } });
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Error signing up. Please try again.");
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" autoComplete="username" required />
        <label htmlFor="password">Password:</label>
        <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="new-password"required />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type={confirmShowPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" autoComplete="new-password"required />
        <div className="show-password-register">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
          <input
            type="checkbox"
            id="showPassword"
            checked={confirmShowPassword}
            onChange={() => setConfirmShowPassword(!confirmShowPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <input type="submit" value="Register" />
        <div className="register-links">
          <Link to="/login">Login</Link>
          <Link to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
