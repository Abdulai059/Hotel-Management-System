import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToTop() {
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [pathname]);

  return ref;
}
