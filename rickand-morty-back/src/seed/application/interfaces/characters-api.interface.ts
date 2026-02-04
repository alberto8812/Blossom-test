export interface CharactersAPIData {
  info: CharactersAPIInfo;
  results: CharacterAPI[];
}

export interface CharactersAPIInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface CharacterAPI {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: LocationAPI;
  location: LocationAPI;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface LocationAPI {
  name: string;
  url: string;
}
