import {
  ButtonLink,
  CardDate,
  Eyebrow,
  Heading,
  IconCircle,
  Text,
  Title,
  buttonStyles,
  glyphs,
} from "@/components/agenda/block";
import { Branch, Divider, Garland } from "@/components/agenda/botanical";
import { CalendarMenu } from "@/components/agenda/calendar-menu";
import { CountdownCircles } from "@/components/agenda/countdown-circles";
import { EventSwitch } from "@/components/agenda/event-switch";
import { GiftModal } from "@/components/agenda/gift-modal";
import { Icon } from "@/components/agenda/icon";
import { ScrollReveal } from "@/components/agenda/scroll-reveal";
import { Timeline } from "@/components/agenda/timeline";
import { GalleryViewer } from "@/components/sections/gallery-viewer";
import { Photo } from "@/components/ui/photo";
import { agenda } from "@/content/agenda.content";
import { GoogleFormFields } from "@/features/google-forms/google-form-fields";
import { isInline } from "@/features/google-forms/model";
import { formatLongDate, formatTime } from "@/lib/format-date";

const lines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i} className={`block text-balance ${i > 0 ? "mt-3" : ""}`}>
      {line}
    </span>
  ));

/** Rama de esquina con su entrada y su balanceo. `corner` decide hacia dónde crece. */
function CornerBranch({
  corner,
  className = "",
  speed,
}: {
  corner: "tl" | "br" | "tr" | "bl";
  className?: string;
  /** Parallax: cuánto se mueve la rama respecto del scroll (0 = fija con la página). */
  speed?: number;
}) {
  const place = {
    tl: "top-0 left-0 origin-top-left",
    tr: "top-0 right-0 origin-top-right",
    bl: "bottom-0 left-0 origin-bottom-left",
    br: "right-0 bottom-0 origin-bottom-right",
  }[corner];
  // La rama base crece de abajo-izquierda hacia arriba-derecha.
  const flipX = corner === "tr" || corner === "br";
  const flipY = corner === "tl" || corner === "tr";
  return (
    <div aria-hidden="true" className={`animate-grow pointer-events-none absolute ${place} ${className}`}>
      <div
        className={`h-full w-full ${speed ? "parallax" : ""}`}
        style={speed ? ({ "--speed": speed } as React.CSSProperties) : undefined}
      >
        <div className={`animate-sway h-full w-full ${place.split(" ").pop()}`}>
          <Branch className="text-leaf h-full w-full" flipX={flipX} flipY={flipY} />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { couple, date, timeZone, place, civil, timeline, welcome, rsvp, gift, songs, gallery, photos } =
    agenda;
  const zone = { timeZone };

  const dateParts = new Intl.DateTimeFormat("es-AR", {
    timeZone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
    .formatToParts(new Date(date))
    .reduce<Record<string, string>>((acc, p) => ({ ...acc, [p.type]: p.value }), {});
  const cardDate: [string, string, string] = [
    dateParts.day ?? "",
    (dateParts.month ?? "").slice(0, 3).toUpperCase(),
    (dateParts.year ?? "").slice(-2),
  ];
  const longDate = formatLongDate(date, zone).replace(/ de \d{4}$/, "");
  const time = formatTime(date, zone);

  const events = [
    {
      key: "civil",
      tab: "Civil",
      glyph: glyphs.civil,
      label: `${civil.title} · opcional`,
      time: civil.time,
      day: civil.day,
      name: civil.name,
      address: civil.address,
      note: "Para quien quiera acompañarnos",
      url: civil.mapsUrl,
    },
    {
      key: "fiesta",
      tab: "Fiesta",
      glyph: glyphs.party,
      label: "Fiesta",
      time,
      day: longDate,
      name: place.name,
      address: place.address,
      note: place.tag,
      url: place.mapsUrl,
    },
  ];

  return (
    <main className="bg-paper text-moss overflow-x-clip">
      <ScrollReveal />
      <div aria-hidden="true" className="scroll-progress" />

      {/* ───────── Portada: papel, ramas en las esquinas y la «tarjeta» ───────── */}
      <header className="paper relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-24 text-center">
        <CornerBranch corner="tl" speed={0.35} className="h-48 w-48 sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
        <CornerBranch corner="br" speed={-0.12} className="h-44 w-44 sm:h-64 sm:w-64 lg:h-88 lg:w-88" />
        <CornerBranch corner="tr" className="hidden h-40 w-40 opacity-40 md:block lg:h-56 lg:w-56" />

        <div className="hero-content animate-rise relative flex flex-col items-center">
          <p className="text-moss-soft text-xs tracking-[0.55em] uppercase sm:text-sm">Nos casamos</p>
          <h1 className="text-moss mt-6 flex flex-col items-center font-serif text-[3.9rem] leading-[1.02] sm:text-[6.5rem]">
            <span>{couple.first}</span>
            <span aria-hidden="true" className="my-1 flex items-center gap-4 sm:my-2">
              <span className="bg-leaf/50 h-px w-12 sm:w-20" />
              <span className="text-leaf text-[0.42em] leading-none italic">&amp;</span>
              <span className="bg-leaf/50 h-px w-12 sm:w-20" />
            </span>
            <span className="sr-only">y</span>
            <span>{couple.second}</span>
          </h1>
          <p className="text-moss-soft mt-5 font-serif text-lg italic sm:text-xl">{agenda.tagline}</p>
          <Divider className="mt-6" />
          <div className="mt-6">
            <CardDate parts={cardDate} />
          </div>
          <p className="text-moss-soft mt-4 text-sm tracking-[0.4em]">{time.replace("hs", "HS")}</p>
          <p className="text-leaf-deep mt-6 text-[0.7rem] tracking-[0.45em] uppercase">{place.locality}</p>
        </div>

        <a
          href="#bienvenida"
          aria-label="Seguir bajando"
          className="text-moss-soft absolute bottom-6 flex flex-col items-center gap-3 text-[0.62rem] tracking-[0.45em] uppercase"
        >
          Deslizá
          <span aria-hidden="true" className="animate-nudge bg-moss-soft/60 block h-9 w-px" />
        </a>
      </header>

      {/* ───────── Bienvenida ───────── */}
      <section id="bienvenida" className="overflow-hidden px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="reveal-stagger relative mx-auto flex w-full max-w-sm justify-center md:max-w-none">
            {photos.strip.map((p, i) => (
              <div
                key={p.src}
                className={`relative aspect-[3/4] w-1/3 overflow-hidden rounded-2xl border-4 border-white shadow-[0_20px_40px_-22px_rgb(54_65_47/0.55)] md:w-[46%] ${
                  [
                    "translate-y-3 -rotate-6",
                    "z-10 -mx-3 -translate-y-2 rotate-2 md:-mx-8",
                    "translate-y-4 -rotate-3",
                  ][i]
                }`}
              >
                <Photo src={p.src} alt={p.alt} sizes="(min-width: 768px) 14rem, 33vw" />
              </div>
            ))}
          </div>

          <div className="text-center md:text-left">
            <Icon name="frase" className="mb-3 h-20 w-20 md:mx-0" />
            <Eyebrow>Con amor</Eyebrow>
            <Title className="mt-3">{welcome.title}</Title>
            <Text className="mx-auto mt-5 max-w-[22rem] md:mx-0 md:max-w-md">{lines(welcome.text)}</Text>
          </div>
        </div>
      </section>

      {/* ───────── Cuenta regresiva: tarjeta con guirnalda ───────── */}
      <section className="px-5 pb-20 sm:pb-28">
        <div className="reveal-lg bg-mist border-line mx-auto max-w-xl rounded-[2.25rem] border px-5 pt-8 pb-10 text-center sm:px-10">
          <Garland className="text-leaf mx-auto h-9 w-56 sm:w-64" />
          <Eyebrow className="mt-4">Cuenta regresiva</Eyebrow>
          <Title className="mt-2 mb-8 !text-4xl">Falta poco</Title>
          <CountdownCircles target={date} />
        </div>
      </section>

      {/* ───────── Cuándo y dónde ───────── */}
      <section id="boda" className="bg-mist px-5 py-20 sm:py-28">
        <Icon name="boda" className="mb-4 h-20 w-20 sm:h-24 sm:w-24" />
        <Heading eyebrow="El día" title="Cuándo y dónde" />

        <div className="mx-auto mt-12 max-w-md space-y-6">
          {/* Fecha */}
          <div className="reveal-lg bg-card mx-auto flex max-w-md items-center justify-center gap-5 rounded-[1.75rem] px-6 py-6 shadow-[0_22px_44px_-30px_rgb(54_65_47/0.5)]">
            <p className="text-moss-soft text-right text-[0.65rem] leading-relaxed tracking-[0.3em] uppercase">
              {dateParts.weekday}
              <br />
              {dateParts.month}
            </p>
            <p className="text-moss font-serif text-6xl leading-none">{Number(dateParts.day)}</p>
            <p className="text-moss-soft text-[0.65rem] tracking-[0.3em]">{dateParts.year}</p>
          </div>

          {/* Civil y fiesta: selector deslizante */}
          <EventSwitch events={events} initial={1} />
        </div>
      </section>

      {/* ───────── Cómo va a ser la noche ───────── */}
      <section id="noche" className="relative overflow-hidden px-5 py-20 sm:py-28">
        <CornerBranch corner="tr" className="hidden h-56 w-56 opacity-50 md:block" />
        <Heading eyebrow="Cronograma" title="¿Cómo va a ser la noche?" className="relative" />
        <Timeline items={timeline.items} />
        <p className="reveal text-leaf-deep mt-14 text-center font-serif text-3xl italic sm:text-4xl">
          {timeline.note}
        </p>
      </section>

      {/* ───────── Dress code ───────── */}
      <section id="dresscode" className="bg-mist px-5 py-20 text-center sm:py-24">
        <Heading eyebrow="Para vestirse" title="Dress code" />
        <Icon name="dresscode" className="mt-8 h-36 w-36 sm:h-44 sm:w-44" />
        <p className="reveal text-moss mt-6 font-serif text-xl tracking-[0.35em] uppercase sm:text-2xl">
          {agenda.dressCode.replace(/\.$/, "")}
        </p>
      </section>

      {/* ───────── Confirmación ───────── */}
      <section id="confirmar" className="px-5 py-20 text-center sm:py-28">
        <IconCircle path={glyphs.mail} className="reveal-zoom mb-6 !h-16 !w-16" />
        <Heading eyebrow="Confirmá tu lugar" title="¿Nos acompañás?" />
        <Text className="mx-auto mt-5 max-w-md">{rsvp.message}</Text>

        <div className="reveal-lg bg-card border-line mx-auto mt-8 max-w-md rounded-[1.75rem] border p-6 shadow-[0_24px_50px_-32px_rgb(54_65_47/0.45)] sm:p-8">
          {isInline(rsvp.fields) ? (
            <GoogleFormFields
              formKey="rsvp"
              fields={rsvp.fields}
              submitLabel="Enviar confirmación"
              thanks="¡Gracias! Ya tenemos tu respuesta."
              buttonClass={buttonStyles.leaf}
            />
          ) : (
            <ButtonLink href={rsvp.formUrl} className="w-full">
              Confirmar asistencia
            </ButtonLink>
          )}
          <p className="text-moss-soft mt-4 font-serif text-[0.95rem] italic">* {rsvp.note}.</p>
        </div>

        <div
          id="agenda"
          className="reveal relative z-30 mx-auto mt-10 flex max-w-md flex-col items-center gap-4"
        >
          <Icon name="calendario" className="h-16 w-16" />
          <p className="text-moss-soft text-sm">{agenda.calendarText}</p>
          <CalendarMenu
            event={{
              title: `Festejo de casamiento de ${couple.first} y ${couple.second}`,
              startIso: date,
              durationHours: agenda.durationHours,
              location: `${place.name}, ${place.address}`,
              description: "¡Te esperamos!",
            }}
          />
        </div>
      </section>

      {/* ───────── Nuestra historia: galería ───────── */}
      <section id="galeria" className="bg-mist px-5 py-20 sm:py-28">
        <Heading eyebrow="Momentos" title={gallery.title} />
        <Text className="mx-auto mt-5 max-w-lg text-center">{gallery.text}</Text>
        <ul className="reveal-grid mx-auto mt-12 grid max-w-3xl auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:auto-rows-[15rem] md:gap-4">
          {photos.gallery.map((p, i) => (
            <li
              key={p.src}
              className={`group relative overflow-hidden rounded-[1.5rem] ${
                ["row-span-2", "", "row-span-2", "", "col-span-2", "col-span-2 md:col-span-1"][i]
              }`}
            >
              <Photo
                src={p.src}
                alt={p.alt}
                sizes="(min-width: 768px) 22rem, 50vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <GalleryViewer
            photos={[...photos.gallery, ...photos.more]}
            className="border-leaf/60 text-leaf-deep hover:bg-leaf-soft rounded-full px-7 text-[0.92rem] font-normal tracking-normal normal-case"
          />
        </div>
      </section>

      {/* ───────── Pedí tu canción ───────── */}
      <section id="fiesta" className="px-5 py-20 text-center sm:py-28">
        <Heading eyebrow={songs.eyebrow} title={songs.title} />
        <Text className="mx-auto mt-5 max-w-md">{lines(songs.text)}</Text>
        <div className="reveal-lg bg-card border-line mx-auto mt-8 max-w-md rounded-[1.75rem] border p-6 shadow-[0_24px_50px_-32px_rgb(54_65_47/0.45)] sm:p-8">
          <IconCircle path={glyphs.music} className="mb-6" />
          {isInline(songs.fields) ? (
            <GoogleFormFields
              formKey="songs"
              fields={songs.fields}
              submitLabel="Enviar canción"
              thanks="¡Anotada! Gracias por sumarla."
              buttonClass={buttonStyles.leaf}
            />
          ) : (
            <ButtonLink href={songs.formUrl} className="w-full">
              Sugerir canción
            </ButtonLink>
          )}
        </div>
      </section>

      {/* ───────── Regalos ───────── */}
      <section id="regalos" className="bg-mist px-5 py-20 text-center sm:py-28">
        <Icon name="regalo" className="mb-4 h-20 w-20 sm:h-24 sm:w-24" />
        <Heading eyebrow={gift.eyebrow} title="Regalos" />
        <Text className="mx-auto mt-5 mb-8 max-w-md">{lines(gift.message)}</Text>
        <GiftModal bank={gift.bank} holder={gift.holder} alias={gift.alias} />
      </section>

      {/* ───────── Pie ───────── */}
      <footer className="paper relative overflow-hidden px-6 pt-24 pb-5 text-center">
        <CornerBranch corner="bl" className="h-20 w-20 opacity-60 sm:h-52 sm:w-52 sm:opacity-70" />
        <CornerBranch corner="tr" className="h-32 w-32 opacity-50 sm:h-44 sm:w-44" />
        <div className="relative">
          <Divider />
          <p className="text-moss-soft mx-auto mt-6 max-w-md font-serif text-xl italic">{agenda.footer}</p>
          <p className="text-moss mt-6 font-serif text-4xl sm:text-5xl">
            {couple.first} <span className="text-leaf italic">&amp;</span> {couple.second}
          </p>
          <p className="text-moss-soft mt-4 text-xs tracking-[0.4em] uppercase">{cardDate.join(" · ")}</p>
          <p className="text-moss-soft border-line relative mt-12 border-t pt-5 pb-1 text-[0.75rem] tracking-wide">
            Diseño y desarrollo web por{" "}
            <a
              href="https://ariel-ferencak.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-leaf-deep hover:text-moss underline underline-offset-2"
            >
              Ariel Ferencak
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
