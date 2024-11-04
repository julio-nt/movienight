import { Fieldset } from "primereact/fieldset";
import Title from "../../components/Title/Title";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { useEffect, useState } from "react";

const Hated = () => {
  const { getMovieByType } = myApi();
  const [movieHated, setMovieHated] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    const moviesRequest: MovieApiModel[] = await getMovieByType("movie", 'hate');

    setMovieHated(moviesRequest.filter((mr) => mr.hate));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <Title title="Odiei" />
      <Fieldset>
        <MovieCard data={movieHated} />
        {movieHated.length === 0 && <p>Nenhum filme adicionado a lista de odiei</p>}
      </Fieldset>
    </div>
  );
};

export default Hated;
