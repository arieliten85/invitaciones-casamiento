"use client";

import { useEffect } from "react";

const SELECTOR = [
  ".reveal",
  ".reveal-lg",
  ".reveal-zoom",
  ".reveal-blur",
  ".reveal-left",
  ".reveal-right",
  ".reveal-line",
  ".reveal-stagger > *",
  ".reveal-grid > *",
].join(",");

/**
 * Efectos al hacer scroll (en todos los navegadores).
 * Marca cada elemento con `.is-in` cuando entra en pantalla; el CSS hace la animación.
 * También publica `--scroll` para el parallax de las ramas.
 * Con «reducir movimiento» solo hay un fundido; sin JavaScript todo queda visible.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));

    // Grupos: cada hijo arranca 120 ms después que el anterior.
    document.querySelectorAll<HTMLElement>(".reveal-stagger, .reveal-grid").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--d", `${Math.min(i, 5) * 120}ms`);
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    root.dataset.reveal = calm ? "fade" : "on";
    items.forEach((el) => io.observe(el));

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => root.style.setProperty("--scroll", String(window.scrollY)));
    };
    if (!calm) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      delete root.dataset.reveal;
      items.forEach((el) => el.classList.remove("is-in"));
    };
  }, []);

  return null;
}
