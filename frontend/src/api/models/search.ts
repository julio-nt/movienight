type SearchResultModel = {
  results: ResultsModel[];
  total_results: number;
  total_pages: number;
};

type ResultsModel = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type { SearchResultModel, ResultsModel };
