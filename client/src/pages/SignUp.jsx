import {
  signUpState,
  signUpControl,
  sendOTPControl,
  verifyOTPControl,
} from "@/config";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StepOne from "@/components/auth/StepOne";
import StepTwo from "@/components/auth/StepTwo";
import StepThree from "@/components/auth/StepThree";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormSchema } from "@/hooks/useFormSchema";
import { Card, CardContent } from "@/components/ui/card";

const SignUp = () => {
  const navigate = useNavigate();
  const { step, signup, resetStep, loading } = useAuthStore();

  const getFormControl = () => {
    switch (step) {
      case 1:
        return sendOTPControl;
      case 2:
        return verifyOTPControl;
      case 3:
        return signUpControl;
      default:
        return [];
    }
  };

  const signUpForm = useFormSchema(
    signUpState,
    getFormControl(),
    signup,
    navigate,
    false
  );

  useEffect(() => {
    resetStep();
  }, [resetStep]);

  return (
    <div className="h-screen flex items-center justify-center mx-2">
      <Card className="max-w-sm w-full border-muted">
        <CardContent className="p-4">
          <div className="py-4 flex items-center justify-center">
            <img src="/Moments.png" className="w-44" />
          </div>
          <div className="h-72 ">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <Loader size={50} className="animate-spin" />
              </div>
            ) : (
              <>
                {step === 1 && (
                  <StepOne
                    signUpForm={signUpForm}
                    formControl={sendOTPControl}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    signUpForm={signUpForm}
                    formControl={verifyOTPControl}
                  />
                )}

                {step === 3 && (
                  <StepThree
                    signUpForm={signUpForm}
                    formControl={signUpControl}
                  />
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
