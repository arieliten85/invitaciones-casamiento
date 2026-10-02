export type ScheduleItem = { time: string; label: string };

export type GiftContent = {
  enabled: boolean;
  message: string;
  bank: string;
  holder: string;
  cbu: string;
  alias: string;
};

/** Foto de la invitación. Sin `src`, se muestra un espacio neutro (útil mientras no hay fotos). */
export type PhotoContent = {
  /** Ruta pública, por ejemplo "/brand/photos/portada.jpg". */
  src?: string;
  alt: string;
  /** Crédito del fotógrafo, si corresponde (fotos de stock). */
  credit?: string;
};

export type InvitationContent = {
  photos: {
    hero: PhotoContent;
    band: PhotoContent;
    gallery: PhotoContent[];
  };
  tagline: string;
  welcome: string;
  schedule: ScheduleItem[];
  dressCode: string;
  gift: GiftContent;
  footer: string;
};
