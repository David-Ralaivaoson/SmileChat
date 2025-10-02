'use client'
import { useEffect, useState, useRef, useCallback, Ref } from "react";

export function useIsMobile<T extends HTMLElement = HTMLElement>(
  forwardedRef?: Ref<T>,
  breakpoint = 768
) {
  const containerRef = useRef<T | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // ✅ nouvel état

  useEffect(() => {
    const checkWidth = () => {
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      setIsMobile(width < breakpoint);
      setIsLoaded(true); // ✅ indique que le calcul est fait
    };

    checkWidth();

    const resizeObserver = new ResizeObserver(checkWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    } else {
      window.addEventListener("resize", checkWidth);
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkWidth);
    };
  }, [breakpoint]);

  const combinedRef = useCallback(
    (node: T | null) => {
      containerRef.current = node;
      if (!forwardedRef) return;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  return { isMobile, isLoaded, combinedRef };
}
