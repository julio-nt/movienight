import { Fieldset } from "primereact/fieldset";
import Title from "../../components/Title/Title";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { useEffect, useState } from "react";

const Disliked = () => {
  const { getMovieByType } = myApi();
  const [movieDisliked, setMovieDisliked] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    const moviesRequest: MovieApiModel[] = await getMovieByType("movie", "disliked");

    setMovieDisliked(moviesRequest.filter((mr) => mr.dislike));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <Title title="Não Gostei" />
      <Fieldset>
        <MovieCard data={movieDisliked} setData={setMovieDisliked} hasChip />
        {movieDisliked.length === 0 && <p>Nenhum filme adicionado a lista de não gostei</p>}
      </Fieldset>
    </div>
  );
};

export default Disliked;
