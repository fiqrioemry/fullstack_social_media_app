/* eslint-disable react/prop-types */

import { Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import InputButton from "@/components/form/InputButton";

const StepTwo = ({ signUpForm, formControl }) => {
  const { resendOTP } = useAuthStore();
  const [countdown, setCountdown] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (countdown === 0) {
      setIsResendDisabled(false);
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResendOTP = () => {
    resendOTP(signUpForm.values.email);
    setIsResendDisabled(true);
    setCountdown(countdown + 30);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="flex justify-center">
          <Mail size={40} />
        </div>

        <div className="text-center">
          <h5>Enter Verification Code</h5>
          <p className="text-sm">Your verification code has been sent to:</p>
          <span>{signUpForm.values.email}</span>
        </div>
      </div>
      <div className="text-center">
        <InputForm formik={signUpForm} formControl={formControl}>
          <InputButton title={"Submit"} formik={signUpForm} />
        </InputForm>
        <div className="text-sm mt-2">
          {countdown > 0 ? (
            <span>
              Please wait <b>{countdown}s</b> to resend code
            </span>
          ) : (
            <span>
              Did not receive the code?{" "}
              <button
                className="btn-secondary"
                type="button"
                onClick={handleResendOTP}
                disabled={isResendDisabled}
              >
                Resend
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
