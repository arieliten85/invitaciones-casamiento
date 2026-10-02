import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <main className="bg-background min-h-dvh py-8 sm:py-12">{children}</main>;
}
