import type { SVGProps } from "react";

/* Íconos de línea fina, heredan el color del texto (currentColor). Decorativos: aria-hidden. */

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8"
      {...props}
    >
      {children}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;

/** Dos copas brindando. */
export function ChampagneIcon(props: P) {
  return (
    <Icon {...props}>
      <g transform="rotate(-14 8 14)">
        <path d="M5.2 3h5.6l-.5 5.6a2.3 2.3 0 0 1-4.6 0L5.2 3Z" />
        <path d="M8 10.9V18M5.6 20.5h4.8" />
      </g>
      <g transform="rotate(14 16 14)">
        <path d="M13.2 3h5.6l-.5 5.6a2.3 2.3 0 0 1-4.6 0L13.2 3Z" />
        <path d="M16 10.9V18M13.6 20.5h4.8" />
      </g>
      <path d="M12 4.2v.01M10.6 2.6v.01M13.6 2.8v.01" />
    </Icon>
  );
}

export function PinIcon(props: P) {
  return (
    <Icon {...props}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </Icon>
  );
}

export function ClockIcon(props: P) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function HourglassIcon(props: P) {
  return (
    <Icon {...props}>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3v3.5a4 4 0 0 0 1.6 3.2L12 12l-2.4 2.3A4 4 0 0 0 8 17.5V21" />
      <path d="M16 3v3.5a4 4 0 0 1-1.6 3.2L12 12l2.4 2.3a4 4 0 0 1 1.6 3.2V21" />
    </Icon>
  );
}

export function GiftIcon(props: P) {
  return (
    <Icon {...props}>
      <rect x="4" y="10" width="16" height="10" rx="1" />
      <rect x="3" y="7" width="18" height="3" rx="1" />
      <path d="M12 7v13" />
      <path d="M12 7c-1-3-5-3.5-5-1.5S10 7 12 7Zm0 0c1-3 5-3.5 5-1.5S14 7 12 7Z" />
    </Icon>
  );
}

export function MailIcon(props: P) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </Icon>
  );
}

export function HeartIcon(props: P) {
  return (
    <Icon {...props}>
      <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.4-7 10-7 10Z" />
    </Icon>
  );
}

/** Percha, para el código de vestimenta. */
export function HangerIcon(props: P) {
  return (
    <Icon {...props}>
      <path d="M12 8V6.8a1.9 1.9 0 1 0-1.9-1.9" />
      <path d="m12 8-8.4 6.3a1 1 0 0 0 .6 1.8h15.6a1 1 0 0 0 .6-1.8L12 8Z" />
    </Icon>
  );
}

export const ICONS = {
  copas: ChampagneIcon,
  pin: PinIcon,
} as const;

export type PlaceIconName = keyof typeof ICONS;
