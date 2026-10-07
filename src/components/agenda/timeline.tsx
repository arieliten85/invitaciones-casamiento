import { Leafmark } from "./leafmark";

type Item = { time?: string; title: string; text: string };

/**
 * Cronograma de la noche sin numeración: una enredadera vertical con hojitas
 * como marcas, y cada momento en una tarjeta blanca alternando lados en escritorio.
 */
export function Timeline({ items }: { items: readonly Item[] }) {
  return (
    <ol className="relative mx-auto mt-12 max-w-3xl">
      <span aria-hidden="true" className="bg-line absolute top-2 bottom-2 left-6 w-px md:left-1/2" />
      {items.map((item, i) => (
        <li
          key={item.title}
          className={`${i % 2 === 0 ? "reveal-left" : "reveal-right"} relative flex items-start gap-5 pb-6 last:pb-0 md:w-1/2 md:gap-0 ${
            i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
          }`}
        >
          <span
            aria-hidden="true"
            className={`bg-paper text-leaf relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full md:absolute md:top-3 ${
              i % 2 === 0 ? "md:-right-6" : "md:-left-6"
            }`}
          >
            <Leafmark flip={i % 2 === 1} />
          </span>
          <div className="bg-card flex-1 rounded-3xl px-6 py-5 text-left shadow-[0_18px_40px_-28px_rgb(54_65_47/0.45)]">
            {item.time ? (
              <p className="text-leaf-deep text-[0.7rem] tracking-[0.3em] uppercase">{item.time}</p>
            ) : null}
            <h3 className="text-moss mt-1 font-serif text-2xl">{item.title}</h3>
            <p className="text-moss-soft mt-1 leading-relaxed font-light">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
