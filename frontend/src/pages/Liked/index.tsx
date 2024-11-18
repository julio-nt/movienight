import { Fieldset } from "primereact/fieldset";
import Title from "../../components/Title/Title";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { useEffect, useState } from "react";

const Liked = () => {
  const { getMovieByType } = myApi();
  const [movieLiked, setMovieLiked] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    const moviesRequest: MovieApiModel[] = await getMovieByType("movie", "liked");

    setMovieLiked(moviesRequest.filter((mr) => mr.like));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <Title title="Gostei" />
      <Fieldset>
        <MovieCard data={movieLiked} setMovie={setMovieLiked} currentScreenType="like" hasChip />
        {movieLiked.length === 0 && <p>Nenhum filme adicionado a lista de gostei</p>}
      </Fieldset>
    </div>
  );
};

export default Liked;
