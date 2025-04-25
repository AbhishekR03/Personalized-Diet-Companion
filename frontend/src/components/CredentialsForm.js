import React from "react";
import { Label } from "./ui/label";

const CredentialsForm = ({
  onSubmit,
  formData,
  setFormData,
  submitLabel = "Submit",
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="auth-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="auth-input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="auth-button login-button w-full">
        {submitLabel}
      </button>
    </form>
  );
};

export default CredentialsForm;
