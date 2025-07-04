/* eslint-disable react/prop-types */
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProcessButton = ({ onClick, title, loading, variant }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className="w-full"
      disabled={loading}
    >
      {loading ? <Loader className="animate-spin" /> : title}
    </Button>
  );
};

export default ProcessButton;
