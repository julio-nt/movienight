// MovieApiModel

type AllApiModels = MovieApiModel;

type MovieApiModel = {
  id?: number;
  name: string;
  image_tmdb: string;
  details?: string;
  rating?: number;
  favorite?: boolean;
  like?: boolean;
  dislike?: boolean;
  hate?: boolean;
  wish_to_watch?: boolean;
  category_fk_list: number[];
  sub_category_fk?: number;
};

export type { AllApiModels };

export type { MovieApiModel };
