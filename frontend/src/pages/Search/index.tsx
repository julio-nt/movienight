import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useApi from '../../api/useApi';
import { imageRoute } from '../../api/routes';
import { Fieldset } from 'primereact/fieldset';
import { ResultsModel, SearchResultModel } from '../../api/models/search';
import { Button } from 'primereact/button';
import { MovieApiModel } from '../../api/models';
import myApi from '../../api/request/myApi';
import { Toast } from 'primereact/toast';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const Search = () => {
  const { useSearch } = useApi();
  const { postItem, getById, updateItem } = myApi();

  const toast = useRef<any>(null);

  const [searchParams] = useSearchParams();
  const pesquisa = searchParams.get('p') || '';

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

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
      console.error('Erro ao buscar filmes: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [pesquisa]);

  useEffect(() => {
    if (resultList) show(resultList?.total_results > 0 ? 'success' : 'warn', `${resultList.total_results} filmes encontrados`);
  }, [resultList]);

  if (loading) {
    return <p>Carregando</p>;
  }

  const handleClick = async (item: ResultsModel, type: 'fav' | 'wish' | 'like' | 'dislike' | 'hate' | 'recommend') => {
    const localUser = localStorage.getItem('user');
    const localJson = JSON.parse(localUser!);

    const dataExists: MovieApiModel = await getById('movie', item.id);
    console.log(dataExists);

    try {
      const sendData: MovieApiModel = {
        name: item.title,
        user_fk: localJson.id,
        id_tmdb: item.id,
        image_tmdb: item.poster_path,
        category_fk_list: item.genre_ids,
        favorite: dataExists.favorite && type === 'fav' ? false : type === 'fav',
        dislike: dataExists.dislike && type === 'dislike' ? false : type === 'dislike',
        wish_to_watch: dataExists.wish_to_watch && type === 'wish' ? false : type === 'wish',
        hate: dataExists.hate && type === 'hate' ? false : type === 'hate',
        like: dataExists.like && type === 'like' ? false : type === 'like',
        vote_count: item.vote_count,
        vote_average: item.vote_average,
        release_date: item.release_date,
      };

      dataExists ? await updateItem('movie', sendData, dataExists.id!) : await postItem('movie', sendData);

      let toast_msg = '';

      if (type === 'fav') {
        toast_msg = 'Favoritado';
      }
      if (type === 'dislike') {
        toast_msg = 'Definido como não gostei';
      }
      if (type === 'wish') {
        toast_msg = 'Adicionado a lista de desejos';
      }
      if (type === 'hate') {
        toast_msg = 'Destruido com sucesso';
      }
      if (type === 'like') {
        toast_msg = 'Definido como gostei';
      }

      show('success', `${toast_msg} com sucesso`);
    } catch (error) {
      show('error', `Algo deu errado`);
    }
  };

  const show = (color: 'info' | 'success' | 'warn' | 'error' | 'secondary', text: string) => {
    toast.current?.show({ severity: color, detail: text });
  };

  const onPageChange = async (event: PaginatorPageChangeEvent) => {
    setPage(event.first);
    const result: SearchResultModel = await useSearch(`${pesquisa}&page=${event.page + 1}`);
    if (result) {
      setResultList(result);
    }
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
                    <div className="flex flex-wrap gap-4">
                      <Button label="Favoritar" className="btn-light" onClick={() => handleClick(result, 'fav')} />
                      <Button label="Quero Assistir" className="btn-light" onClick={() => handleClick(result, 'wish')} />
                      <Button label="Gostei" className="btn-light" onClick={() => handleClick(result, 'like')} />
                      <Button label="Não Gostei" className="btn-light" onClick={() => handleClick(result, 'dislike')} />
                      <Button label="Odiei" className="btn-light" onClick={() => handleClick(result, 'hate')} />
                      <Button label="Recomendar" className="btn-light" onClick={() => handleClick(result, 'recommend')} />
                    </div>
                  </div>
                </div>
              </div>
            </Fieldset>
          );
        })}
        <Paginator
          first={page}
          rows={resultList?.total_pages}
          totalRecords={resultList?.total_results || 0}
          rowsPerPageOptions={[5]}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Search;
