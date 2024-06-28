import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleResetPassword(event: FormEvent) {
    event.preventDefault();
    try {
      const output = await resetPassword({ username: email });
      //console.log(output);
      const { nextStep } = output;
      //console.log(nextStep);
      if (nextStep.resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
        console.log(`Confirmation code was sent to ${nextStep.codeDeliveryDetails.deliveryMedium}`);
        setStep(2);
      } else if (nextStep.resetPasswordStep === 'DONE') {
        console.log('Successfully reset password.');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("Error resetting password. Please try again.");
    }
  }

  async function handleConfirmResetPassword(event: FormEvent) {
    event.preventDefault();
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword: newPassword,
      });
      alert("Password successfully reset. Please log in with your new password.");
      navigate('/login');
    } catch (error) {
      console.error("Error confirming reset password:", error);
      setError("Error confirming reset password. Please try again.");
    }
  }

  return (
    <div className="forgot-password-container">
      {step === 1 ? (
        <form onSubmit={handleResetPassword} className="forgot-password-form">
          <h2>Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />
          <input type="submit" value="Send Reset Code" />
        </form>
      ) : (
        <form onSubmit={handleConfirmResetPassword} className="forgot-password-form">
          <h2>Confirm Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          <label htmlFor="code">Confirmation Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="on"
            required
          />
          <label htmlFor="newPassword">New Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
          <div className="show-password-reset">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <input type="submit" value="Confirm Reset Password" />
        </form>
      )}
    </div>
  );
}
