import { useEffect, useRef, useState } from "react";

const useOpenSlidePanel = () => {
  const panelRef = useRef(null); // Untuk konten panel
  const triggerRef = useRef(null); // Untuk tombol

  const [openPanel, setOpenPanel] = useState(false);

  const handleOpenPanel = () => {
    setOpenPanel((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setOpenPanel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openPanel]);

  return { handleOpenPanel, openPanel, panelRef, triggerRef };
};

export default useOpenSlidePanel;
