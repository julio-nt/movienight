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
import useWidth from "../../utils/useWidth";

const Search = () => {
  const { useSearch } = useApi();
  const { postItem } = myApi();
  const { width } = useWidth();

  const toast = useRef<any>(null);

  const [searchParams] = useSearchParams();
  const pesquisa = searchParams.get("p") || "";

  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<SearchResultModel | undefined>(undefined);

  const loadData = async () => {
    setLoading(true);
    try {
      const result: SearchResultModel = await useSearch(pesquisa);

      if (result) {
        setResultList(result);
      }

      console.log(result);
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
    if (resultList) show(resultList?.total_results > 0 ? "success" : "warn", `${resultList.total_results} filmes encontrados`);
  }, [resultList]);

  if (loading) {
    return <p>Carregando</p>;
  }

  const handleClick = async (item: ResultsModel, type: "fav" | "wish" | "like" | "dislike" | "hate" | "recommend") => {
    const sendData: MovieApiModel = {
      name: item.title,
      image_tmdb: item.poster_path,
      category_fk_list: item.genre_ids,
      favorite: type === "fav",
      dislike: type === "dislike",
      wish_to_watch: type === "wish",
      hate: type === "hate",
      like: type === "like",
    };
    await postItem("movie", sendData);
  };

  const show = (color: "info" | "success" | "warn" | "danger" | "secondary", text: string) => {
    toast.current?.show({ severity: color, detail: text });
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
                <div className="w-full min-[500px]:w-auto">
                  <img src={`${imageRoute}${result.poster_path}`} className="w-full h-auto min-[500px]:w-[250px] h-[375px]" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl">{result.title}</p>
                  <p>{result.overview}</p>
                  <div className="mt-auto">
                    <p>{result.release_date}</p>
                    <div className="flex flex-wrap gap-4">
                      <Button label="Favoritar" className="btn-light" onClick={() => handleClick(result, "fav")} />
                      <Button label="Quero Assistir" className="btn-light" onClick={() => handleClick(result, "wish")} />
                      <Button label="Gostei" className="btn-light" onClick={() => handleClick(result, "like")} />
                      <Button label="Não Gostei" className="btn-light" onClick={() => handleClick(result, "dislike")} />
                      <Button label="Odiei" className="btn-light" onClick={() => handleClick(result, "hate")} />
                      <Button label="Recomendar" className="btn-light" onClick={() => handleClick(result, "recommend")} />
                    </div>
                  </div>
                </div>
              </div>
            </Fieldset>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
