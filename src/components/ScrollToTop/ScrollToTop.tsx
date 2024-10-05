import { useState, useEffect, useRef } from "react";
import { ScrollTopButton } from "./ScrollToTop.styles";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        if (!isMounted) {
          setIsMounted(true);
        }
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          setIsMounted(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isMounted]);

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isMounted && (
        <ScrollTopButton onClick={scroll} isVisible={isVisible}>
          ↑ Scroll to Top
        </ScrollTopButton>
      )}
    </>
  );
};
