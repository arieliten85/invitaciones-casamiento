/*
 * Detalles botánicos dibujados en SVG (ramitas, guirnalda y separador).
 * Se generan con geometría simple —una curva y hojas a lo largo— para que pesen
 * casi nada y tomen el color del texto (currentColor). Son decorativos: aria-hidden.
 */

type Pt = [number, number];

const r = (n: number) => Math.round(n * 10) / 10;

/** Punto y ángulo (grados) sobre una curva cuadrática. */
function onCurve(p0: Pt, c: Pt, p1: Pt, t: number) {
  const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * c[0] + t ** 2 * p1[0];
  const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * c[1] + t ** 2 * p1[1];
  const dx = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0]);
  const dy = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1]);
  return { x, y, a: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/** Hoja alargada con la base en (0,0) y la punta hacia +x. */
const LEAF = "M0 0C3.5-4.6 11-5.2 16 0C11 5.2 3.5 4.6 0 0Z";

type Leaf = { x: number; y: number; a: number; s: number; o: number };

function leavesAlong(p0: Pt, c: Pt, p1: Pt, count: number, size: number, spread = 42): Leaf[] {
  return Array.from({ length: count }, (_, i) => {
    const t = 0.14 + (i / Math.max(1, count - 1)) * 0.82;
    const { x, y, a } = onCurve(p0, c, p1, t);
    const side = i % 2 === 0 ? -1 : 1;
    return { x, y, a: a + side * spread, s: size * (1.05 - t * 0.45), o: 0.55 + ((i * 37) % 40) / 100 };
  });
}

/* Función (no componente) para que también funcione dentro de la imagen OG. */
function leafPaths(leaves: Leaf[]) {
  return leaves.map((l, i) => (
    <path
      key={i}
      d={LEAF}
      fill="currentColor"
      fillOpacity={r(l.o)}
      transform={`translate(${r(l.x)} ${r(l.y)}) rotate(${r(l.a)}) scale(${r(l.s)})`}
    />
  ));
}

/** Rama de esquina: tallo curvo con hojas y un brote lateral. */
export function Branch({
  className = "",
  flipX = false,
  flipY = false,
}: {
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const main: [Pt, Pt, Pt] = [
    [4, 236],
    [70, 120],
    [228, 30],
  ];
  const side: [Pt, Pt, Pt] = [
    [62, 150],
    [120, 140],
    [170, 160],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 240 240" width="100%" height="100%" className={className}>
      <g
        transform={`translate(${flipX ? 240 : 0} ${flipY ? 240 : 0}) scale(${flipX ? -1 : 1} ${flipY ? -1 : 1})`}
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.8">
          <path d={`M${main[0].join(" ")}Q${main[1].join(" ")} ${main[2].join(" ")}`} />
          <path d={`M${side[0].join(" ")}Q${side[1].join(" ")} ${side[2].join(" ")}`} />
        </g>
        {leafPaths(leavesAlong(...main, 13, 1.45))}
        {leafPaths(leavesAlong(...side, 6, 1.05, 50))}
      </g>
    </svg>
  );
}

/** Guirnalda horizontal con pimpollos, para coronar tarjetas. */
export function Garland({ className = "" }: { className?: string }) {
  const left: [Pt, Pt, Pt] = [
    [150, 26],
    [90, 30],
    [8, 22],
  ];
  const right: [Pt, Pt, Pt] = [
    [150, 26],
    [210, 30],
    [292, 22],
  ];
  const buds: Pt[] = [
    [150, 16],
    [118, 18],
    [182, 18],
    [84, 20],
    [216, 20],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 300 44" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7">
        <path d={`M${left[0].join(" ")}Q${left[1].join(" ")} ${left[2].join(" ")}`} />
        <path d={`M${right[0].join(" ")}Q${right[1].join(" ")} ${right[2].join(" ")}`} />
        {buds.map(([x, y]) => (
          <path key={x} d={`M${x} ${y + 9}L${x} ${y + 3}`} />
        ))}
      </g>
      {leafPaths(leavesAlong(...left, 7, 0.95, 55))}
      {leafPaths(leavesAlong(...right, 7, 0.95, 55))}
      {buds.map(([x, y], i) => (
        <ellipse
          key={x}
          cx={x}
          cy={y}
          rx="2.6"
          ry="3.6"
          fill="currentColor"
          fillOpacity={i === 0 ? 0.95 : 0.6}
        />
      ))}
    </svg>
  );
}

/** Separador fino: línea · ramita · línea (debajo de los títulos). */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`reveal-line text-leaf flex items-center justify-center gap-3 ${className}`}
    >
      <span className="bg-line h-px w-16 sm:w-20" />
      <svg viewBox="0 0 40 20" className="h-4 w-8">
        <path d="M6 13Q20 6 34 13" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        {leafPaths([
          { x: 20, y: 9.6, a: -90, s: 0.5, o: 0.9 },
          { x: 13, y: 11, a: -140, s: 0.45, o: 0.75 },
          { x: 27, y: 11, a: -40, s: 0.45, o: 0.75 },
        ])}
      </svg>
      <span className="bg-line h-px w-16 sm:w-20" />
    </div>
  );
}
