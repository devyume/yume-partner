import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Amplify } from "aws-amplify";
// import outputs from "../../amplify_outputs.json";
import "./Login.css";
import { getCurrentUser, signIn, signOut } from "aws-amplify/auth";

// Amplify.configure(outputs);

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      try {
        //await signOut()
        const user = await getCurrentUser();
        //console.log(user);
        if (user) {
          updateAuthStatus(true);
          navigate('/');
        }
      } catch (error) {
        // No user is signed in, proceed with login
      }
    }
    checkUser();
  }, [navigate,updateAuthStatus]);
  
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
      navigate('/');  
      // const isNewUser = user.attributes['custom:isNewUser']; // Replace with actual attribute

      // if (isNewUser) {
      //   navigate('/profile');
      // } else {
      //   navigate('/');
      // }
    } catch (error: any) {
      console.error("Error logging in:", error);
    if (error.code === 'UserNotFoundException' || error.code === 'NotAuthorizedException') {
      setError("Invalid email or password. Please try again.");
      alert("Invalid email or password. Please try again.");
    } else if (error.code === 'UserNotConfirmedException') {
      setError("Account not confirmed. Please check your email for confirmation instructions.");
      alert("Account not confirmed. Please check your email for confirmation instructions.");
    } else if (error.code === 'PasswordResetRequiredException') {
      setError("Password reset required. Please reset your password.");
      alert("Password reset required. Please reset your password.");
    } else {
      setError("Error logging in. Please check your credentials and try again.");
      alert("Error logging in. Please check your credentials and try again.");
    }
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" autoComplete="username" required />
        <label htmlFor="password">Password:</label>
        <input type={showPassword ? "text" : "password"} id="password" name="password" autoComplete="current-password" required />
        <div className="show-password">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <input type="submit" value="Login" />
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/register">Go to Register</Link>
        </div>
      </form>
    </div>
  );
}
