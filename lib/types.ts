export interface ShowEntry {
  class_name?: string;
  placement?: string;
  entry_number?: string;
  dog_name: string;
  registration?: string;
  sex?: string;
  owner?: string;
  handler?: string;
  sire?: string;
  dam?: string;
  sire_dam?: string;
  breeder?: string;
  birth_date?: string;
}

export interface DogShow {
  id: number;
  show_name: string;
  show_date: string;
  show_date_formatted: string;
  location: string;
  breed: string;
  show_type: string;
  judge: string;
  judge_slug: string;
  entry_count: number;
  entries?: ShowEntry[];
  source_url?: string;
  data_quality_score?: number;
  scraped_at?: string;
}

export interface EventShow {
  id: number;
  show_name: string;
  breed: string;
  show_type: string;
  judge: string;
  judge_slug?: string;
  entry_count: number;
  entries?: ShowEntry[];
  source_url?: string;
}

export interface DogShowEvent {
  slug: string;
  date: string;
  name: string;
  location: string;
  breeds: string[];
  show_count: number;
  total_entries: number;
  shows: EventShow[];
}

export interface BreedStat {
  name: string;
  show_count: number;
  entry_count: number;
  show_types?: string[];
}

export interface EventSummary {
  slug: string;
  date: string;
  name: string;
  location: string;
  breeds: BreedStat[];
  show_count: number;
  total_entries: number;
}

export interface Judge {
  id: number;
  name: string;
  slug: string;
  biography?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  profile_image_url?: string;
  specialties?: string[];
  show_count?: number;
}

export interface DogGalleryImage {
  id: number;
  url: string;
  caption?: string;
}

export interface Dog {
  id: number;
  name: string;
  slug: string;
  call_name?: string;
  registration_number?: string;
  breed: string;
  sex?: string;
  birth_date?: string;
  sire?: string;
  dam?: string;
  breeder?: string;
  owner?: string;
  biography?: string;
  main_image_url?: string;
  gallery?: DogGalleryImage[];
}

export interface DogResult {
  show_id: number;
  show_name: string;
  show_date: string;
  location: string;
  breed: string;
  show_type: string;
  judge: string;
  results: ShowEntry[];
}

export interface SearchResults {
  query: string;
  type: string;
  results: {
    shows?: PaginatedResponse<DogShow>;
    judges?: PaginatedResponse<Judge>;
    dogs?: PaginatedResponse<Dog>;
  };
}

export interface Stats {
  total_shows: number;
  total_breeds: number;
  total_judges: number;
  total_dogs: number;
  date_range: {
    earliest: string;
    latest: string;
  };
  total_entries: number;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
  path?: string;
}

export interface PaginationLinks {
  first?: string;
  last?: string;
  prev?: string | null;
  next?: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
  links?: PaginationLinks;
}

export interface DateRange {
  min: string;
  max: string;
}
