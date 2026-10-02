import { Countdown } from "@/components/sections/countdown";
import { Gallery } from "@/components/sections/gallery";
import { Footer } from "@/components/sections/footer";
import { Gifts } from "@/components/sections/gifts";
import { Hero } from "@/components/sections/hero";
import { PhotoBand } from "@/components/sections/photo-band";
import { Places } from "@/components/sections/places";
import { Schedule } from "@/components/sections/schedule";
import { Welcome } from "@/components/sections/welcome";
import { eventConfig } from "@/config/event.config";
import { invitationContent } from "@/content/invitation.content";
import { RsvpSection, isRsvpClosed } from "@/features/rsvp";
import { googleCalendarLink } from "@/lib/calendar-link";
import { formatDayMonth, formatNumericDate } from "@/lib/format-date";

// El servidor es la autoridad sobre el plazo; la página se refresca cada 5 minutos.
export const revalidate = 300;

export default function Home() {
  const { couple, date, places, rsvp, timeZone } = eventConfig;
  const content = invitationContent;
  const zone = { timeZone };

  const allPhotos = [content.photos.hero, content.photos.band, ...content.photos.gallery];
  const credits = allPhotos.flatMap((p) => (p.src && p.credit ? [p.credit] : []));

  const closed = isRsvpClosed(rsvp);
  const firstPlace = places[0];

  return (
    <>
      <Hero
        eyebrow={content.heroEyebrow}
        tagline={content.tagline}
        first={couple.first}
        second={couple.second}
        dateLabel={formatNumericDate(date, zone)}
        photo={content.photos.hero}
        cta={{ label: "Confirmar asistencia", href: "#confirmar" }}
      />
      <main>
        <Welcome text={content.welcome} />
        <Countdown
          target={date}
          calendarHref={googleCalendarLink({
            title: `Casamiento de ${couple.first} y ${couple.second}`,
            startIso: date,
            durationHours: 8,
            location: firstPlace ? `${firstPlace.name}, ${firstPlace.address}` : "",
          })}
        />
        <PhotoBand photo={content.photos.band} />
        <Places places={places} />
        <Schedule items={content.schedule} dressCode={content.dressCode} />
        <Gallery photos={content.photos.gallery} />
        <RsvpSection
          closed={closed}
          deadlineLabel={formatDayMonth(rsvp.deadline, zone)}
          maxCompanions={rsvp.maxCompanions}
          dietaryOptions={rsvp.dietaryOptions}
        />
        {content.gift.enabled ? (
          <Gifts
            message={content.gift.message}
            bank={content.gift.bank}
            holder={content.gift.holder}
            cbu={content.gift.cbu}
            alias={content.gift.alias}
          />
        ) : null}
      </main>
      <Footer text={content.footer} names={`${couple.first} & ${couple.second}`} credits={credits} />
    </>
  );
}
