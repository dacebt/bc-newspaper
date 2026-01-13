export interface Announcement {
  title: string;
  summary: string;
}

export interface MainStory {
  headline: string;
  angle?: string;
  body: string;
}

export interface EditionOutput {
  region_id: string;
  edition_date: string;
  title: string;
  subtitle?: string;
  announcements: Announcement[];
  main_story: MainStory;
}
