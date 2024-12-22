/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

export function handleClickOutside({ active, setActive, searchPanel }) {
  return useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchPanel.current &&
        !searchPanel.current.contains(event.target) &&
        active
      ) {
        setActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}
