/* eslint-disable react/prop-types */
import InputForm from "@/components/form/InputForm";
import InputButton from "@/components/form/InputButton";

const StepThree = ({ signUpForm, formControl }) => {
  return (
    <InputForm formik={signUpForm} formControl={formControl}>
      <InputButton title={"signup"} formik={signUpForm} />
    </InputForm>
  );
};

export default StepThree;
