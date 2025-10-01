import { useEffect, useState, useRef, useCallback, Ref, RefObject } from "react";

export function useIsMobile<T extends HTMLElement = HTMLElement>(
  forwardedRef?: Ref<T>,
  breakpoint = 768
) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const checkWidth = () => {
      const width = containerRef.current?.offsetWidth ?? window.innerWidth;
      setIsMobile(width < breakpoint);
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
        // ici .current accepte bien T | null
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  return { isMobile, combinedRef };
}
