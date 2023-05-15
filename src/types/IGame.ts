export interface IGame {
  id: number;
  name: string;
  genre: Genre;
  release_year: number;
  price: string;
  created_at: string;
  cover_art: CoverArt;
  platforms: Platform[];
  publishers: Publisher[];
  [key: string]: any;
}

interface Genre {
  name: string;
  [key: string]: any;
}

interface CoverArt {
  formats: Formats;
  [key: string]: any;
}

interface Formats {
  small?: Small;
  thumbnail?: Thumbnail;
  [key: string]: any;
}

interface Small {
  url: string;
  name: string;
  [key: string]: any;
}

interface Thumbnail {
  url: string;
  name: string;
  [key: string]: any;
}
interface Platform {
  id: number;
  name: string;
  [key: string]: any;
}

interface Publisher {
  id: number;
  name: string;
  [key: string]: any;
}
