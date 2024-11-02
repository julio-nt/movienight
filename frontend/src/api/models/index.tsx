// MovieApiModel

type AllApiModels = MovieApiModel;

type MovieApiModel = {
  id?: number;
  name: string;
  id_tmdb: number;
  image_tmdb?: string;
  details?: string;
  rating?: number;
  favorite?: boolean;
  like?: boolean;
  dislike?: boolean;
  hate?: boolean;
  wish_to_watch?: boolean;
  category_fk_list: number[];
  sub_category_fk?: number;
  vote_average?: number;
  vote_count?: number;
  release_date?: string | Date;
};

export type { AllApiModels };

export type { MovieApiModel };
