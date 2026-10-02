export type ScheduleItem = { time: string; label: string };

export type GiftContent = {
  enabled: boolean;
  message: string;
  bank: string;
  holder: string;
  cbu: string;
  alias: string;
};

export type InvitationContent = {
  tagline: string;
  welcome: string;
  schedule: ScheduleItem[];
  dressCode: string;
  gift: GiftContent;
  footer: string;
};
