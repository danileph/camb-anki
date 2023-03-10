import { useEffect, useRef, useState } from "react";

// Hook that returns true if clicked inside and false if clicked outside of the passed ref
export function useInsideClickAlerter<T extends HTMLElement>(
  ref: React.RefObject<T>
) {
  // State for keeping track of whether click is inside or outside
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    // Update state if clicked on inside or outside of element
    function handleClick(event: MouseEvent) {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setIsInside(true);
      } else {
        setIsInside(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClick);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref]); // Only re-run effect if ref changes

  return isInside;
}
