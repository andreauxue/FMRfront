// src/components/donar/tokens.js
// Paleta de colores y hook de reveal — sin JSX, importable desde cualquier archivo.

export const C = {
  brand:         "#C8384F",
  brandSoft:     "#FAE8EB",
  brandDark:     "#A02C3E",
  secondary:     "#3B5BA5",
  secondarySoft: "#EBF0FA",
  accent:        "#F5A623",
  bg:            "#F7F8FA",
  surface:       "#FFFFFF",
  text:          "#1A2235",
  textMid:       "#4B5563",
  textLight:     "#9CA3AF",
  border:        "#E5E7EB",
};

import { useEffect, useRef, useState } from "react";

export function useReveal(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}