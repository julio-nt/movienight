import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../../api/useApi";
import { imageRoute } from "../../api/routes";
import { Fieldset } from "primereact/fieldset";
import { ResultsModel, SearchResultModel } from "../../api/models/search";
import { Button } from "primereact/button";
import { MovieApiModel } from "../../api/models";
import myApi from "../../api/request/myApi";
import { Toast } from "primereact/toast";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

const Search = () => {
  const { useSearch } = useApi();
  const { postItem, getById, getAll, updateItem } = myApi();

  const toast = useRef<any>(null);

  const [searchParams] = useSearchParams();
  const pesquisa = searchParams.get("p") || "";

  const [loading, setLoading] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [page, setPage] = useState(0);

  const [resultList, setResultList] = useState<SearchResultModel | undefined>(undefined);
  const [userMoviesList, setUserMoviesList] = useState<MovieApiModel[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result: SearchResultModel = await useSearch(pesquisa);
      const userMovies = await getAll("movie");
      setUserMoviesList(userMovies);

      if (result) {
        setResultList(result);
      }

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar filmes: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pesquisa]);

  useEffect(() => {
    if (resultList) {
      show(resultList?.total_results > 0 ? "success" : "warn", `${resultList.total_results} filmes encontrados`);
    }
  }, [resultList]);

  if (loading) {
    return <p>Carregando</p>;
  }

  const handleClick = async (item: ResultsModel, type: "fav" | "wish" | "like" | "dislike" | "hate" | "recommend") => {
    setLoadingSend(true);
    const localUser = localStorage.getItem("user");
    const localJson = JSON.parse(localUser!);

    const dataExists: MovieApiModel = await getById("movie", item.id);

    try {
      const sendData: MovieApiModel = {
        name: item.title,
        user_fk: localJson.id,
        id_tmdb: item.id,
        image_tmdb: item.poster_path,
        category_fk_list: item.genre_ids,
        favorite: dataExists.favorite && type === "fav" ? false : type === "fav",
        dislike: dataExists.dislike && type === "dislike" ? false : type === "dislike",
        wish_to_watch: dataExists.wish_to_watch && type === "wish" ? false : type === "wish",
        hate: dataExists.hate && type === "hate" ? false : type === "hate",
        like: dataExists.like && type === "like" ? false : type === "like",
        vote_count: item.vote_count,
        vote_average: item.vote_average,
        release_date: item.release_date,
      };

      dataExists ? await updateItem("movie", sendData, dataExists.id!) : await postItem("movie", sendData);

      let toast_msg = "";

      if (type === "fav") {
        toast_msg = "Favoritado";
      }
      if (type === "dislike") {
        toast_msg = "Definido como não gostei";
      }
      if (type === "wish") {
        toast_msg = "Adicionado a lista de desejos";
      }
      if (type === "hate") {
        toast_msg = "Destruido com sucesso";
      }
      if (type === "like") {
        toast_msg = "Definido como gostei";
      }

      show("success", `${toast_msg} com sucesso`);
    } catch (error) {
      show("error", `Algo deu errado`);
    } finally {
      setLoadingSend(false);
    }
  };

  const show = (color: "info" | "success" | "warn" | "error" | "secondary", text: string) => {
    toast.current?.show({ severity: color, detail: text });
  };

  const onPageChange = async (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    const result: SearchResultModel = await useSearch(`${pesquisa}&page=${event.page + 1}`);
    if (result) {
      setResultList(result);
    }
  };

  const RenderButton = ({ item }: { item: ResultsModel }) => {
    const hasData = userMoviesList.find((movie) => movie.id_tmdb === item.id);

    const favClass = hasData && hasData.favorite ? "btn-success" : "btn-light";
    const wishClass = hasData && hasData.wish_to_watch ? "btn-success" : "btn-light";
    const likedClass = hasData && hasData.like ? "btn-success" : "btn-light";
    const dislikedClass = hasData && hasData.dislike ? "btn-success" : "btn-light";
    const hatedClass = hasData && hasData.hate ? "btn-success" : "btn-light";
    // const recommendClass = hasData && hasData. ? "btn-success" : "btn-light";

    return (
      <div className="flex flex-wrap gap-4">
        <Button label="Favoritar" className={favClass} onClick={() => handleClick(item, "fav")} />
        <Button label="Quero Assistir" className={wishClass} onClick={() => handleClick(item, "wish")} />
        <Button label="Gostei" className={likedClass} onClick={() => handleClick(item, "like")} />
        <Button label="Não Gostei" className={dislikedClass} onClick={() => handleClick(item, "dislike")} />
        <Button label="Odiei" className={hatedClass} onClick={() => handleClick(item, "hate")} />
        <Button label="Recomendar" className="btn-light" onClick={() => handleClick(item, "recommend")} />
      </div>
    );
  };

  return (
    <div>
      <Toast ref={toast} position="top-center" />

      <p className="text-lg">Busca: {pesquisa}</p>
      <div className="space-y-4">
        {resultList?.results.map((result) => {
          return (
            <Fieldset key={result.id}>
              <div className="flex gap-4 flex-wrap ">
                <div className="w-full min-[600px]:w-[250px]">
                  <img src={`${imageRoute}${result.poster_path}`} className="w-full h-auto min-[500px]:w-[250px] h-[375px]" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-xl">{result.title}</p>
                  <p className="max-w-[600px]">{result.overview}</p>
                  <div className="mt-auto">
                    <p>{result.release_date}</p>
                    <RenderButton item={result} />
                  </div>
                </div>
              </div>
            </Fieldset>
          );
        })}
        <Paginator first={page} rows={20} totalRecords={resultList?.total_results || 0} onPageChange={onPageChange} />
      </div>
    </div>
  );
};

export default Search;
