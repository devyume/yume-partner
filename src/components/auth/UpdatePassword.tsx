import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updatePassword } from "aws-amplify/auth"; // Import updatePassword function
import "./UpdatePassword.css";

interface UpdatePasswordFormElements extends HTMLFormControlsCollection {
  oldPassword: HTMLInputElement;
  newPassword: HTMLInputElement;
  confirmNewPassword: HTMLInputElement;
}

interface UpdatePasswordForm extends HTMLFormElement {
  readonly elements: UpdatePasswordFormElements;
}

export default function UpdatePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<UpdatePasswordForm>) {
    event.preventDefault();
    const form = event.currentTarget;
    const oldPassword = form.elements.oldPassword.value;
    const newPassword = form.elements.newPassword.value;
    const confirmNewPassword = form.elements.confirmNewPassword.value;

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await updatePassword({
        oldPassword,
        newPassword,
      });
      alert("Password updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Error updating password. Please try again.");
    }
  }

  return (
    <div className="update-password-container">
      <form onSubmit={handleSubmit} className="update-password-form">
        <h2>Update Password</h2>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="oldPassword">Current Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="oldPassword"
          name="oldPassword"
          autoComplete="current-password"
          required
        />
        <label htmlFor="newPassword">New Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="newPassword"
          name="newPassword"
          autoComplete="new-password"
          required
        />
        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="confirmNewPassword"
          name="confirmNewPassword"
          autoComplete="new-password"
          required
        />
        <div className="show-password-update">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <input type="submit" value="Update Password" />
        <div className="update-password-links">
          <Link to="/profile">Profile</Link>
        </div>
      </form>
    </div>
  );
}
