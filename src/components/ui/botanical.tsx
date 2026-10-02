import type { SVGProps } from "react";
import { cn } from "@/lib/class-names";

/* Ilustraciones botánicas propias, dibujadas en SVG. Solo usan tokens del tema. */

const LEAF = "M0 0 C8 -9 22 -11 34 0 C22 11 8 9 0 0Z";

type Leaf = { x: number; y: number; angle: number; scale: number; soft?: boolean };

function Leaves({ leaves }: { leaves: Leaf[] }) {
  return (
    <>
      {leaves.map((l, i) => (
        <path
          key={i}
          d={LEAF}
          transform={`translate(${l.x} ${l.y}) rotate(${l.angle}) scale(${l.scale})`}
          className={l.soft ? "fill-sage-soft" : "fill-sage"}
          fillOpacity={l.soft ? 0.9 : 0.72}
        />
      ))}
    </>
  );
}

function Blossom({
  x,
  y,
  r = 11,
  rotate = 0,
  tone = "soft",
}: {
  x: number;
  y: number;
  r?: number;
  rotate?: number;
  tone?: "soft" | "deep";
}) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {petals.map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.62}
          rx={r * 0.5}
          ry={r * 0.78}
          transform={`rotate(${a})`}
          className={tone === "deep" ? "fill-primary" : "fill-primary-soft"}
          fillOpacity={tone === "deep" ? 0.55 : 0.92}
        />
      ))}
      <circle r={r * 0.22} className="fill-gold" fillOpacity="0.9" />
    </g>
  );
}

/** Rama grande para esquinas de la portada. */
export function FloralBranch({ className, ...props }: SVGProps<SVGSVGElement>) {
  const leaves: Leaf[] = [
    { x: 31, y: 250, angle: -120, scale: 1.1 },
    { x: 31, y: 250, angle: -20, scale: 1 },
    { x: 54, y: 192, angle: -118, scale: 1.15, soft: true },
    { x: 54, y: 192, angle: -15, scale: 1.1 },
    { x: 82, y: 138, angle: -108, scale: 1.1 },
    { x: 82, y: 138, angle: -8, scale: 1.05, soft: true },
    { x: 144, y: 69, angle: -86, scale: 1 },
    { x: 144, y: 69, angle: 12, scale: 1 },
    { x: 171, y: 51, angle: -82, scale: 0.95, soft: true },
    { x: 171, y: 51, angle: 18, scale: 0.9 },
    { x: 200, y: 35, angle: -78, scale: 0.85 },
    { x: 200, y: 35, angle: 22, scale: 0.8, soft: true },
  ];
  return (
    <svg
      viewBox="0 0 250 320"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
      {...props}
    >
      <path
        d="M10 310 C40 230 60 150 120 90 C150 60 190 40 230 20"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        className="stroke-sage"
        strokeOpacity="0.85"
      />
      <Leaves leaves={leaves} />
      <Blossom x={42} y={196} r={13} rotate={12} />
      <Blossom x={120} y={86} r={15} rotate={-20} tone="deep" />
      <Blossom x={96} y={112} r={9} rotate={40} />
      <Blossom x={176} y={46} r={11} rotate={8} />
      <circle cx="232" cy="19" r="4" className="fill-primary-soft" />
    </svg>
  );
}

/** Ramita chica con flor, para encabezar la portada. */
export function FloralSprig({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 80"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
      {...props}
    >
      <path
        d="M60 78 C60 58 60 44 60 28"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        className="stroke-sage"
        strokeOpacity="0.85"
      />
      <Leaves
        leaves={[
          { x: 60, y: 62, angle: -150, scale: 0.9 },
          { x: 60, y: 54, angle: -30, scale: 0.9, soft: true },
          { x: 60, y: 44, angle: -140, scale: 0.7, soft: true },
          { x: 60, y: 38, angle: -40, scale: 0.7 },
        ]}
      />
      <Blossom x={60} y={24} r={16} rotate={6} />
    </svg>
  );
}

/** Separador de secciones: línea, flor y línea. */
export function FloralDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3", className)} aria-hidden="true">
      <span className="to-gold/60 h-px w-14 bg-gradient-to-r from-transparent sm:w-20" />
      <svg viewBox="-16 -16 32 32" className="size-7">
        <Blossom x={0} y={0} r={11} rotate={18} />
      </svg>
      <span className="to-gold/60 h-px w-14 bg-gradient-to-l from-transparent sm:w-20" />
    </div>
  );
}

/** Manchas de acuarela de fondo (decorativas). */
export function WatercolorWashes({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="bg-primary-soft absolute top-10 -left-24 size-72 rounded-full opacity-70 blur-3xl sm:size-[28rem]" />
      <div className="bg-sage-soft absolute top-1/3 -right-20 size-64 rounded-full opacity-70 blur-3xl sm:size-96" />
      <div className="bg-primary-soft absolute -bottom-24 left-1/4 size-72 rounded-full opacity-50 blur-3xl sm:size-[26rem]" />
    </div>
  );
}
