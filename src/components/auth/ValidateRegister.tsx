import React, { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { confirmSignUp } from "aws-amplify/auth";
import "./ValidateRegister.css";

interface ValidateFormElements extends HTMLFormControlsCollection {
  confirmationCode: HTMLInputElement;
}

interface ValidateForm extends HTMLFormElement {
  readonly elements: ValidateFormElements;
}

const Validate: React.FC  = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const email = (location.state as any)?.email;

  async function handleSubmit(event: FormEvent<ValidateForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    const confirmationCode = form.elements.confirmationCode.value;
    console.log(confirmationCode);

    try {
      const result = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });

      console.log('Confirmation result:', result);

      
      if (result) { 
        navigate('/login');
      } else {
        setError("Invalid confirmation code. Please try again.");
      }
    } catch (error) {
      console.error("Error confirming sign-up:", error);
      setError("Error confirming sign-up. Please try again.");
    }
  }

  return (
    <div className="validate-container">
      <form onSubmit={handleSubmit} className="validate-form">
        <h2>Validate Account</h2>
        <p>We've sent a confirmation code to {email}. Please check your email.</p>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="confirmationCode">Confirmation Code:</label>
        <input type="text" id="confirmationCode" name="confirmationCode" required />
        <input type="submit" value="Validate" />
        <div className="validate-links">
          <Link to="/forgot-password">Register?</Link>
          <Link to="/register">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Validate;
