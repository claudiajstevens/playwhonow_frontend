export interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

// TODO: replace with the real shape returned by GET /festivals
export interface Festival {
  [key: string]: unknown;
}

export interface Lineup {
  lineupId: string | number;
  festival: string;
  startDate: string;
  endDate: string;
}
