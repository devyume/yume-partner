import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import "./Login.css";
import { signIn } from "aws-amplify/auth";

Amplify.configure(outputs);

interface LoginFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface LoginForm extends HTMLFormElement {
  readonly elements: LoginFormElements;
}

interface LoginProps {
    updateAuthStatus: (authStatus: boolean) => void;
}

export default function Login({ updateAuthStatus }: LoginProps) {
  async function handleSubmit(event: FormEvent<LoginForm>) {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      await signIn({
            username: form.elements.email.value,
            password: form.elements.password.value,
        });
      alert("Login successful!");
      updateAuthStatus(true);
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please check your credentials and try again.");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <input type="submit" value="Login" />
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Go to Register</Link>
        </div>
      </form>
    </div>
  );
}
