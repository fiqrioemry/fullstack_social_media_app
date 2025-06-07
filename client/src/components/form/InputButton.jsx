/* eslint-disable react/prop-types */
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const InputButton = ({ formik, title, loading, type = "submit" }) => {
  return (
    <Button
      type={type}
      variant="accent"
      className="w-full"
      disabled={!((formik.isValid && formik.dirty) || loading)}
    >
      {loading ? <Loader className="animate-spin" /> : title}
    </Button>
  );
};

export default InputButton;
