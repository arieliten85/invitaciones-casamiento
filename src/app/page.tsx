import { Heading, IconTop, Section, SageLink, Text } from "@/components/agenda/block";
import { CalendarMenu } from "@/components/agenda/calendar-menu";
import { CountdownCircles } from "@/components/agenda/countdown-circles";
import { GiftModal } from "@/components/agenda/gift-modal";
import { Icon } from "@/components/agenda/icon";
import { Photo } from "@/components/ui/photo";
import { agenda } from "@/content/agenda.content";
import { formatDayMonth, formatTime } from "@/lib/format-date";

const lines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

export default function Home() {
  const { couple, date, timeZone, place, quote, rsvp, gift, songs, instagram, gallery } = agenda;
  const zone = { timeZone };
  const shortDate = new Intl.DateTimeFormat("es-AR", {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(new Date(date))
    .replaceAll("/", ".");
  // "20 de marzo de 2027" → "20 de Marzo de 2027", como en la referencia.
  const longDate = formatDayMonth(date, zone).replace(
    / de (\p{L})/u,
    (_, c: string) => ` de ${c.toUpperCase()}`,
  );

  return (
    <main>
      {/* Portada: pantalla completa, solo texto */}
      <header className="paper relative flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <h1 className="text-ink font-serif text-4xl tracking-[0.14em] uppercase sm:text-5xl">
          {couple.first} <span className="text-ink/40 text-3xl sm:text-4xl">&amp;</span> {couple.second}
        </h1>
        <p className="text-ink mt-6 font-serif text-2xl tracking-[0.25em] lining-nums sm:text-3xl">
          {shortDate}
        </p>
        <span aria-hidden="true" className="bg-ink mt-16 block h-0.5 w-28" />
        <p className="text-ink font-hero mt-14 text-base tracking-[0.4em] uppercase">¡Nos casamos!</p>
        <a href="#frase" aria-label="Seguir bajando" className="text-ink animate-nudge absolute bottom-8">
          <svg viewBox="0 0 44 24" className="h-6 w-11" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="m3 3 19 17L41 3" />
          </svg>
        </a>
      </header>

      <Section id="frase" bg="blush">
        <IconTop name="frase" />
        <Heading>{quote.title}</Heading>
        <Text className="mt-8">&quot;{quote.text}&quot;</Text>
        <Text className="mt-6 italic">{quote.author}</Text>
      </Section>

      <Section id="boda">
        <CountdownCircles target={date} />
        <div className="pt-6">
          <Icon name="boda" className="h-32 w-32 sm:h-40 sm:w-40" />
        </div>
        <Heading className="mt-8">Nuestra boda</Heading>
        <p className="text-sage mt-9 text-2xl">{place.title}</p>
        <Text className="mt-5">
          {longDate}
          <br />
          {formatTime(date, zone).replace("hs", "horas")}
          <br />
          {place.name}
          <br />
          {place.address}
        </Text>
        <SageLink href={place.mapsUrl}>Cómo llegar</SageLink>
      </Section>

      <Section id="confirmar" bg="blush" className="pb-8 sm:pb-10">
        <Heading>RSVP</Heading>
        <Text className="mt-8">{rsvp.message}</Text>
        <Text className="mt-4">{rsvp.note}</Text>
        <SageLink href={rsvp.formUrl}>Confirmar asistencia</SageLink>

        <div id="agenda" className="pt-16">
          <Icon name="calendario" className="h-28 w-28 sm:h-36 sm:w-36" />
          <Text className="mt-8">{agenda.calendarText}</Text>
          <CalendarMenu
            event={{
              title: `Casamiento de ${couple.first} y ${couple.second}`,
              startIso: date,
              durationHours: agenda.durationHours,
              location: `${place.name.replace(/,$/, "")}, ${place.address.replace(/\.$/, "")}`,
              description: "¡Te esperamos!",
            }}
          />
        </div>

        <div id="dresscode" className="pt-20 pb-6">
          <Icon name="dresscode" className="h-28 w-28 sm:h-36 sm:w-36" />
          <Heading className="mt-4">Dress code:</Heading>
          <Text className="mt-8">{agenda.dressCode}</Text>
        </div>
      </Section>

      <Section id="instagram">
        <IconTop name="instagram" />
        <h2 className="text-ink font-display text-2xl tracking-[0.12em] sm:text-[1.75rem]">
          {instagram.handle}
        </h2>
        <Text className="mt-8">{lines(instagram.text)}</Text>
        <SageLink href={instagram.url}>Ver en Instagram</SageLink>
      </Section>

      <section id="galeria" className="bg-white px-6 pt-4 pb-20 text-center sm:pb-24">
        <Heading>{gallery.title}</Heading>
        <p className="text-ink mt-2 leading-none" aria-hidden="true">
          ♥
        </p>
        <Text className="mt-4">{gallery.text}</Text>
        <ul className="mx-auto mt-10 grid max-w-[71rem] grid-cols-3 gap-1.5">
          {Array.from({ length: gallery.count }, (_, i) => (
            <li key={i} className="relative aspect-square overflow-hidden rounded-lg">
              <Photo alt={`Foto ${i + 1}`} sizes="(min-width: 1136px) 24rem, 33vw" showLabel={false} />
            </li>
          ))}
        </ul>
      </section>

      <Section id="regalos" bg="blush">
        <IconTop name="regalo" />
        <Text className="mt-0">{lines(gift.message)}</Text>
        <GiftModal bank={gift.bank} holder={gift.holder} alias={gift.alias} />
      </Section>

      <section id="fiesta" className="paper px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-[59rem] bg-white px-6 py-14 text-center">
          <Heading>{songs.title}</Heading>
          <Text className="mt-8">{lines(songs.text)}</Text>
          <SageLink href={songs.formUrl}>Sugerir canción</SageLink>
        </div>
      </section>

      <footer>
        <div className="bg-blush px-6 py-20 text-center">
          <p className="text-ink" aria-hidden="true">
            ♥
          </p>
          <p className="text-ink mt-1 text-lg">{agenda.footer}</p>
        </div>
        <p className="text-ink/80 bg-white px-6 py-6 text-center text-[0.8rem]">
          Diseño y desarrollo web por{" "}
          <a
            href="https://ariel-ferencak.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage hover:text-sage-hover underline underline-offset-2"
          >
            Ariel Ferencak
          </a>
        </p>
      </footer>
    </main>
  );
}
