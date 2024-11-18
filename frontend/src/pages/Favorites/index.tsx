import { Fieldset } from "primereact/fieldset";
import Title from "../../components/Title/Title";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { useEffect, useState } from "react";

const Favorites = () => {
  const { getMovieByType } = myApi();
  const [movieFavorites, setMovieFavorites] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    const moviesRequest: MovieApiModel[] = await getMovieByType("movie", "favorite");

    setMovieFavorites(moviesRequest.filter((mr) => mr.favorite));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <Title title="Favoritos" />
      <Fieldset>
        <MovieCard data={movieFavorites} setMovie={setMovieFavorites} currentScreenType='favorite' />
        {movieFavorites.length === 0 && <p>Nenhum filme adicionado aos favoritos</p>}
      </Fieldset>
    </div>
  );
};

export default Favorites;
