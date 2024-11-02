import { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import MovieCard from "../../components/MovieCard/MovieCard";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { Fieldset } from "primereact/fieldset";

const Home = () => {
  const { getAll } = myApi();
  const [movieFavorites, setMovieFavorites] = useState<MovieApiModel[]>([]);
  const [movieLiked, setMovieLiked] = useState<MovieApiModel[]>([]);
  const [movieDisliked, setMovieDisliked] = useState<MovieApiModel[]>([]);
  const [movieHated, setMovieHated] = useState<MovieApiModel[]>([]);
  const [movieWish, setMovieWish] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    const moviesRequest: MovieApiModel[] = await getAll("movie");

    setMovieFavorites(moviesRequest.filter((mr) => mr.favorite));
    setMovieLiked(moviesRequest.filter((mr) => mr.like));
    setMovieDisliked(moviesRequest.filter((mr) => mr.dislike));
    setMovieHated(moviesRequest.filter((mr) => mr.hate));
    setMovieWish(moviesRequest.filter((mr) => mr.wish_to_watch));
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="space-y-8">
      <Title title="Bem Vindo" className="" />
      <div className="space-y-4">
        <Fieldset legend="Favoritos">
          <MovieCard data={movieFavorites} />
          {movieFavorites.length === 0 && <p>Nenhum filme adicionado</p>}
        </Fieldset>

        <Fieldset legend="Gostei">
          <MovieCard data={movieLiked} />
          {movieLiked.length === 0 && <p>Nenhum filme adicionado</p>}
        </Fieldset>

        <Fieldset legend="Não Gostei">
          <MovieCard data={movieDisliked} />
          {movieDisliked.length === 0 && <p>Nenhum filme adicionado</p>}
        </Fieldset>

        <Fieldset legend="Odiei">
          <MovieCard data={movieHated} />
          {movieHated.length === 0 && <p>Nenhum filme adicionado</p>}
        </Fieldset>

        <Fieldset legend="Quero Assistir">
          <MovieCard data={movieWish} />
          {movieWish.length === 0 && <p>Nenhum filme adicionado</p>}
        </Fieldset>
      </div>
    </div>
  );
};

export default Home;
