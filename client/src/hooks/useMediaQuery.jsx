import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", updateMatches);
    updateMatches();

    return () => mediaQueryList.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}
