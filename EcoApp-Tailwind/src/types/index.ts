export type LocationMode = 'current' | 'map' | 'manual';

export type ReportType = 'tree' | 'furniture' | 'event' | 'trash' | 'other';

export type Report = {
  type: ReportType;
  description: string;
  location: [number, number];
  image?: File;
};