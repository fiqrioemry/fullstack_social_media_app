import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import InputForm from "@/components/form/InputForm";
import { signInControl, signInState } from "@/config";
import { useFormSchema } from "@/hooks/useFormSchema";
import GoogleAuth from "@/components/auth/GoogleAuth";
import InputButton from "@/components/form/InputButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SignIn = () => {
  const { signin, loading } = useAuthStore();
  const signInForm = useFormSchema(
    signInState,
    signInControl,
    signin,
    null,
    false
  );

  return (
    <div className="h-screen flex items-center justify-center mx-2">
      <Card className="max-w-sm w-full border-muted">
        <CardContent className="p-4">
          <div className="py-4 flex items-center justify-center">
            <img src="/Moments.png" className="w-44" />
          </div>
          <InputForm formik={signInForm} formControl={signInControl}>
            <InputButton formik={signInForm} title="Signin" loading={loading} />
          </InputForm>
          <div className="flex items-center justify-center py-2">OR</div>
          <GoogleAuth buttonTitle={"Signin with google"} />
          <CardFooter className="mt-2 space-x-2 flex justify-center">
            <span> Dont have an account ? </span>
            <Link to="/signup" className="btn-secondary">
              signup
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
