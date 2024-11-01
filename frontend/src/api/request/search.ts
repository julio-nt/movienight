import axios from "axios";

const search = async (query: string) => {
  const token = import.meta.env.VITE_THE_MOVIE_DB_API_TOKEN;
  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}`, headers);

    return response.data;
  } catch (error: any) {
    console.error("Erro ao buscar dados: ", error);
    throw Error;
  }
};

export default search;
