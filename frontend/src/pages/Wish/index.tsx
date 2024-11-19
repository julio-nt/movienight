import { Fieldset } from "primereact/fieldset";
import Title from "../../components/Title/Title";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { useEffect, useState } from "react";

const Wish = () => {
  const { getAll } = myApi();
  const [movieWish, setMovieWish] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    const moviesRequest: MovieApiModel[] = await getAll("movie");

    setMovieWish(moviesRequest.filter((mr) => mr.wish_to_watch));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <Title title="Quero Assistir" />
      <Fieldset>
        <MovieCard data={movieWish} setData={setMovieWish} hasChip />
        {movieWish.length === 0 && <p>Nenhum filme adicionado a wishlist</p>}
      </Fieldset>
    </div>
  );
};

export default Wish;
