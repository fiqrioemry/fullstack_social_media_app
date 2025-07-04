import { useEffect, useRef } from "react";

const useScrollToView = (state, loading) => {
  const viewRef = useRef(null);

  useEffect(() => {
    viewRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state, loading]);

  return { viewRef };
};

export default useScrollToView;
