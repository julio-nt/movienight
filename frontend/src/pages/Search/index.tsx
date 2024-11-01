import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../../api/useApi";
import { imageRoute } from "../../api/routes";
import { Fieldset } from "primereact/fieldset";
import { ResultsModel, SearchResultModel } from "../../api/models/search";
import { Button } from "primereact/button";

const Search = () => {
  const { useSearch } = useApi();

  const [searchParams] = useSearchParams();
  const pesquisa = searchParams.get("p") || "";

  const [loading, setLoading] = useState(false);
  const [resultList, setResultList] = useState<ResultsModel[]>([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const result: SearchResultModel = await useSearch(pesquisa);
      console.log(result);
      setResultList(result.results);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar filmes: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [pesquisa]);

  if (loading) {
    return <p>Carregando</p>;
  }

  return (
    <div>
      <p>Busca: {pesquisa}</p>
      <div className="space-y-4">
        {resultList.map((result) => {
          return (
            <Fieldset key={result.id}>
              <div className="flex gap-4">
                <img src={`${imageRoute}${result.poster_path}`} width={250} height={250} />
                <div className="flex flex-col">
                  <p className="text-xl">{result.title}</p>
                  <p>{result.overview}</p>
                  <div className="mt-auto">
                    <p>{result.release_date}</p>
                    <div className="flex flex-wrap gap-4">
                      <Button label="Favoritar" className="btn-light" />
                      <Button label="Quero Assistir" className="btn-light" />
                      <Button label="Gostei" className="btn-light" />
                      <Button label="Não Gostei" className="btn-light" />
                      <Button label="Odiei" className="btn-light" />
                      <Button label="Recomendar" className="btn-light" />
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
