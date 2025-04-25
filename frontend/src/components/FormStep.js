import React from "react";
import ProgressBar from "./ProgressBar";

const FormStep = ({
  title,
  description,
  currentStep,
  totalSteps,
  children,
  onBack,
  onNext,
  showBack = true,
  nextLabel = "Next",
}) => {
  return (
    <div className="flex">
      <div className="card">
        <div className="card-header">
          <h1 className="app-title">{title}</h1>
          <p className="app-description">{description}</p>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
        <div className="card-content">
          {children}
          <div className="button-group">
            {showBack && (
              <button
                type="button"
                onClick={onBack}
                className="auth-button register-button"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              onClick={onNext}
              className="auth-button login-button"
            >
              {nextLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStep;
