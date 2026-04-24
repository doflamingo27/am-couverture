"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wrapper that adds `.in-view` when the element enters the viewport.
 * Animations in globals.css are paused by default and play on `.in-view`.
 * Triggers once — animations keep running after first intersection.
 */
export function AnimateOnScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${inView ? "in-view" : ""} ${className || ""}`.trim()}>
      {children}
    </div>
  );
}
