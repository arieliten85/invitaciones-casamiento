import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { eventConfig } from "@/config/event.config";
import { AdminDashboard, mockGuests } from "@/features/admin";
import { isDemoMode } from "@/lib/demo-mode";

export default function AdminPage() {
  // Hasta conectar la base de datos y el acceso real, el panel solo existe en la demo.
  if (!isDemoMode) notFound();

  const { couple, rsvp, slug, timeZone } = eventConfig;
  return (
    <Container>
      <AdminDashboard
        initialGuests={mockGuests}
        options={rsvp.dietaryOptions}
        timeZone={timeZone}
        slug={slug}
        coupleNames={`${couple.first} & ${couple.second}`}
        demo
      />
    </Container>
  );
}
