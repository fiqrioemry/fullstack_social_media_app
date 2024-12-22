/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

export function handleResize({ active, setActive }) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768 && active) setActive(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
